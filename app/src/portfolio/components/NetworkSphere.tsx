'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Loader
const SimpleLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
  </div>
);

// Generate sphere points
const generateSpherePoints = (count: number, radius: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * (i / count) - 1);
    const theta = i * 2.39996;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
};

// Generate connections
const generateConnections = (nodes: THREE.Vector3[], maxDistance: number) => {
  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = nodes[i].distanceTo(nodes[j]);
      if (distance < maxDistance && (i * j) % 5 === 0) {
        lines.push([nodes[i], nodes[j]]);
      }
    }
  }
  return lines;
};

// Generate particles
const generateParticlePositions = (
  count: number,
  minRadius: number,
  maxRadius: number
) => {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * (i / count) - 1);
    const theta = i * 2.39996;
    const r = minRadius + (i % (maxRadius - minRadius + 1));

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
  }

  return new Float32Array(positions);
};

// Sphere Content
const SphereContent = ({ isMobile = false }) => {
  const sphereRef = useRef<THREE.Group>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [lineColors, setLineColors] = useState<{ [key: number]: number }>({});
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  const nodeCount = isMobile ? 20 : 40;
  const connectionThreshold = isMobile ? 1.8 : 2.0;
  const particleCount = isMobile ? 60 : 150;

  const nodes = useMemo(() => {
    return generateSpherePoints(nodeCount, 1.5);
  }, [nodeCount]);

  const connections = useMemo(() => {
    return generateConnections(nodes, connectionThreshold);
  }, [nodes, connectionThreshold]);

  const nodeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(
      nodes.flatMap((v) => [v.x, v.y, v.z])
    );
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodes]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = generateParticlePositions(particleCount, 2.0, 3.2);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particleCount]);

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
  };

  // Reset to original state
  const resetToOriginal = () => {
    clearAllTimeouts();
    setIsHovering(false);
    setHoveredNode(null);
    setLineColors({});
  };

  // Handle hover on sphere shells
  const handleShellHover = () => {
    if (!isHovering) {
      setIsHovering(true);
      // Make all lines gradually turn green
      const allLineIndices = connections.map((_, idx) => idx);
      const newTimeouts: NodeJS.Timeout[] = [];
      
      allLineIndices.forEach((idx, order) => {
        const timeout = setTimeout(() => {
          setLineColors(prev => ({ ...prev, [idx]: 1 }));
        }, order * 30);
        newTimeouts.push(timeout);
      });
      
      setTimeoutIds(prev => [...prev, ...newTimeouts]);
    }
  };

  const handleShellLeave = () => {
    resetToOriginal();
  };

  // Handle hover on specific nodes
  const handleNodeHover = (index: number) => {
    // Clear any previous timeouts
    clearAllTimeouts();
    setHoveredNode(index);
    
    if (!isHovering) {
      setIsHovering(true);
      // Find connected lines to this node
      const connectedIndices: number[] = [];
      connections.forEach(([start, end], idx) => {
        if (start === nodes[index] || end === nodes[index]) {
          connectedIndices.push(idx);
        }
      });
      
      // Gradually change connected lines to green
      const newTimeouts: NodeJS.Timeout[] = [];
      connectedIndices.forEach((idx, order) => {
        const timeout = setTimeout(() => {
          setLineColors(prev => ({ ...prev, [idx]: 1 }));
        }, order * 50);
        newTimeouts.push(timeout);
      });
      
      setTimeoutIds(prev => [...prev, ...newTimeouts]);
    } else {
      // If already hovering, just highlight the node's connections
      const connectedIndices: number[] = [];
      connections.forEach(([start, end], idx) => {
        if (start === nodes[index] || end === nodes[index]) {
          connectedIndices.push(idx);
        }
      });
      
      connectedIndices.forEach(idx => {
        setLineColors(prev => ({ ...prev, [idx]: 1 }));
      });
    }
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    // When leaving a node, if we're not hovering the shell, reset completely
    // If we're still hovering the shell, keep the shell effects and only clear node-specific highlights
    if (!isHovering) {
      resetToOriginal();
    } else {
      // Just clear node highlight but keep shell effects
      setHoveredNode(null);
    }
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.15;

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1;
      sphereRef.current.rotation.x = Math.sin(time * 0.05) * 0.03;
      sphereRef.current.rotation.z = Math.cos(time * 0.03) * 0.02;
    }
  });

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <group ref={sphereRef}>
      {/* 🌐 Outer Shell (Main Sphere with wireframe) - Hover detection on shell */}
      <mesh 
        onPointerOver={handleShellHover} 
        onPointerOut={handleShellLeave}
      >
        <sphereGeometry args={[1.2, isMobile ? 16 : 24, isMobile ? 16 : 24]} />
        <meshPhongMaterial
          color={isHovering ? "#3B82F6" : "#818CF8"}
          emissive={isHovering ? "#2563EB" : "#A78BFA"}
          emissiveIntensity={isHovering ? 1.2 : 0.8}
          transparent
          opacity={isMobile ? 0.4 : 0.3}
          wireframe
        />
      </mesh>

      {/* Inner Shell */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={isHovering ? "#3B82F6" : "#C084FC"}
          wireframe
          transparent
          opacity={isHovering ? 0.4 : 0.2}
        />
      </mesh>

      {/* 🔗 Connections - Turn green on hover */}
      {connections.slice(0, isMobile ? 30 : undefined).map(([start, end], i) => {
        const isConnected = lineColors[i] !== undefined;
        
        const color = isConnected 
          ? new THREE.Color(0x22C55E) // Green
          : new THREE.Color(0xA78BFA); // Purple
        
        const opacity = isConnected ? 0.9 : 0.3;
        const lineWidth = isConnected ? (isMobile ? 1.8 : 2.2) : (isMobile ? 0.6 : 0.8);
        
        return (
          <Line
            key={i}
            points={[start, end]}
            color={color}
            opacity={opacity}
            transparent
            lineWidth={lineWidth}
          />
        );
      })}

      {/* ✨ Nodes - Blue on hover */}
      {nodes.map((node, idx) => {
        const isHovered = hoveredNode === idx;
        return (
          <mesh
            key={idx}
            position={[node.x, node.y, node.z]}
            onPointerOver={() => handleNodeHover(idx)}
            onPointerOut={handleNodeLeave}
          >
            <sphereGeometry args={[isHovered ? 0.08 : 0.04, 8, 8]} />
            <meshStandardMaterial
              color={isHovering || isHovered ? "#3B82F6" : "#C4B5FD"}
              emissive={isHovering || isHovered ? "#2563EB" : "#A78BFA"}
              emissiveIntensity={isHovering || isHovered ? 0.8 : 0.2}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* 🌌 Particles */}
      <points geometry={particleGeometry}>
        <pointsMaterial
          size={isMobile ? 0.015 : 0.01}
          color="#22D3EE"
          sizeAttenuation
          transparent
          opacity={isMobile ? 0.15 : 0.1}
        />
      </points>

      {/* Network Light Effect on Node Hover */}
      {hoveredNode !== null && (
        <mesh position={nodes[hoveredNode]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};

// Main Component
const NetworkSphere = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsLoaded(true);
    };

    const timer = setTimeout(checkMobile, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <SimpleLoader />;
  }

  return (
    <div 
      className="w-full h-full relative"
      style={{ cursor: 'pointer' }}
    >
      <Canvas
        camera={{
          position: isMobile ? [2.2, 0.3, 3.2] : [2.5, 0.5, 3.5],
          fov: isMobile ? 45 : 40,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          cursor: 'pointer'
        }}
        gl={{
          antialias: true,
          powerPreference: 'default',
          precision: 'lowp',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        {/* 💡 Lighting */}
        <ambientLight intensity={0.4} />
        
        <pointLight position={[1, 1, 1]} intensity={0.5} color="#818CF8" />
        <pointLight position={[-1, -0.5, 1]} intensity={0.3} color="#C084FC" />
        <pointLight position={[0, 1.5, -1.5]} intensity={0.2} color="#22D3EE" />

        <SphereContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default NetworkSphere;
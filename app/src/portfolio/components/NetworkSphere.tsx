/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
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

// Generate connections from all 4 sides (up, down, left, right)
const generateAllSideConnections = (nodes: THREE.Vector3[]) => {
  const lines = [];
  
  const upNodes = nodes.filter(node => node.y > 0.5);
  const downNodes = nodes.filter(node => node.y < -0.5);
  const leftNodes = nodes.filter(node => node.x < -0.5);
  const rightNodes = nodes.filter(node => node.x > 0.5);
  
  const connectNodesInGroup = (group: THREE.Vector3[]) => {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const distance = group[i].distanceTo(group[j]);
        if (distance < 2.0) {
          lines.push([group[i], group[j]]);
        }
      }
    }
  };
  
  connectNodesInGroup(upNodes);
  connectNodesInGroup(downNodes);
  connectNodesInGroup(leftNodes);
  connectNodesInGroup(rightNodes);
  
  for (let i = 0; i < Math.min(upNodes.length, downNodes.length); i++) {
    if (i % 3 === 0) {
      lines.push([upNodes[i], downNodes[i]]);
    }
  }
  
  for (let i = 0; i < Math.min(leftNodes.length, rightNodes.length); i++) {
    if (i % 3 === 0) {
      lines.push([leftNodes[i], rightNodes[i]]);
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
  const [lineProgress, setLineProgress] = useState<{ [key: number]: number }>({});
  const animationRef = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);

  const nodeCount = isMobile ? 30 : 40;
  const connectionThreshold = isMobile ? 2.2 : 2.0;
  const particleCount = isMobile ? 60 : 150;

  const nodes = useMemo(() => {
    return generateSpherePoints(nodeCount, 1.8);
  }, [nodeCount]);

  const connections = useMemo(() => {
    if (isMobile) {
      return generateAllSideConnections(nodes);
    }
    return generateConnections(nodes, connectionThreshold);
  }, [nodes, connectionThreshold, isMobile]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = generateParticlePositions(particleCount, 2.5, 4.0);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particleCount]);

  const clearAllTimeouts = () => {
    animationRef.current.forEach(timeout => clearTimeout(timeout));
    animationRef.current = [];
  };

  // Mobile auto-animation loop
  const startMobileAnimation = useCallback(() => {
    if (!isMobile) return;
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    
    const animateLines = () => {
      clearAllTimeouts();
      setLineProgress({});
      
      const allLineIndices = connections.map((_, idx) => idx);
      
      allLineIndices.forEach((idx, order) => {
        const timeout = setTimeout(() => {
          setLineProgress(prev => ({ ...prev, [idx]: 1 }));
        }, order * 25); // 25ms delay between each line
        animationRef.current.push(timeout);
      });
      
      // After all lines are green, reset and start again
      const totalDuration = allLineIndices.length * 25;
      const resetTimeout = setTimeout(() => {
        setLineProgress({});
        isAnimatingRef.current = false;
        startMobileAnimation(); // Restart the loop
      }, totalDuration + 1000); // 1 second pause before restarting
      
      animationRef.current.push(resetTimeout);
    };
    
    animateLines();
  }, [isMobile, connections]);

  // Mobile auto animation on mount
  useEffect(() => {
    if (isMobile) {
      startMobileAnimation();
    }
    return () => {
      clearAllTimeouts();
      isAnimatingRef.current = false;
    };
  }, [isMobile, startMobileAnimation]);

  // Desktop hover animation
  const handleSphereHover = () => {
    if (isMobile) return;
    if (isHovering) return;
    setIsHovering(true);
    
    clearAllTimeouts();
    
    const allLineIndices = connections.map((_, idx) => idx);
    allLineIndices.forEach((idx, order) => {
      const timeout = setTimeout(() => {
        setLineProgress(prev => ({ ...prev, [idx]: 1 }));
      }, order * 20);
      animationRef.current.push(timeout);
    });
  };

  const handleSphereLeave = () => {
    if (isMobile) return;
    setIsHovering(false);
    clearAllTimeouts();
    setLineProgress({});
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.3;

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * (isMobile ? 0.15 : 0.2);
      if (!isMobile) {
        sphereRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      }
    }
  });

  const nodePositions = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });
    return positions;
  }, [nodes]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <group ref={sphereRef}>
      {/* Main Sphere */}
      <mesh 
        onPointerOver={!isMobile ? handleSphereHover : undefined} 
        onPointerOut={!isMobile ? handleSphereLeave : undefined}
      >
        <sphereGeometry args={[1.5, isMobile ? 20 : 24, isMobile ? 20 : 24]} />
        <meshPhongMaterial
          color={isHovering ? "#3B82F6" : "#818CF8"}
          emissive={isHovering ? "#2563EB" : "#A78BFA"}
          emissiveIntensity={isHovering ? 1.8 : 1.5}
          transparent
          opacity={isMobile ? 0.3 : 0.25}
          wireframe
        />
      </mesh>

      {/* Inner sphere (Desktop only) */}
      {!isMobile && (
        <mesh>
          <sphereGeometry args={[1.0, 16, 16]} />
          <meshBasicMaterial
            color={isHovering ? "#3B82F6" : "#C084FC"}
            wireframe
            transparent
            opacity={isHovering ? 0.3 : 0.15}
          />
        </mesh>
      )}

      {/* Connections */}
      {connections.map(([start, end], i) => {
        const progress = lineProgress[i] || 0;
        
        if (isMobile) {
          // Mobile: Animated green lines (purple to green transition)
          const purpleColor = new THREE.Color(0xA78BFA);
          const greenColor = new THREE.Color(0x22C55E);
          const color = purpleColor.clone().lerp(greenColor, progress);
          const opacity = progress === 1 ? 0.9 : 0.4;
          
          return (
            <Line
              key={i}
              points={[start, end]}
              color={color}
              opacity={opacity}
              transparent
              lineWidth={0.9}
            />
          );
        }
        
        // Desktop: Purple to Green transition on hover
        const purpleColor = new THREE.Color(0xA78BFA);
        const greenColor = new THREE.Color(0x22C55E);
        const color = purpleColor.clone().lerp(greenColor, progress);
        const opacity = progress === 1 ? 0.9 : 0.35;
        
        return (
          <Line
            key={i}
            points={[start, end]}
            color={color}
            opacity={opacity}
            transparent
            lineWidth={1.0}
          />
        );
      })}

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.12 : 0.12}
          color={isHovering ? "#3B82F6" : "#C4B5FD"}
          sizeAttenuation
          transparent
          opacity={isHovering ? 1 : 0.9}
        />
      </points>

      {/* Particles */}
      <points geometry={particleGeometry}>
        <pointsMaterial
          size={isMobile ? 0.05 : 0.04}
          color="#22D3EE"
          sizeAttenuation
          transparent
          opacity={isMobile ? 0.5 : 0.35}
        />
      </points>
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
      className="w-full h-full"
      style={{ cursor: 'pointer' }}
    >
      <Canvas
        camera={{
          position: isMobile ? [2.5, 0.5, 3.5] : [3, 1, 4],
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
        <ambientLight intensity={1} />
        <pointLight position={[2, 2, 2]} intensity={1.2} color="#818CF8" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#C084FC" />
        <pointLight position={[0, 3, -2]} intensity={0.6} color="#22D3EE" />
        <SphereContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default NetworkSphere;
/* eslint-disable react-hooks/set-state-in-effect */
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
const SphereContent = ({ isMobile = false, onSphereClick }: { isMobile?: boolean; onSphereClick?: () => void }) => {
  const sphereRef = useRef<THREE.Group>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lineProgress, setLineProgress] = useState<{ [key: number]: number }>({});
  const animationRef = useRef<NodeJS.Timeout[]>([]);

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

  // Start line animation (purple to green)
  const startLineAnimation = () => {
    if (isActive) return;
    setIsActive(true);
    
    clearAllTimeouts();
    
    const allLineIndices = connections.map((_, idx) => idx);
    allLineIndices.forEach((idx, order) => {
      const timeout = setTimeout(() => {
        setLineProgress(prev => ({ ...prev, [idx]: 1 }));
      }, order * 15);
      animationRef.current.push(timeout);
    });
  };

  // Desktop hover
  const handleSphereHover = () => {
    if (isMobile) return;
    if (isHovering) return;
    setIsHovering(true);
    startLineAnimation();
  };

  const handleSphereLeave = () => {
    if (isMobile) return;
    setIsHovering(false);
    // Desktop pe leave karte hi reset ho jaye
    clearAllTimeouts();
    setLineProgress({});
    setIsActive(false);
  };

  // Mobile click - popup aur lines green
  const handleSphereClick = () => {
    if (!isMobile) return;
    startLineAnimation();
    // Popup open karne ke liye parent function call
    if (onSphereClick) {
      onSphereClick();
    }
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
    <group 
      ref={sphereRef}
      onClick={handleSphereClick}
    >
      {/* Main Sphere */}
      <mesh 
        onPointerOver={!isMobile ? handleSphereHover : undefined} 
        onPointerOut={!isMobile ? handleSphereLeave : undefined}
      >
        <sphereGeometry args={[1.5, isMobile ? 20 : 24, isMobile ? 20 : 24]} />
        <meshPhongMaterial
          color={isHovering || isActive ? "#3B82F6" : "#818CF8"}
          emissive={isHovering || isActive ? "#2563EB" : "#A78BFA"}
          emissiveIntensity={isHovering || isActive ? 1.8 : 1.5}
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
            lineWidth={isMobile ? 0.9 : 1.0}
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
          color={isHovering || isActive ? "#3B82F6" : "#C4B5FD"}
          sizeAttenuation
          transparent
          opacity={isHovering || isActive ? 1 : 0.9}
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
  const [showPopup, setShowPopup] = useState(false);

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

  const handleSphereClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!isLoaded) {
    return <SimpleLoader />;
  }

  return (
    <>
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
          <SphereContent isMobile={isMobile} onSphereClick={handleSphereClick} />
        </Canvas>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closePopup}
          />
          <div 
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Welcome to Nestick Tech
              </h3>
              
              <p className="text-white/60 text-sm mb-6">
                Our technology network connects modern solutions with innovative thinking. 
                Explore our ecosystem of cutting-edge tools and frameworks.
              </p>
              
              <button
                onClick={closePopup}
                className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4f52e0] hover:to-[#7c3aed] text-white font-medium rounded-xl transition-all duration-200"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NetworkSphere;
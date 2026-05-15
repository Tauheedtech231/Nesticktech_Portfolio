// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import for Three.js to avoid SSR issues
    const initThree = async () => {
      const THREE = await import('three');
      
      if (!containerRef.current) return;

      // Setup Scene
      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(0x05070d, 0.005);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0.5, 7);
      camera.lookAt(0, -0.8, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '1';
      renderer.domElement.style.pointerEvents = 'none';
      containerRef.current.appendChild(renderer.domElement);

      // Star Particles Background
      const starCount = 3000;
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      
      for (let i = 0; i < starCount; i++) {
        starPositions[i*3] = (Math.random() - 0.5) * 200;
        starPositions[i*3+1] = (Math.random() - 0.5) * 100;
        starPositions[i*3+2] = (Math.random() - 0.5) * 80 - 40;
        
        const colorChoice = Math.random();
        if (colorChoice > 0.8) {
          starColors[i*3] = 0.8 + Math.random() * 0.2;
          starColors[i*3+1] = 0.6 + Math.random() * 0.4;
          starColors[i*3+2] = 0.3 + Math.random() * 0.3;
        } else if (colorChoice > 0.6) {
          starColors[i*3] = 0.4 + Math.random() * 0.3;
          starColors[i*3+1] = 0.6 + Math.random() * 0.4;
          starColors[i*3+2] = 1.0;
        } else {
          starColors[i*3] = 0.8 + Math.random() * 0.2;
          starColors[i*3+1] = 0.8 + Math.random() * 0.2;
          starColors[i*3+2] = 0.8 + Math.random() * 0.2;
        }
      }
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      
      const starMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
      const stars = new THREE.Points(starGeometry, starMat);
      scene.add(stars);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x111122);
      scene.add(ambientLight);
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
      mainLight.position.set(2, 5, 3);
      scene.add(mainLight);
      const fillLight = new THREE.PointLight(0x2266aa, 0.6);
      fillLight.position.set(0, 1, 2);
      scene.add(fillLight);
      const rimLight = new THREE.PointLight(0x3b82f6, 0.8);
      rimLight.position.set(1, 1.5, -2);
      scene.add(rimLight);

      function animateStars() {
        stars.rotation.y += 0.0005;
        stars.rotation.x += 0.0003;
        requestAnimationFrame(animateStars);
      }
      animateStars();

      function renderLoop() {
        renderer.render(scene, camera);
        requestAnimationFrame(renderLoop);
      }
      renderLoop();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    };

    initThree();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#05070d] text-white overflow-x-hidden">
      {/* Background overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3D Container */}
      <div ref={containerRef} className="fixed inset-0 z-10" />

      {/* Top Mihrab Arch - Responsive with Heading Inside Curve */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-[90%] max-w-[600px]">
        <div className="relative w-full h-[200px] sm:h-[300px]">
          {/* Professional Heading inside the curve */}
          <div className="absolute top-24 sm:top-32 md:top-36 left-1/2 -translate-x-1/2 text-center whitespace-nowrap z-30">
            <h2 className="text-[11px] sm:text-xs md:text-sm font-light tracking-[0.4em] sm:tracking-[0.5em] text-blue-300/70 uppercase">
              The Vision Behind
            </h2>
            <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white/90 mt-2 sm:mt-3 uppercase">
              ARCHITECTS OF TOMORROW
            </h1>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-3 sm:mt-4" />
          </div>
          
          {/* Outer glow arch - Blue */}
          <div className="absolute inset-0 border-t-[2px] sm:border-t-[3px] border-l-[2px] sm:border-l-[3px] border-r-[2px] sm:border-r-[3px] border-blue-400/60 rounded-t-full shadow-[0_0_40px_#3b82f6] sm:shadow-[0_0_80px_#3b82f6]" />
          {/* Inner glow arch - Blue */}
          <div className="absolute inset-4 sm:inset-6 border-t border-l border-r border-blue-200/20 rounded-t-full" />
        </div>
      </div>

      {/* Story Card - Bottom Left of Curve, Blue theme */}
      <div className="absolute left-1/2 transform -translate-x-[calc(100%+20px)] sm:-translate-x-[calc(100%+80px)] bottom-8 sm:bottom-16 md:bottom-20 z-30 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer">
        <div className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-400/40 transition-all duration-300">
          <div className="text-blue-300 text-base sm:text-lg tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3 font-medium">
            STORY
          </div>
          <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
            Our story is built on a vision to blend creativity, technology, and purpose.
            We believe in creating digital experiences that not only look beautiful
            but also leave a lasting impact.
          </p>
          <div className="mt-4 sm:mt-6 w-8 sm:w-10 h-[2px] bg-blue-400" />
        </div>
      </div>

      {/* Mission Card - Bottom Right of Curve, Blue theme */}
      <div className="absolute left-1/2 transform translate-x-[20px] sm:translate-x-[80px] bottom-8 sm:bottom-16 md:bottom-20 z-30 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer">
        <div className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-400/40 transition-all duration-300 text-right">
          <div className="text-blue-300 text-base sm:text-lg tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3 font-medium">
            MISSION
          </div>
          <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
            Our mission is to empower brands and ideas through innovative digital solutions.
            We aim to inspire, grow, and create meaningful connections in the digital world.
          </p>
          <div className="mt-4 sm:mt-6 w-8 sm:w-10 h-[2px] bg-blue-400 ml-auto" />
        </div>
      </div>
    </div>
  );
}
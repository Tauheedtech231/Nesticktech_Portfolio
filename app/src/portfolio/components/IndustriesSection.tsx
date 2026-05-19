// app/src/portfolio/components/IndustriesSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, ShoppingBag, Building2, Rocket, Landmark, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Industries data - Updated with only 3 hover features per tile
const tiles = [
  {
    id: 1,
    name: "EDUCATION",
    desc: "LMS & e-learning solutions",
    icon: GraduationCap,
    clipPath: "polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)",
    angle: { x: -200, y: -150, rotate: -15 },
    hoverFeatures: [
      "Learning Management System",
      "Admission Automation System",
      "Parent Teacher Management System"
    ]
  },
  {
    id: 2,
    name: "E-COMMERCE",
    desc: "Online stores & payments",
    icon: ShoppingBag,
    clipPath: "polygon(8% 0%, 92% 0%, 100% 10%, 88% 100%, 12% 100%, 0% 10%)",
    angle: { x: 0, y: -200, rotate: 10 },
    hoverFeatures: [
      "Store Creation & Management",
      "Payment Gateway Integration",
      "Inventory Management"
    ]
  },
  {
    id: 3,
    name: "CONSTRUCTION",
    desc: "Project & site management",
    icon: Building2,
    clipPath: "polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)",
    angle: { x: 200, y: -150, rotate: 15 },
    hoverFeatures: [
      "BuildN Project Management",
      "Site & Resource Management",
      "Budget & Timeline Tracking"
    ]
  },
  {
    id: 4,
    name: "ERP",
    desc: "LMS admission automation",
    icon: Rocket,
    clipPath: "polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 12% 100%, 0% 88%)",
    angle: { x: -200, y: 150, rotate: 12 },
    hoverFeatures: [
      "Internal Management Software",
      "ERP Integration Solutions",
      "Portfolio Management"
    ]
  },
  {
    id: 5,
    name: "SHOPIFY",
    desc: "WordPress",
    icon: Landmark,
    clipPath: "polygon(12% 0%, 88% 0%, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0% 88%, 0% 12%)",
    angle: { x: 0, y: 200, rotate: -10 },
    hoverFeatures: [
      "Brand Building Strategy",
      "Social Media Management",
      "Digital & Google Marketing"
    ]
  },
  {
    id: 6,
    name: "MarX",
    desc: "Build N",
    icon: Heart,
    clipPath: "polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)",
    angle: { x: 200, y: 150, rotate: -12 },
    hoverFeatures: [
      "CRM System Management",
      "Lead Generation Software",
      "Client Portfolio Site"
    ]
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileTilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopTilesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate mobile tiles - reduced x-axis movement to prevent overflow
    mobileTilesRef.current.forEach((tile, index) => {
      if (tile) {
        const tileData = tiles[index];
        gsap.fromTo(tile,
          {
            opacity: 0,
            x: index % 2 === 0 ? -80 : 80,
            y: 0,
            rotation: tileData.angle.rotate,
            scale: 0.85,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.1)",
            scrollTrigger: {
              trigger: tile,
              start: "top 85%",
              end: "bottom 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Animate desktop tiles - contained within viewport
    desktopTilesRef.current.forEach((tile, index) => {
      if (tile) {
        const tileData = tiles[index];
        const boundedX = Math.min(Math.max(tileData.angle.x, -120), 120);
        const boundedY = Math.min(Math.max(tileData.angle.y, -120), 120);
        
        gsap.fromTo(tile,
          {
            opacity: 0,
            x: boundedX,
            y: boundedY,
            rotation: tileData.angle.rotate,
            scale: 0.85,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.1)",
            scrollTrigger: {
              trigger: tile,
              start: "top 85%",
              end: "bottom 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Cleanup ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Mobile tiles filtered to only show EDUCATION, E-COMMERCE, CONSTRUCTION (first 3)
  const mobileTiles = tiles.slice(0, 3);

  return (
    <div
      className="min-h-screen bg-[#020617] flex flex-col items-center justify-center py-12 px-4 md:py-16 md:px-8"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      ref={sectionRef}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@200;300;400;500;600;700;800&display=swap');

        .industries-section {
          overflow-x: clip;
          position: relative;
          isolation: isolate;
        }
        
        .tile-wrap {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          will-change: transform, opacity;
          width: 100%;
          margin: 0 auto;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .tile-wrap:hover {
          transform: scale(1.03) translateY(-4px) !important;
          z-index: 10;
        }
        .tile-wrap:active {
          transform: scale(0.97) !important;
        }
        
        .tile-inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          contain: layout paint;
        }
        
        .tile-stone {
          position: absolute;
          inset: 0;
          background:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E"),
            linear-gradient(135deg, #1e1b4b 0%, #1e1a4a 50%, #172554 100%);
          background-size: 300px 300px, 100% 100%;
          border-radius: 14px;
        }
        
        .tile-glow {
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          border: 1.5px solid transparent;
          background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05)) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.7;
        }
        
        .tile-name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 4px;
          color: #fff;
          text-transform: uppercase;
          transition: opacity 0.3s ease;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          text-align: center;
          width: 100%;
          padding: 0 16px;
        }
        
        @media (max-width: 768px) {
          .tile-name {
            font-size: 12px;
            letter-spacing: 3px;
          }
        }
        
        @media (min-width: 768px) {
          .tile-name {
            font-size: 16px;
            letter-spacing: 5px;
          }
        }
        
        .tile-desc {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.95);
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          text-align: center;
          width: 100%;
          padding: 0 16px;
        }
        
        @media (max-width: 768px) {
          .tile-desc {
            font-size: 10px;
            letter-spacing: 1.5px;
            padding: 0 20px;
          }
        }
        
        @media (min-width: 768px) {
          .tile-desc {
            font-size: 13px;
            letter-spacing: 2.5px;
          }
        }
        
        .tile-wrap:hover .tile-name {
          opacity: 0;
        }
        
        .tile-wrap:hover .tile-desc {
          opacity: 0;
        }
        
        .tile-icon {
          position: absolute;
          top: 20px;
          left: 20px;
          opacity: 0.5;
          color: rgba(255,255,255,0.8);
          z-index: 2;
        }
        
        .tile-icon svg {
          width: 22px;
          height: 22px;
        }
        
        @media (min-width: 768px) {
          .tile-icon svg {
            width: 28px;
            height: 28px;
          }
          .tile-icon {
            top: 25px;
            left: 25px;
          }
        }
        
        .tile-content-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%);
          border-radius: 14px;
          pointer-events: none;
        }
        
        /* Hover Features - No bullets, left aligned, increased font size */
        .tile-features {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 14px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
        }
        
        .tile-wrap:hover .tile-features {
          opacity: 1;
          visibility: visible;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
          width: auto;
        }
        
        .features-list li {
          display: flex;
          align-items: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: #ffffff;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
        
        @media (max-width: 768px) {
          .features-list {
            gap: 10px;
          }
          .features-list li {
            font-size: 11px;
            white-space: normal;
            text-align: left;
          }
        }
        
        @media (min-width: 768px) {
          .features-list li {
            font-size: 14px;
          }
        }
        
        @media (min-width: 1024px) {
          .features-list li {
            font-size: 15px;
          }
        }
        
        /* Mobile grid - stacked layout (only 3 cards) */
        .mobile-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }
        
        .mobile-tile {
          width: 100%;
          height: 190px;
          opacity: 0;
        }
        
        /* Desktop grid - full width control (all 6 cards) */
        .desktop-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        @media (min-width: 1200px) {
          .desktop-grid {
            gap: 10px;
          }
        }
        
        .desktop-tile {
          opacity: 0;
          min-width: 0;
        }
        
        .heading-gradient {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Heading Section */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif">
          Industries{' '}
          <span className="heading-gradient">
            We Serve
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#6366F1] to-transparent mx-auto mt-6 mb-4" />
        <p className="text-white/40 text-xs sm:text-sm tracking-[4px] sm:tracking-[6px] uppercase font-montserrat font-light">
          Industries We Serve
        </p>
      </div>

      {/* Mobile Layout - Only shows EDUCATION, E-COMMERCE, CONSTRUCTION */}
      <div className="md:hidden w-full industries-section">
        <div className="mobile-stack">
          {mobileTiles.map((tile, index) => {
            const IconComponent = tile.icon;
            return (
              <div
                key={tile.id}
                ref={(el) => {
                  mobileTilesRef.current[index] = el;
                }}
                className="mobile-tile"
              >
                <div className="tile-wrap" style={{ width: "100%", height: "100%" }}>
                  <div className="tile-inner" style={{ clipPath: tile.clipPath }}>
                    <div className="tile-stone" />
                    <div className="tile-content-overlay" />
                    <div className="tile-icon">
                      <IconComponent size={22} strokeWidth={1.3} />
                    </div>
                    <div className="tile-name">{tile.name}</div>
                    <div className="tile-desc">{tile.desc}</div>
                    <div className="tile-features">
                      <ul className="features-list">
                        {tile.hoverFeatures.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="tile-glow" style={{ clipPath: tile.clipPath }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout - Shows all 6 cards */}
      <div className="hidden md:block w-full industries-section">
        <div className="desktop-grid">
          {tiles.map((tile, index) => {
            const IconComponent = tile.icon;
            return (
              <div
                key={tile.id}
                ref={(el) => {
                  desktopTilesRef.current[index] = el;
                }}
                className="desktop-tile"
                style={{
                  height: tile.id === 2 ? "220px" : tile.id === 5 ? "240px" : "230px",
                }}
              >
                <div className="tile-wrap" style={{ width: "100%", height: "100%" }}>
                  <div className="tile-inner" style={{ clipPath: tile.clipPath }}>
                    <div className="tile-stone" />
                    <div className="tile-content-overlay" />
                    <div className="tile-icon">
                      <IconComponent size={26} strokeWidth={1.3} />
                    </div>
                    <div className="tile-name">{tile.name}</div>
                    <div className="tile-desc">{tile.desc}</div>
                    <div className="tile-features">
                      <ul className="features-list">
                        {tile.hoverFeatures.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="tile-glow" style={{ clipPath: tile.clipPath }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
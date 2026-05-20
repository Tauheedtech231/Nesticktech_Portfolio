"use client";

import Image from "next/image";
import { useEffect, useState, useRef, ReactNode } from "react";

interface CinematicLoaderProps {
  children: ReactNode;
}

export default function CinematicLoader({ children }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "flash" | "done">("loading");
  const [loadingText, setLoadingText] = useState("INITIALIZING NESTICK TECH");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Enhanced particle system for FREE FIRE style
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
      color: string; life: number; maxLife: number;
    };

    const particles: Particle[] = [];
    const colors = ["#ff6b00", "#ff3300", "#ff9900", "#ffcc00", "#ff5500"];

    const spawnParticle = () => {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
      else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
      else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
      else { x = 0; y = Math.random() * canvas.height; }

      const cx = canvas.width / 2, cy = canvas.height / 2;
      const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 0.8;
      const speed = 1.5 + Math.random() * 3;

      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        alpha: 0.7 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 60 + Math.random() * 100,
      });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 2 === 0) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const t = p.life / p.maxLife;
        const alpha = p.alpha * (1 - t);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Progress simulation with FREE FIRE style timing
  useEffect(() => {
    const texts = [
      "INITIALIZING NESTICK TECH",
      "LOADING ASSETS...",
      "PREPARING BATTLEGROUND...",
      "CHECKING UPDATES...",
      "ALMOST READY...",
      "WELCOME TO NESTICK TECH",
    ];

    let current = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 2.5 + 0.8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("flash"), 300);
          setTimeout(() => setPhase("done"), 1000);
          return 100;
        }
        const idx = Math.floor((next / 100) * texts.length);
        if (idx !== current) {
          current = idx;
          setLoadingText(texts[Math.min(idx, texts.length - 1)]);
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
        opacity: phase === "flash" ? 0 : 1,
        transition: phase === "flash" ? "opacity 0.8s ease-out" : "none",
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
      }}
    >
      {/* Animated gradient background - FREE FIRE style orange glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 40%, rgba(255,107,0,0.12) 0%, rgba(0,0,0,0) 50%), radial-gradient(circle at 70% 60%, rgba(255,51,0,0.08) 0%, rgba(0,0,0,0) 50%)",
        }}
      />

      {/* Dark vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      {/* FREE FIRE Style - Large Background Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(80px, 20vw, 250px)",
            fontWeight: 900,
            color: "transparent",
            background: "linear-gradient(135deg, #ff6b00, #ff3300, #ff9900)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            letterSpacing: "0.2em",
            whiteSpace: "nowrap",
            filter: "blur(2px)",
          }}
        >
          NT
        </div>
      </div>

      {/* Large "NESTICK TECH" behind content */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: 0.04,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "clamp(40px, 10vw, 100px)",
            fontWeight: 900,
            letterSpacing: "0.3em",
            color: "#ff6b00",
            fontFamily: "'Orbitron', sans-serif",
            textTransform: "uppercase",
          }}
        >
          NESTICK TECH
        </div>
      </div>

      {/* FREE FIRE Style - Brand Logo at Top Left with 50% opacity during loading */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 10,
          opacity: 0.5, // 50% opacity as requested
        }}
      >
        <div style={{ position: "relative", width: "45px", height: "45px" }}>
          <Image
            src="/nesticklogo.jpg"
            alt="Nestick Logo"
            fill
            className="object-contain rounded-full"
            style={{ filter: "drop-shadow(0 0 15px #ff6b00)" }}
          />
        </div>
        <div>
          <span
            style={{
              fontSize: "clamp(14px, 3vw, 20px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "#fff",
              textShadow: "0 0 15px #ff6b00, 0 0 30px #ff3300",
              fontFamily: "'Orbitron', sans-serif",
              textTransform: "uppercase",
            }}
          >
            NESTICK
          </span>
          <span
            style={{
              fontSize: "clamp(14px, 3vw, 20px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "#ff6b00",
              textShadow: "0 0 15px #ff6b00",
              fontFamily: "'Orbitron', sans-serif",
              textTransform: "uppercase",
              marginLeft: "4px",
            }}
          >
            TECH
          </span>
        </div>
      </div>

      {/* FREE FIRE Style - Loading bar at BOTTOM (like Free Fire) */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(600px, 90vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Loading text with FREE FIRE style */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(10px, 2vw, 12px)",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.8)",
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: "'Rajdhani', sans-serif",
            textAlign: "center",
          }}
        >
          {loadingText}
        </p>

        {/* Progress bar container - FREE FIRE style orange bar */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Track */}
          <div
            style={{
              width: "100%",
              height: "3px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "2px",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Fill - Orange gradient like Free Fire */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: "2px",
                background:
                  "linear-gradient(90deg, #ff6b00 0%, #ff9900 50%, #ffcc00 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.2s linear infinite",
                boxShadow: "0 0 12px #ff6b00, 0 0 24px #ff9900aa",
                transition: "width 0.08s linear",
                position: "relative",
              }}
            >
              {/* Glowing tip - Fire effect */}
              <div
                style={{
                  position: "absolute",
                  right: "-4px",
                  top: "-6px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 0 10px #fff, 0 0 25px #ff6b00, 0 0 40px #ff9900",
                  opacity: progress < 100 ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
          </div>
        </div>

        {/* Percentage counter - FREE FIRE style big number */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "3px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(28px, 5vw, 38px)",
              fontWeight: 900,
              color: "#ff6b00",
              fontFamily: "'Orbitron', sans-serif",
              lineHeight: 1,
              textShadow: "0 0 30px #ff6b00, 0 0 60px #ff3300",
              letterSpacing: "0.05em",
            }}
          >
            {Math.floor(progress)}
          </span>
          <span
            style={{
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontWeight: 700,
              color: "rgba(255,107,0,0.8)",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            %
          </span>
        </div>
      </div>

      {/* FREE FIRE Style - Fire particles effect at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, rgba(255,107,0,0.1) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Shimmer keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;700&family=Orbitron:wght@700;900&display=swap');

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes firePulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
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

  // Particle system on canvas
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
    const colors = ["#00e5ff", "#6366f1", "#39ff14", "#8b5cf6", "#fff700"];

    const spawnParticle = () => {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
      else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
      else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
      else { x = 0; y = Math.random() * canvas.height; }

      const cx = canvas.width / 2, cy = canvas.height / 2;
      const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 0.6;
      const speed = 1 + Math.random() * 2.5;

      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2.5,
        alpha: 0.6 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 80 + Math.random() * 120,
      });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 3 === 0) spawnParticle();

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
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
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

  // Progress simulation
  useEffect(() => {
    const texts = [
      "INITIALIZING NESTICK TECH",
      "LOADING ASSETS...",
      "PREPARING EXPERIENCE...",
      "ALMOST READY...",
      "WELCOME TO NESTICK TECH",
    ];

    let current = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3.2 + 0.5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("flash"), 200);
          setTimeout(() => setPhase("done"), 800);
          return 100;
        }
        const idx = Math.floor((next / 100) * texts.length);
        if (idx !== current) {
          current = idx;
          setLoadingText(texts[Math.min(idx, texts.length - 1)]);
        }
        return next;
      });
    }, 40);

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
        transition: phase === "flash" ? "opacity 0.6s ease" : "none",
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.08) 0%, rgba(0,0,0,0) 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.06) 0%, rgba(0,0,0,0) 50%)",
        }}
      />

      {/* Dark vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.55,
        }}
      />

      {/* Nestick Tech logo - Centered at top */}
      <div
  style={{
    position: "absolute",
    top: "32px",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  }}
>
  {/* Small Rounded Logo Image */}
  <div style={{ position: "relative", width: "40px", height: "40px" }}>
    <Image
      src="/nesticklogo.jpg"
      alt="Nestick Logo"
      fill
      className="object-contain rounded-full"
      style={{ filter: "drop-shadow(0 0 10px #6366f1)" }}
    />
  </div>
  
  <span
    style={{
      fontSize: "clamp(20px, 4vw, 32px)",
      fontWeight: 900,
      letterSpacing: "0.08em",
      color: "#fff",
      textShadow: "0 0 20px #6366f1, 0 0 40px #8b5cf6",
      fontFamily: "'Orbitron', sans-serif",
      textTransform: "uppercase",
    }}
  >
    NESTICK
  </span>
  <span
    style={{
      fontSize: "clamp(20px, 4vw, 32px)",
      fontWeight: 900,
      letterSpacing: "0.08em",
      color: "#6366f1",
      textShadow: "0 0 20px #6366f1, 0 0 40px #8b5cf6",
      fontFamily: "'Orbitron', sans-serif",
      textTransform: "uppercase",
    }}
  >
    TECH
  </span>
</div>

      {/* Central Glowing Logo - Background element */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(60px, 15vw, 180px)",
            fontWeight: 900,
            color: "transparent",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}
        >
          NT
        </div>
      </div>

      {/* Loading bar area - PERFECTLY CENTERED vertically and horizontally */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(500px, 85vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Loading text */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(11px, 2.5vw, 14px)",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 500,
            textTransform: "uppercase",
            fontFamily: "'Rajdhani', sans-serif",
            textAlign: "center",
          }}
        >
          {loadingText}
        </p>

        {/* Progress bar container */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Track */}
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Fill */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: "4px",
                background:
                  "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s linear infinite",
                boxShadow: "0 0 8px #6366f1, 0 0 16px #8b5cf6aa",
                transition: "width 0.1s linear",
                position: "relative",
              }}
            >
              {/* Glowing tip */}
              <div
                style={{
                  position: "absolute",
                  right: "-3px",
                  top: "-5px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 0 8px #fff, 0 0 20px #8b5cf6",
                  opacity: progress < 100 ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
          </div>

          {/* Tick marks */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              padding: "0 2px",
            }}
          >
            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                style={{
                  fontSize: "10px",
                  color:
                    progress >= tick
                      ? "rgba(139,92,246,0.9)"
                      : "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em",
                  fontFamily: "'Rajdhani', sans-serif",
                  transition: "color 0.3s",
                  fontWeight: 500,
                }}
              >
                {tick}%
              </span>
            ))}
          </div>
        </div>

        {/* Percentage counter */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "2px",
            marginTop: "4px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 900,
              color: "#fff",
              fontFamily: "'Orbitron', sans-serif",
              lineHeight: 1,
              textShadow: "0 0 24px #8b5cf6",
              letterSpacing: "0.03em",
            }}
          >
            {Math.floor(progress)}
          </span>
          <span
            style={{
              fontSize: "clamp(16px, 3vw, 22px)",
              fontWeight: 700,
              color: "rgba(139,92,246,0.85)",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            %
          </span>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;700&family=Orbitron:wght@700;900&display=swap');

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
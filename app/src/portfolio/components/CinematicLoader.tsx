// components/CinematicLoader.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

interface CinematicLoaderProps {
  children: ReactNode;
}

export default function CinematicLoader({
  children,
}: CinematicLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <Image
          src="/backlogo.png"
          alt="background"
          fill
          priority
          className="object-cover opacity-[0.12] scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/88" />

        {/* BLUE GLOW */}
        <div className="absolute w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-3xl animate-pulse" />

        {/* MAIN LOADER */}
        <div className="relative w-[240px] h-[240px] flex items-center justify-center">

          {/* ROTATING RING */}
          <div className="loader-ring">
            {[...Array(36)].map((_, i) => (
              <span
                key={i}
                style={
                  {
                    "--i": i,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* CENTER CIRCLE */}
          <div className="absolute w-[132px] h-[132px] rounded-full bg-black z-10 border border-blue-500/20 shadow-[0_0_60px_rgba(0,140,255,0.28)]" />

          {/* CENTER TEXT */}
          <div className="absolute z-20 flex flex-col items-center justify-center">
            <h1 className="text-[18px] font-semibold tracking-[0.22em] uppercase text-blue-300 drop-shadow-[0_0_15px_rgba(0,153,255,0.9)] whitespace-nowrap">
              Nestick
            </h1>

            <span className="text-[11px] tracking-[0.5em] uppercase text-blue-500 mt-[3px]">
              Tech
            </span>
          </div>
        </div>

        <style jsx>{`
          .loader-ring {
            position: relative;
            width: 240px;
            height: 240px;
            animation: spin 1.7s linear infinite;
          }

          .loader-ring span {
            position: absolute;
            top: 50%;
            left: 50%;

            width: 8px;
            height: 34px;

            border-radius: 999px;

            background: linear-gradient(
              to bottom,
              #66d9ff,
              #00a6ff,
              #005eff
            );

            transform:
              translate(-50%, -50%)
              rotate(calc(var(--i) * 10deg))
              translateY(-82px);

            opacity: calc(var(--i) / 36);

            box-shadow:
              0 0 8px rgba(0,153,255,1),
              0 0 20px rgba(0,153,255,0.85),
              0 0 40px rgba(0,153,255,0.45);
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
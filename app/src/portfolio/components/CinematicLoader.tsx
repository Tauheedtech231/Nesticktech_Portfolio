/* eslint-disable react-hooks/purity */
// components/CinematicLoader.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* BACKGROUND LOGO */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            exit={{
              scale: 1.5,
              opacity: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          >
            <Image
              src="/nesticktech.jpg"
              alt="background logo"
              fill
              priority
              className="object-contain opacity-[0.06] scale-[1.35]"
            />
          </motion.div>

          {/* DARK OVERLAY */}
          <motion.div 
            className="absolute inset-0 bg-black/88"
            exit={{
              opacity: 0,
              transition: { duration: 0.6 }
            }}
          />

          {/* SMALL PARTICLES */}
          <div className="particles">
            {[...Array(70)].map((_, i) => (
              <span
                key={i}
                className="particle"
                style={
                  {
                    "--x": `${Math.random() * 100}%`,
                    "--y": `${Math.random() * 100}%`,
                    "--size": `${Math.random() * 3 + 1}px`,
                    "--duration": `${Math.random() * 8 + 5}s`,
                    "--delay": `${Math.random() * 5}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* BLUE GLOW */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            exit={{
              scale: 2,
              opacity: 0,
              transition: { duration: 0.6 }
            }}
            className="absolute w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-3xl"
          />

          {/* MAIN LOADER */}
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.3,
              opacity: 0,
              y: -150,
              transition: {
                duration: 0.9,
                ease: [0.65, 0, 0.35, 1],
              },
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center"
          >
            {/* ROTATING RING */}
            <div className="loader-ring">
              {[...Array(48)].map((_, i) => (
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

            {/* CENTER LOGO */}
            <motion.div 
              className="absolute w-[180px] h-[180px] rounded-full overflow-hidden border-[3px] border-blue-400/70 bg-black z-20 shadow-[0_0_45px_rgba(0,153,255,0.7)]"
              exit={{
                scale: 0,
                borderRadius: "50%",
                transition: {
                  duration: 0.7,
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
            >
              <Image
                src="/nesticklogo.jpg"
                alt="Nestick Logo"
                fill
                priority
                className="object-cover scale-110"
              />
            </motion.div>
          </motion.div>

         

          <style jsx>{`
            .loader-ring {
              position: relative;
              width: 290px;
              height: 290px;
              animation: spin 5s linear infinite;
            }

            .loader-ring span {
              position: absolute;
              top: 50%;
              left: 50%;

              width: 7px;
              height: 34px;

              border-radius: 999px;

              background: linear-gradient(
                to bottom,
                #8ce7ff,
                #00bfff,
                #005eff
              );

              transform:
                translate(-50%, -50%)
                rotate(calc(var(--i) * 7.5deg))
                translateY(-114px);

              opacity: calc(var(--i) / 48);

              box-shadow:
                0 0 8px rgba(0,191,255,1),
                0 0 18px rgba(0,153,255,0.85),
                0 0 35px rgba(0,153,255,0.45);
            }

            /* PARTICLES */

            .particles {
              position: absolute;
              inset: 0;
              overflow: hidden;
            }

            .particle {
              position: absolute;

              left: var(--x);
              top: var(--y);

              width: var(--size);
              height: var(--size);

              border-radius: 999px;

              background: #6fdcff;

              opacity: 0.4;

              box-shadow:
                0 0 6px rgba(111,220,255,0.9),
                0 0 14px rgba(0,153,255,0.5);

              animation:
                floatParticle var(--duration) ease-in-out infinite,
                pulseParticle 3s ease-in-out infinite;

              animation-delay: var(--delay);
            }

            @keyframes floatParticle {
              0% {
                transform: translateY(0px) translateX(0px);
              }

              50% {
                transform: translateY(-20px) translateX(10px);
              }

              100% {
                transform: translateY(0px) translateX(0px);
              }
            }

            @keyframes pulseParticle {
              0%,
              100% {
                opacity: 0.15;
              }

              50% {
                opacity: 0.8;
              }
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
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
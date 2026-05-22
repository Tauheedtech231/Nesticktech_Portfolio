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
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // System theme detection
  useEffect(() => {
    const getSystemTheme = (): 'dark' | 'light' => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    };

    setTheme(getSystemTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const frame = window.requestAnimationFrame(() => {
        setContentVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    return undefined;
  }, [isLoading]);

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const overlayColor = isDark ? 'bg-black/88' : 'bg-white/88';
  const ringGradient = isDark 
    ? 'linear-gradient(to bottom, #8ce7ff, #00bfff, #005eff)'
    : 'linear-gradient(to bottom, #4a90e2, #2563eb, #1e40af)';
  const particleColor = isDark ? '#6fdcff' : '#3b82f6';
  const glowColor = isDark ? 'bg-blue-500/10' : 'bg-blue-600/20';
  const logoBorder = isDark ? 'border-blue-400/70' : 'border-blue-600/80';
  const logoShadow = isDark ? '0 0 45px rgba(0,153,255,0.7)' : '0 0 45px rgba(37,99,235,0.5)';

  return (
    <>
      {/* WEBSITE CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.06,
        }}
        animate={{
          opacity: contentVisible ? 1 : 0,
          scale: contentVisible ? 1 : 1.06,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative ${
          contentVisible
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            onAnimationComplete={() => {
              if (!isLoading) {
                setContentVisible(true);
                document.body.style.overflow = "auto";
              }
            }}
            className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden ${bgColor}`}
          >
            {/* BACKGROUND LOGO */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/nesticktech.jpg"
                alt="background logo"
                fill
                priority
                className="object-contain opacity-[0.06] scale-[1.35]"
              />
            </motion.div>

            {/* OVERLAY - Theme aware */}
            <div className={`absolute inset-0 ${overlayColor}`} />

            {/* PARTICLES */}
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
                      "--particle-color": particleColor,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* GLOW - Theme aware */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute w-[420px] h-[420px] rounded-full ${glowColor} blur-3xl`}
            />

            {/* MAIN LOADER */}
            <motion.div
              initial={{
                scale: 0.75,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                x: 500,
                scale: 0.18,
                rotate: 14,
                opacity: 0,
                filter: "blur(30px)",
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* ROTATING RING */}
              <div className="loader-ring">
                {[...Array(48)].map((_, i) => (
                  <span
                    key={i}
                    style={
                      {
                        "--i": i,
                        "--ring-gradient": ringGradient,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              {/* CENTER LOGO */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute w-[180px] h-[180px] rounded-full overflow-hidden border-[3px] ${logoBorder} bg-black z-20 shadow-[var(--logo-shadow)]`}
                style={{ "--logo-shadow": logoShadow } as React.CSSProperties}
              >
                <Image
                  src="/nesticklogo.jpg"
                  alt="Nestick Logo"
                  fill
                  priority
                  className="object-cover scale-110"
                />
              </motion.div>

              {/* LOADING TEXT - Shows user what's happening */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={`absolute -bottom-16 text-xs font-mono tracking-wider ${isDark ? 'text-white/60' : 'text-gray-600'} text-center whitespace-nowrap`}
              >
                Loading experience
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ...
                </motion.span>
              </motion.p>
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

                background: var(--ring-gradient, linear-gradient(to bottom, #8ce7ff, #00bfff, #005eff));

                transform:
                  translate(-50%, -50%)
                  rotate(calc(var(--i) * 7.5deg))
                  translateY(-114px);

                opacity: calc(var(--i) / 48);

                box-shadow:
                  0 0 8px rgba(0,191,255,0.8),
                  0 0 18px rgba(0,153,255,0.6),
                  0 0 35px rgba(0,153,255,0.3);
              }

              /* PARTICLES */

              .particles {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
              }

              .particle {
                position: absolute;

                left: var(--x);
                top: var(--y);

                width: var(--size);
                height: var(--size);

                border-radius: 999px;

                background: var(--particle-color, #6fdcff);

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

              /* Hide scrollbar during loading */
              body {
                overflow: hidden;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
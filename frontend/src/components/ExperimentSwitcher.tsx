import { useEffect, useRef, useState } from 'react';

import {
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import { ExperimentProfile } from '../features/experiments/experimentProfiles';

import { useAppDispatch } from '../store';

import { setActiveProfile } from '../features/experiments/experimentSlice';

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface ExperimentSwitcherProps {
  activeProfile: ExperimentProfile;
  profiles: ExperimentProfile[];
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function ExperimentSwitcher({
  activeProfile,
  profiles
}: ExperimentSwitcherProps) {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  /* ========================================================= */
  /* CLOSE ON OUTSIDE CLICK */
  /* ========================================================= */

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      window.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* ========================================================= */}
      {/* TOGGLE BUTTON */}
      {/* ========================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        aria-expanded={isOpen}
        aria-label="Select experiment profile"
        className="
          group relative flex
          min-w-[240px]
          items-center justify-between
          overflow-hidden rounded-2xl
          border border-white/6
          bg-white/3
          px-4 py-3
          backdrop-blur-xl
          transition-all duration-300

          hover:border-cyan-400/20
          hover:bg-white/4

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-400/30
        "
      >
        {/* glow */}

        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 transition-opacity duration-500

            group-hover:opacity-100
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_70%)]" />
        </div>

        {/* left */}

        <div className="relative flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <Sparkles
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 text-left">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Active profile
            </p>

            <p
              className="
                mt-1 truncate
                text-sm font-medium
                text-white/92
              "
            >
              {activeProfile.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-white/40">
              {activeProfile.mode}
            </p>
          </div>
        </div>

        {/* icon */}

        <ChevronDown
          className={`
            relative h-4 w-4 shrink-0
            text-white/40
            transition-transform duration-300

            ${
              isOpen
                ? 'rotate-180'
                : ''
            }
          `}
        />
      </button>

      {/* ========================================================= */}
      {/* DROPDOWN */}
      {/* ========================================================= */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="
              absolute right-0 top-[calc(100%+12px)]
              z-50 w-full
              overflow-hidden rounded-2xl
              border border-white/6
              bg-[#0a0f1d]/95
              shadow-[0_24px_80px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
            "
          >
            <div className="p-2">
              {profiles.map((profile) => {
                const isActive =
                  profile.id ===
                  activeProfile.id;

                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => {
                      dispatch(
                        setActiveProfile(
                          profile.id
                        )
                      );

                      setIsOpen(false);
                    }}
                    className={`
                      group flex w-full
                      items-center justify-between
                      rounded-xl px-4 py-3
                      text-left
                      transition-all duration-200

                      ${
                        isActive
                          ? 'bg-cyan-500/10'
                          : 'hover:bg-white/4'
                      }
                    `}
                  >
                    {/* content */}

                    <div className="min-w-0">
                      <p
                        className={`
                          truncate text-sm
                          font-medium

                          ${
                            isActive
                              ? 'text-cyan-300'
                              : 'text-white/90'
                          }
                        `}
                      >
                        {profile.name}
                      </p>

                      <p
                        className={`
                          mt-1 truncate
                          text-xs

                          ${
                            isActive
                              ? 'text-cyan-300/60'
                              : 'text-white/35'
                          }
                        `}
                      >
                        {profile.mode}
                      </p>
                    </div>

                    {/* check */}

                    <div
                      className={`
                        flex h-7 w-7 shrink-0
                        items-center justify-center
                        rounded-lg transition-all duration-200

                        ${
                          isActive
                            ? 'bg-cyan-400/10 text-cyan-300'
                            : 'bg-transparent text-transparent'
                        }
                      `}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
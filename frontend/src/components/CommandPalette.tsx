/* ========================================================= */
/* COMMAND PALETTE — REFINED OPERATIONAL VERSION */
/* ========================================================= */

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Command,
  Cpu,
  FileText,
  Gauge,
  Search,
  ShieldCheck,
  Wifi
} from 'lucide-react';

import {
  AnimatePresence,
  motion
} from 'framer-motion';

import { Link } from 'react-router-dom';

/* ========================================================= */
/* COMMANDS */
/* ========================================================= */

const commands = [
  {
    label: 'Open telemetry overview',
    description:
      'Jump to realtime system telemetry.',
    path: '/dashboard#overview',
    icon: <Cpu size={16} />
  },

  {
    label: 'Inspect anomaly center',
    description:
      'Review operational deviations and alerts.',
    path: '/dashboard#anomalies',
    icon: <AlertTriangle size={16} />
  },

  {
    label: 'Open infrastructure health',
    description:
      'Inspect telemetry reliability and uptime.',
    path: '/dashboard#health',
    icon: <ShieldCheck size={16} />
  },

  {
    label: 'Inspect event timeline',
    description:
      'Review recent telemetry incidents.',
    path: '/dashboard#timeline',
    icon: <Activity size={16} />
  },

  {
    label: 'Open operator notes',
    description:
      'Access operational observations.',
    path: '/dashboard#notes',
    icon: <FileText size={16} />
  },

  {
    label: 'Review telemetry table',
    description:
      'Inspect raw realtime signal data.',
    path: '/dashboard#telemetry',
    icon: <Gauge size={16} />
  }
];

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface CommandPaletteProps {
  onClose: () => void;
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

function CommandPaletteComponent({
  onClose
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* ========================================================= */
  /* ESC CLOSE */
  /* ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
  }, [onClose]);

  /* ========================================================= */
  /* AUTO FOCUS */
  /* ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  /* ========================================================= */
  /* FILTER */
  /* ========================================================= */

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) =>
      `${command.label} ${command.description}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query]);

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          duration: 0.15
        }}
        onClick={onClose}
        className="
          fixed inset-0 z-[120]
          flex items-start justify-center
          bg-black/60
          px-4 pt-[10vh]
          backdrop-blur-md
        "
      >
        {/* ========================================================= */}
        {/* PANEL */}
        {/* ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
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
            scale: 0.985
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
          className="
            relative w-full
            max-w-2xl overflow-hidden
            rounded-3xl
            border border-white/[0.05]
            bg-[#070d18]/95
            shadow-[0_40px_120px_rgba(0,0,0,0.45)]
          "
        >
          {/* ========================================================= */}
          {/* AMBIENT */}
          {/* ========================================================= */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-m-blue-light/10 blur-3xl" />
          </div>

          {/* ========================================================= */}
          {/* SEARCH */}
          {/* ========================================================= */}

          <div className="relative border-b border-white/[0.05] p-4 sm:p-5">
            <div
              className="
                flex items-center gap-4
                rounded-2xl
                border border-white/[0.05]
                bg-white/[0.03]
                px-4 py-4
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-m-blue-light/10
                  text-m-blue-light
                "
              >
                <Search size={18} />
              </div>

              <input
                ref={inputRef}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search telemetry actions..."
                className="
                  w-full bg-transparent
                  text-[15px] text-white
                  outline-none
                  placeholder:text-white/30
                "
              />

              <div
                className="
                  hidden rounded-lg
                  border border-white/[0.05]
                  bg-white/[0.03]
                  px-2 py-1

                  sm:flex
                "
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  esc
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RESULTS */}
          {/* ========================================================= */}

          <div className="max-h-[420px] overflow-y-auto p-3">
            {!filteredCommands.length ? (
              <div
                className="
                  flex flex-col items-center
                  justify-center
                  px-6 py-16
                  text-center
                "
              >
                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    border border-white/[0.05]
                    bg-white/[0.03]
                  "
                >
                  <Command
                    size={22}
                    className="text-white/35"
                  />
                </div>

                <h3 className="mt-6 text-base font-medium text-white">
                  No matching actions
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-7 text-white/45">
                  Try searching for telemetry,
                  anomalies, infrastructure,
                  or operators.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCommands.map(
                  (command) => (
                    <Link
                      key={command.label}
                      to={command.path}
                      onClick={onClose}
                      className="
                        group flex items-center
                        justify-between gap-4
                        rounded-2xl
                        border border-transparent
                        px-4 py-4
                        transition-all duration-200

                        hover:border-white/[0.05]
                        hover:bg-white/[0.03]
                      "
                    >
                      {/* LEFT */}

                      <div className="flex min-w-0 items-start gap-4">
                        <div
                          className="
                            mt-0.5 flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-m-blue-light/10
                            text-m-blue-light
                          "
                        >
                          {command.icon}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {command.label}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-white/45">
                            {command.description}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}

                      <div
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          border border-white/[0.05]
                          bg-white/[0.03]
                          text-white/30
                          transition-all duration-200

                          group-hover:border-m-blue-light/20
                          group-hover:bg-m-blue-light/10
                          group-hover:text-m-blue-light
                        "
                      >
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* FOOTER */}
          {/* ========================================================= */}

          <div
            className="
              flex items-center justify-between
              border-t border-white/[0.05]
              px-5 py-4
            "
          >
            <div className="flex items-center gap-2">
              <Wifi
                size={13}
                className="text-success"
              />

              <span className="text-[11px] uppercase tracking-[0.18em] text-white/28">
                telemetry command system
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="
                  rounded-md
                  border border-white/[0.05]
                  bg-white/[0.03]
                  px-2 py-1
                "
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  enter
                </span>
              </div>

              <span className="text-[11px] text-white/28">
                execute
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ========================================================= */
/* EXPORT */
/* ========================================================= */

export const CommandPalette = memo(
  CommandPaletteComponent
);
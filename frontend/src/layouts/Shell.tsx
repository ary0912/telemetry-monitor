import type { ReactNode } from 'react';

import {
  Link,
  useLocation
} from 'react-router-dom';

import {
  LayoutGrid,
  ArrowLeft,
  Wifi,
  Activity,
  ShieldCheck,
  Search,
  X
} from 'lucide-react';

import {
  AnimatePresence,
  motion
} from 'framer-motion';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import { useAppSelector } from '../store';

/* ================================================= */
/* SHELL */
/* ================================================= */

export function Shell({
  children
}: {
  children: ReactNode;
}) {
  const location =
    useLocation();

  const [
    isSearchOpen,
    setIsSearchOpen
  ] = useState(false);

  const {
    connected,
    wsLatency,
    healthScore,
    messageCount
  } = useAppSelector(
    (state) => state.telemetry
  );

  /* ================================================= */
  /* CMD + K */
  /* ================================================= */

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      const isCommand =
        e.metaKey || e.ctrlKey;

      if (
        isCommand &&
        e.key.toLowerCase() ===
          'k'
      ) {
        e.preventDefault();

        setIsSearchOpen(
          (prev) => !prev
        );
      }

      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-on-dark">
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-m-blue-light/5 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-m-blue-dark/5 blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize:
              '80px 80px'
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.45)_100%)]" />
      </div>

      {/* ================================================= */}
      {/* LAYOUT */}
      {/* ================================================= */}

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[88px_1fr]">
        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside
          className="lg:h-screen h-auto border-r border-white/5 bg-surface-soft/30 backdrop-blur-2xl"
          aria-label="Application navigation"
        >
          <div className="flex h-auto lg:h-screen flex-col items-center justify-between px-4 py-6">
            {/* TOP */}

            <nav className="flex flex-col items-center gap-5">
              {/* LOGO */}

              <Link
                to="/"
                className="
                  group relative flex h-14 w-14
                  items-center justify-center
                  overflow-hidden rounded-2xl
                  border border-cyan-400/15
                  bg-cyan-400/8
                  transition-all duration-300

                  hover:border-cyan-400/30
                  hover:bg-cyan-400/12
                "
              >
                <div className="relative flex items-center gap-[2px] text-[1rem] font-semibold tracking-[-0.08em]">
                  <span className="text-cyan-300">
                    T
                  </span>

                  <span>
                    M
                  </span>
                </div>
              </Link>

              {/* DASHBOARD */}

              <SidebarButton
                to="/dashboard"
                active={
                  location.pathname ===
                  '/dashboard'
                }
                icon={
                  <LayoutGrid className="h-5 w-5" />
                }
                label="Dashboard"
              />

              {/* SEARCH */}

              <button
                onClick={() =>
                  setIsSearchOpen(
                    true
                  )
                }
                aria-label="Open command palette"
                className="
                  group relative flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  border border-white/5
                  bg-white/2
                  text-muted
                  transition-all duration-300

                  hover:border-cyan-400/20
                  hover:bg-cyan-400/8
                  hover:text-cyan-300
                "
              >
                <Search className="h-5 w-5" />
              </button>
            </nav>

            {/* BOTTOM */}

            <SidebarButton
              to="/"
              icon={
                <ArrowLeft className="h-5 w-5" />
              }
              label="Back"
            />
          </div>
        </aside>

        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <main className="flex min-h-screen flex-col overflow-hidden">
          {/* HEADER */}

          <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="flex flex-col gap-5 px-8 py-5 xl:flex-row xl:items-center xl:justify-between">
              {/* LEFT */}

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Mission workspace
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Telemetry Observability Platform
                </h1>
              </div>

              {/* RIGHT */}

              <div className="flex flex-wrap items-center gap-3">
                <StatusPill
                  icon={
                    <Wifi size={14} />
                  }
                  label="Stream"
                  value={
                    connected
                      ? 'Live'
                      : 'Offline'
                  }
                />

                <StatusPill
                  icon={
                    <Activity size={14} />
                  }
                  label="Latency"
                  value={`${wsLatency.toFixed(
                    0
                  )} ms`}
                />

                <StatusPill
                  icon={
                    <ShieldCheck size={14} />
                  }
                  label="Health"
                  value={`${healthScore}%`}
                />

                <StatusPill
                  icon={
                    <Activity size={14} />
                  }
                  label="Events"
                  value={`${messageCount}`}
                />
              </div>
            </div>
          </header>

          {/* PAGE */}

          <div className="relative flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      {/* SEARCH */}

      <AnimatePresence>
        {isSearchOpen && (
          <SearchPalette
            onClose={() =>
              setIsSearchOpen(
                false
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================= */
/* SIDEBAR BUTTON */
/* ================================================= */

function SidebarButton({
  to,
  icon,
  label,
  active
}: {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`
        flex h-14 w-14
        items-center justify-center
        rounded-2xl border
        transition-all duration-300

        ${
          active
            ? `
              border-cyan-400/20
              bg-cyan-400/10
              text-cyan-300
            `
            : `
              border-white/5
              bg-white/2
              text-white/40

              hover:border-cyan-400/15
              hover:bg-cyan-400/8
              hover:text-cyan-300
            `
        }
      `}
    >
      {icon}
    </Link>
  );
}

/* ================================================= */
/* STATUS PILL */
/* ================================================= */

function StatusPill({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-full border
        border-white/5
        bg-white/2
        px-4 py-3
      "
    >
      <div className="text-cyan-300">
        {icon}
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================================================= */
/* SEARCH PALETTE */
/* ================================================= */

function SearchPalette({
  onClose
}: {
  onClose: () => void;
}) {
  const [query, setQuery] =
    useState('');

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const location =
    useLocation();

  const options = useMemo(
    () => [
      {
        title:
          'Telemetry Overview',
        description:
          'Realtime telemetry intelligence and signal overview',
        id: 'telemetry-overview'
      },

      {
        title:
          'Anomaly Center',
        description:
          'Operational anomaly detection and incident monitoring',
        id: 'anomaly-center'
      },

      {
        title:
          'Operational Health',
        description:
          'Infrastructure confidence and system health scoring',
        id: 'operational-health'
      },

      {
        title:
          'Active Streams',
        description:
          'Realtime stream events and timeline activity',
        id: 'active-streams'
      },

      {
        title:
          'System Analytics',
        description:
          'Telemetry datasets and metric analytics',
        id: 'system-analytics'
      }
    ],
    []
  );

  const filtered = useMemo(
    () =>
      options.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            ) ||
          item.description
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      ),
    [query, options]
  );

  const navigateToSection = (
    id: string
  ) => {
    onClose();

    requestAnimationFrame(() => {
      if (
        location.pathname !==
        '/dashboard'
      ) {
        window.location.href = `/dashboard#${id}`;

        return;
      }

      const element =
        document.getElementById(
          id
        );

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (
        e.key === 'ArrowDown'
      ) {
        e.preventDefault();

        setSelectedIndex(
          (prev) =>
            prev >=
            filtered.length - 1
              ? 0
              : prev + 1
        );
      }

      if (
        e.key === 'ArrowUp'
      ) {
        e.preventDefault();

        setSelectedIndex(
          (prev) =>
            prev <= 0
              ? filtered.length -
                1
              : prev - 1
        );
      }

      if (e.key === 'Enter') {
        e.preventDefault();

        const item =
          filtered[
            selectedIndex
          ];

        if (item) {
          navigateToSection(
            item.id
          );
        }
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [
    filtered,
    selectedIndex
  ]);

  return (
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
      className="
        fixed inset-0 z-[100]
        flex items-start justify-center
        bg-black/70
        px-4 pt-24
        backdrop-blur-xl
      "
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
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
          duration: 0.22
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="
          w-full max-w-2xl
          overflow-hidden rounded-3xl
          border border-white/10
          bg-[#0b1019]/96
          shadow-[0_50px_140px_rgba(0,0,0,0.55)]
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center gap-4 border-b border-white/5 px-6 py-5">
          <div className="sr-only" id="command-palette-title">
            Search telemetry workspace
          </div>

          <Search className="h-5 w-5 text-cyan-300" />

          <input
            autoFocus
            aria-labelledby="command-palette-title"
            value={query}
            onChange={(e) => {
              setQuery(
                e.target.value
              );

              setSelectedIndex(0);
            }}
            placeholder="Search telemetry modules..."
            className="
              w-full bg-transparent
              text-[15px] text-white
              outline-none
              placeholder:text-white/30
            "
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search palette"
            className="rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-3">
          {filtered.map(
            (item, index) => (
              <button
                key={item.id}
                onClick={() =>
                  navigateToSection(
                    item.id
                  )
                }
                className={`
                  flex w-full
                  items-center justify-between
                  rounded-2xl
                  border px-5 py-5
                  text-left transition-all duration-200

                  ${
                    selectedIndex ===
                    index
                      ? `
                        border-cyan-400/15
                        bg-white/5
                      `
                      : `
                        border-transparent
                        hover:border-cyan-400/10
                        hover:bg-white/3
                      `
                  }
                `}
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    {
                      item.description
                    }
                  </p>
                </div>

                <div className="text-cyan-300">
                  ↵
                </div>
              </button>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
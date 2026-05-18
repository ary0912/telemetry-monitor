import { useMemo } from 'react';

import {
  Clock3,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward
} from 'lucide-react';

import {
  useAppDispatch,
  useAppSelector
} from '../store';

import {
  setReplayMode,
  setReplayPosition
} from '../store/telemetrySlice';

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function SessionReplayPanel() {
  const dispatch =
    useAppDispatch();

  const {
    replayMode,
    replayPosition,
    readings
  } = useAppSelector(
    (state) => state.telemetry
  );

  /* ========================================================= */
  /* DURATION */
  /* ========================================================= */

  const duration = useMemo(() => {
    if (readings.length < 2) {
      return 0;
    }

    return (
      readings[
        readings.length - 1
      ].timestamp -
      readings[0].timestamp
    );
  }, [readings]);

  /* ========================================================= */
  /* PROGRESS */
  /* ========================================================= */

  const progress = useMemo(() => {
    if (!duration) {
      return 2;
    }

    return Math.min(
      100,
      Math.max(
        0,
        (replayPosition /
          duration) *
          100
      )
    );
  }, [
    replayPosition,
    duration
  ]);

  /* ========================================================= */
  /* HELPERS */
  /* ========================================================= */

  const formatWindow = (
    value: number
  ) => {
    if (!value) {
      return 'No session';
    }

    return `${Math.round(
      value / 1000
    )}s window`;
  };

  const stepAmount =
    duration * 0.1;

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <section
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/6
        bg-white/2
        backdrop-blur-2xl
      "
    >
      {/* ambient glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-40px] top-[-20px] h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          relative flex flex-col gap-5
          border-b border-white/6
          px-6 py-5

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        {/* left */}

        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Playback engine
            </p>
          </div>

          <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.05em] text-white">
            Session replay
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-7 text-white/42">
            Navigate historical
            telemetry windows to
            inspect signal behaviour,
            anomaly progression, and
            operational transitions.
          </p>
        </div>

        {/* replay toggle */}

        <button
          type="button"
          onClick={() =>
            dispatch(
              setReplayMode(
                !replayMode
              )
            )
          }
          className={`
            inline-flex items-center gap-2
            rounded-xl border
            px-4 py-3
            text-[11px]
            font-medium
            uppercase tracking-[0.18em]
            transition-all duration-200

            ${
              replayMode
                ? `
                  border-cyan-400/20
                  bg-cyan-500/10
                  text-cyan-300
                `
                : `
                  border-white/6
                  bg-white/3
                  text-white/70

                  hover:border-cyan-400/20
                  hover:bg-cyan-500/10
                  hover:text-cyan-300
                `
            }
          `}
        >
          {replayMode ? (
            <Pause size={14} />
          ) : (
            <Play size={14} />
          )}

          {replayMode
            ? 'Replay active'
            : 'Enable replay'}
        </button>
      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <div className="relative p-5">
        {/* top stats */}

        <div
          className="
            rounded-2xl border
            border-white/6
            bg-white/[0.015]
            p-5
          "
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* state */}

            <div className="flex items-center gap-3">
              <div
                className={`
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl border

                  ${
                    replayMode
                      ? `
                        border-cyan-400/20
                        bg-cyan-500/10
                        text-cyan-300
                      `
                      : `
                        border-white/6
                        bg-white/3
                        text-white/55
                      `
                  }
                `}
              >
                {replayMode ? (
                  <Pause
                    size={18}
                  />
                ) : (
                  <Play
                    size={18}
                  />
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Playback state
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {replayMode
                    ? 'Replay enabled'
                    : 'Live telemetry'}
                </p>
              </div>
            </div>

            {/* duration */}

            <div
              className="
                flex items-center gap-2
                rounded-full border
                border-white/6
                bg-white/3
                px-4 py-2
              "
            >
              <Clock3
                size={14}
                className="text-cyan-300"
              />

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                {formatWindow(
                  duration
                )}
              </span>
            </div>
          </div>

          {/* progress */}

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/22">
                Replay progress
              </span>

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {progress.toFixed(
                  0
                )}
                %
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="
                  h-full rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  via-sky-500
                  to-blue-500
                  transition-all duration-300
                "
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* controls */}

        <div className="mt-5 grid grid-cols-2 gap-4">
          {/* back */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                setReplayPosition(
                  Math.max(
                    0,
                    replayPosition -
                      stepAmount
                  )
                )
              )
            }
            disabled={!duration}
            className="
              group flex items-center
              justify-center gap-3
              rounded-2xl border
              border-white/6
              bg-white/[0.015]
              px-5 py-4
              text-sm text-white/70
              transition-all duration-200

              hover:border-cyan-400/20
              hover:bg-white/3
              hover:text-cyan-300

              disabled:pointer-events-none
              disabled:opacity-30
            "
          >
            <SkipBack
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />

            <span className="uppercase tracking-[0.16em]">
              Step back
            </span>
          </button>

          {/* forward */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                setReplayPosition(
                  Math.min(
                    duration,
                    replayPosition +
                      stepAmount
                  )
                )
              )
            }
            disabled={!duration}
            className="
              group flex items-center
              justify-center gap-3
              rounded-2xl border
              border-white/6
              bg-white/[0.015]
              px-5 py-4
              text-sm text-white/70
              transition-all duration-200

              hover:border-cyan-400/20
              hover:bg-white/3
              hover:text-cyan-300

              disabled:pointer-events-none
              disabled:opacity-30
            "
          >
            <span className="uppercase tracking-[0.16em]">
              Step forward
            </span>

            <SkipForward
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* bottom note */}

        <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/18">
          <Repeat size={12} />

          Replay navigation uses
          buffered telemetry session
          history
        </div>
      </div>
    </section>
  );
}
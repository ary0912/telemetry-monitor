import {
  Pause,
  Play,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';

import {
  useAppDispatch,
  useAppSelector
} from '../store';

import {
  setAnomalySensitivity,
  setCalibrationMode,
  setIsPaused
} from '../store/telemetrySlice';

import { setActiveProfile } from '../features/experiments/experimentSlice';

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function Sidebar() {
  const dispatch = useAppDispatch();

  const {
    isPaused,
    anomalySensitivity,
    calibrationMode,
    connected
  } = useAppSelector(
    (state) => state.telemetry
  );

  const {
    profiles,
    activeProfileId
  } = useAppSelector(
    (state) => state.experiments
  );

  const activeProfile =
    profiles.find(
      (profile) =>
        profile.id === activeProfileId
    ) ?? profiles[0];

  return (
    <aside
      className="
        sticky top-6
        flex max-h-[calc(100vh-48px)]
        flex-col gap-5
        overflow-y-auto
      "
    >
      {/* ===================================================== */}
      {/* STREAM CONTROL */}
      {/* ===================================================== */}

      <section
        className="
          overflow-hidden rounded-3xl
          border border-white/5
          bg-white/2
          backdrop-blur-2xl
        "
      >
        <div className="border-b border-white/5 px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Stream control
            </p>
          </div>

          <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.05em] text-white">
            Monitoring session
          </h3>
        </div>

        <div className="p-5">
          <button
            type="button"
            onClick={() =>
              dispatch(setIsPaused(!isPaused))
            }
            className={`
              flex w-full items-center
              justify-center gap-3
              rounded-2xl border
              px-5 py-4
              text-[11px]
              font-medium uppercase
              tracking-[0.18em]
              transition-all duration-200

              ${
                isPaused
                  ? `
                    border-cyan-400/20
                    bg-cyan-500/10
                    text-cyan-300
                  `
                  : `
                    border-white/5
                    bg-white/1.5
                    text-white/70

                    hover:border-cyan-400/20
                    hover:bg-white/3
                    hover:text-cyan-300
                  `
              }
            `}
          >
            {isPaused ? (
              <>
                <Play size={15} />
                Resume monitoring
              </>
            ) : (
              <>
                <Pause size={15} />
                Pause monitoring
              </>
            )}
          </button>

          <div
            className="
              mt-5 flex items-center
              justify-between rounded-2xl
              border border-white/5
              bg-white/1.5
              px-4 py-4
            "
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                Connection
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {connected
                  ? 'Operational'
                  : 'Disconnected'}
              </p>
            </div>

            <div
              className={`
                h-2.5 w-2.5 rounded-full

                ${
                  connected
                    ? 'bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]'
                    : 'bg-rose-400'
                }
              `}
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PROFILE SWITCHER */}
      {/* ===================================================== */}

      <section
        className="
          rounded-3xl border
          border-white/5
          bg-white/2
          p-5
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              Active profile
            </p>

            <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-white">
              {activeProfile.name}
            </h3>
          </div>

          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <Sparkles size={18} />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {profiles.map((profile) => {
            const active =
              profile.id === activeProfile.id;

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() =>
                  dispatch(
                    setActiveProfile(
                      profile.id
                    )
                  )
                }
                className={`
                  flex w-full items-center
                  justify-between rounded-2xl
                  border px-4 py-4
                  text-left
                  transition-all duration-200

                  ${
                    active
                      ? `
                        border-cyan-400/20
                        bg-cyan-500/10
                      `
                      : `
                        border-white/5
                        bg-white/1.5

                        hover:border-cyan-400/20
                        hover:bg-white/3
                      `
                  }
                `}
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {profile.name}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/25">
                    {profile.mode}
                  </p>
                </div>

                {active && (
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================== */}
      {/* DETECTION */}
      {/* ===================================================== */}

      <section
        className="
          rounded-3xl border
          border-white/5
          bg-white/2
          p-5
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
              Detection threshold
            </p>

            <h3 className="mt-3 text-lg font-semibold text-white">
              Sensitivity
            </h3>
          </div>

          <div
            className="
              rounded-full
              border border-cyan-400/20
              bg-cyan-500/10
              px-3 py-1
              text-[11px]
              text-cyan-300
            "
          >
            {anomalySensitivity.toFixed(1)}σ
          </div>
        </div>

        <div className="mt-6">
          <input
            type="range"
            min="1.5"
            max="3"
            step="0.1"
            value={anomalySensitivity}
            onChange={(e) =>
              dispatch(
                setAnomalySensitivity(
                  parseFloat(
                    e.target.value
                  )
                )
              )
            }
            className="
              h-2 w-full cursor-pointer
              appearance-none rounded-full
              bg-white/5 accent-cyan-400
            "
          />
        </div>
      </section>

      {/* ===================================================== */}
      {/* PROCESSING */}
      {/* ===================================================== */}

      <section
        className="
          rounded-3xl border
          border-white/5
          bg-white/2
          p-5
          backdrop-blur-2xl
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
            Runtime controls
          </p>

          <h3 className="mt-3 text-lg font-semibold text-white">
            Processing engine
          </h3>
        </div>

        <div className="mt-6">
          <ToggleCard
            active={calibrationMode}
            title="Auto calibration"
            description="Realtime telemetry recalibration"
            icon={
              <RotateCw
                size={16}
                className={
                  calibrationMode
                    ? 'animate-spin'
                    : ''
                }
              />
            }
            onClick={() =>
              dispatch(
                setCalibrationMode(
                  !calibrationMode
                )
              )
            }
          />
        </div>
      </section>

      {/* ===================================================== */}
      {/* STATUS */}
      {/* ===================================================== */}

      <section
        className="
          overflow-hidden rounded-3xl
          border border-white/5
          bg-white/2
          backdrop-blur-2xl
        "
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-emerald-500/10
                text-emerald-300
              "
            >
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                Infrastructure
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Protection active
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/42">
                Telemetry detection systems are
                operating within expected
                thresholds.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="
              mt-6 flex w-full
              items-center justify-center gap-3
              rounded-2xl border
              border-white/5
              bg-white/1.5
              px-5 py-4
              text-[11px]
              font-medium uppercase
              tracking-[0.18em]
              text-white/70
              transition-all duration-200

              hover:border-cyan-400/20
              hover:bg-white/3
              hover:text-cyan-300
            "
          >
            <Zap size={15} />

            View audit logs
          </button>
        </div>
      </section>
    </aside>
  );
}

/* ========================================================= */
/* TOGGLE CARD */
/* ========================================================= */

function ToggleCard({
  active,
  title,
  description,
  icon,
  onClick
}: {
  active: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-start
        justify-between gap-4
        rounded-2xl border
        px-4 py-4
        text-left
        transition-all duration-200

        ${
          active
            ? `
              border-cyan-400/20
              bg-cyan-500/10
            `
            : `
              border-white/5
              bg-white/1.5

              hover:border-cyan-400/20
              hover:bg-white/3
            `
        }
      `}
    >
      <div className="flex gap-4">
        <div
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-xl

            ${
              active
                ? `
                  bg-cyan-500/15
                  text-cyan-300
                `
                : `
                  bg-white/5
                  text-white/50
                `
            }
          `}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            {title}
          </p>

          <p className="mt-1 text-[12px] leading-6 text-white/38">
            {description}
          </p>
        </div>
      </div>

      <div
        className={`
          mt-1 h-2.5 w-2.5 rounded-full

          ${
            active
              ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
              : 'bg-white/12'
          }
        `}
      />
    </button>
  );
}
import React, { useEffect, useState } from 'react';

import {
  Activity,
  Shield,
  X
} from 'lucide-react';

const STORAGE_KEY = 'telemetry-welcome-dismissed';

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);

  /* ===================================================== */
  /* DELAY MODAL OPEN */
  /* ===================================================== */

  useEffect(() => {
    const dismissed =
      localStorage.getItem(STORAGE_KEY);

    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  /* ===================================================== */
  /* CLOSE */
  /* ===================================================== */

  const handleClose = () => {
    localStorage.setItem(
      STORAGE_KEY,
      'true'
    );

    setIsVisible(false);
  };

  /* ===================================================== */
  /* EXIT */
  /* ===================================================== */

  if (!isVisible) return null;

  /* ===================================================== */
  /* UI */
  /* ===================================================== */

  return (
    <div
      className="
        fixed inset-0 z-[120]
        flex items-center justify-center
        bg-black/55
        px-4
        backdrop-blur-md
      "
    >
      {/* ================================================ */}
      {/* MODAL */}
      {/* ================================================ */}

      <div
        className="
          relative w-full max-w-xl
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-[#0A0F1B]/96
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          animate-[modalFade_0.45s_cubic-bezier(0.22,1,0.36,1)]
        "
      >
        {/* ============================================== */}
        {/* TOP */}
        {/* ============================================== */}

        <div
          className="
            border-b border-white/5
            px-8 py-7
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >
                Telemetry Workspace
              </p>

              <h2
                className="
                  mt-3
                  text-[2rem]
                  font-semibold
                  tracking-[-0.05em]
                  text-on-dark
                "
              >
                Welcome to Aether Ops
              </h2>

              <p
                className="
                  mt-4
                  max-w-lg
                  text-sm leading-7
                  text-muted
                "
              >
                Monitor realtime telemetry,
                detect signal anomalies,
                and inspect operational
                system behavior through a
                modern observability
                environment.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="
                rounded-xl
                p-2 text-muted
                transition-colors duration-200
                hover:bg-white/5
                hover:text-on-dark
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ============================================== */}
        {/* CONTENT */}
        {/* ============================================== */}

        <div className="px-8 py-7">
          <div className="grid gap-4">
            {/* CARD */}

            <div
              className="
                rounded-2xl
                border border-white/5
                bg-white/2
                p-5
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <Activity size={18} />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-on-dark
                    "
                  >
                    Live telemetry monitoring
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm leading-7
                      text-muted
                    "
                  >
                    Observe live signal streams,
                    operational metrics,
                    and realtime system activity.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD */}

            <div
              className="
                rounded-2xl
                border border-white/5
                bg-white/2
                p-5
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-emerald-400/10
                    text-emerald-300
                  "
                >
                  <Shield size={18} />
                </div>

                <div>
                  <h3
                    className="
                      text-sm font-semibold
                      text-on-dark
                    "
                  >
                    Adaptive anomaly detection
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm leading-7
                      text-muted
                    "
                  >
                    Detect abnormal signal
                    deviations and monitor
                    operational confidence
                    in realtime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}

          <button
            onClick={handleClose}
            className="
              mt-8 w-full
              rounded-2xl
              bg-cyan-400
              px-6 py-4
              text-sm
              font-semibold
              text-black
              transition-all duration-200

              hover:bg-cyan-300
              hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]
            "
          >
            Open workspace
          </button>

          {/* FOOTNOTE */}

          <p
            className="
              mt-5
              text-center
              text-xs
              text-muted
            "
          >
            Realtime operational telemetry ·
            Observability platform v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
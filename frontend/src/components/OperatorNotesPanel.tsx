import {
  Check,
  PencilLine,
  Save
} from 'lucide-react';

import {
  useEffect,
  useRef,
  useState
} from 'react';

const STORAGE_KEY =
  'telemetry-monitor-operator-notes';

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export function OperatorNotesPanel() {
  const [notes, setNotes] =
    useState('');

  const [saved, setSaved] =
    useState(false);

  const [focused, setFocused] =
    useState(false);

  const timeoutRef =
    useRef<number | null>(null);

  /* ========================================================= */
  /* LOAD NOTES */
  /* ========================================================= */

  useEffect(() => {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (stored) {
      setNotes(stored);
    }
  }, []);

  /* ========================================================= */
  /* CLEANUP */
  /* ========================================================= */

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, []);

  /* ========================================================= */
  /* SAVE */
  /* ========================================================= */

  const handleSave = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      notes
    );

    setSaved(true);

    if (timeoutRef.current) {
      window.clearTimeout(
        timeoutRef.current
      );
    }

    timeoutRef.current =
      window.setTimeout(() => {
        setSaved(false);
      }, 1800);
  };

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
      {/* glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-[-40px] right-[-20px] h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          relative flex items-start
          justify-between gap-4
          border-b border-white/6
          px-6 py-5
        "
      >
        {/* left */}

        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Operator workspace
            </p>
          </div>

          <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.05em] text-white">
            Session notes
          </h3>

          <p className="mt-2 max-w-md text-sm leading-7 text-white/42">
            Record operational
            observations, anomaly
            findings, debugging
            insights, and incident
            investigation notes.
          </p>
        </div>

        {/* save button */}

        <button
          type="button"
          onClick={handleSave}
          className={`
            group inline-flex items-center gap-2
            rounded-xl border
            px-4 py-3
            text-[11px]
            font-medium
            uppercase tracking-[0.18em]
            transition-all duration-200

            ${
              saved
                ? `
                  border-emerald-500/20
                  bg-emerald-500/10
                  text-emerald-300
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
          {saved ? (
            <Check
              size={14}
              strokeWidth={2.4}
            />
          ) : (
            <Save
              size={14}
              strokeWidth={2}
            />
          )}

          {saved
            ? 'Saved'
            : 'Save'}
        </button>
      </div>

      {/* ===================================================== */}
      {/* TEXTAREA */}
      {/* ===================================================== */}

      <div className="relative p-5">
        <div
          className={`
            relative overflow-hidden
            rounded-2xl border
            transition-all duration-300

            ${
              focused
                ? `
                  border-cyan-400/20
                  bg-white/3
                  shadow-[0_0_0_1px_rgba(34,211,238,0.06)]
                `
                : `
                  border-white/6
                  bg-white/[0.015]
                `
            }
          `}
        >
          {/* top bar */}

          <div
            className="
              flex items-center justify-between
              border-b border-white/6
              px-4 py-3
            "
          >
            <div className="flex items-center gap-2">
              <PencilLine
                size={14}
                className="text-cyan-300"
                strokeWidth={1.8}
              />

              <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Active notebook
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
              local session
            </span>
          </div>

          {/* textarea */}

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            onFocus={() =>
              setFocused(true)
            }
            onBlur={() =>
              setFocused(false)
            }
            placeholder="Document telemetry observations, infrastructure behaviour, anomaly hypotheses, operational findings, or incident actions..."
            aria-label="Operator notes"
            className="
              min-h-[240px]
              w-full resize-none
              bg-transparent
              px-5 py-5
              text-[15px]
              leading-8
              text-white/88
              outline-none
              placeholder:text-white/20
            "
          />
        </div>

        {/* footer */}

        <div className="mt-4 flex items-center justify-between gap-4 px-1">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/18">
            Notes stored locally in
            browser session
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/18">
            {notes.length} characters
          </p>
        </div>
      </div>
    </section>
  );
}
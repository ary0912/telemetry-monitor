import { useMemo } from 'react';

import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import {
  Activity,
  Radio,
  SignalHigh
} from 'lucide-react';

import {
  TelemetryReading,
  MetricKey
} from '../types';

import {
  DISPLAY_METRICS,
  METRIC_CONFIGS
} from '../utils/constants';

import {
  formatMetricValue
} from '../utils/anomalyDetection';

interface TelemetryChartProps {
  readings: TelemetryReading[];
  selectedMetrics?: readonly MetricKey[];
}

export function TelemetryChart({
  readings,
  selectedMetrics
}: TelemetryChartProps) {
  /**
   * =================================================
   * TRANSFORMED DATA
   * =================================================
   */

  const chartData = useMemo(
    () =>
      readings.map((reading) => ({
        timestamp: reading.timestamp,

        ...Object.fromEntries(
          DISPLAY_METRICS.map((metric) => [
            metric,
            reading[metric]
          ])
        )
      })),
    [readings]
  );

  /**
   * =================================================
   * ACTIVE METRICS
   * =================================================
   */

  const activeMetrics =
    selectedMetrics?.length
      ? selectedMetrics
      : DISPLAY_METRICS;

  /**
   * =================================================
   * TOOLTIP
   * =================================================
   */

  const tooltipFormatter = (
    value: number,
    name: string
  ) => [
    formatMetricValue(
      value,
      name as MetricKey
    ),
    name
  ];

  /**
   * =================================================
   * EMPTY STATE
   * =================================================
   */

  if (!readings.length) {
    return (
      <div
        className="
          flex min-h-[520px] flex-col items-center justify-center
          rounded-[28px]
          border border-white/5
          bg-[#07101A]/90
          px-8 text-center
        "
      >
        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-3xl
            border border-white/5
            bg-white/3
          "
        >
          <SignalHigh
            size={34}
            className="text-m-blue-light"
          />
        </div>

        <h3 className="mt-8 text-[1.8rem] font-semibold tracking-[-0.05em] text-on-dark">
          Awaiting telemetry stream
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          The observability engine is waiting for
          incoming telemetry packets and live signal
          synchronization.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-m-blue-light/10 bg-m-blue-light/10 px-5 py-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-m-blue-light" />

          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-m-blue-light">
            Standby mode
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[30px]
        border border-white/5
        bg-[#07101A]/95
        backdrop-blur-2xl
      "
    >
      {/* ================================================= */}
      {/* AMBIENT GLOW */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-10%] h-[280px] w-[280px] rounded-full bg-m-blue-light/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] right-[10%] h-[260px] w-[260px] rounded-full bg-electric-blue/10 blur-[120px]" />
      </div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative z-10 border-b border-white/5 px-6 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-m-blue-light shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                Signal waveform analysis
              </p>
            </div>

            <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.06em] text-on-dark">
              Realtime telemetry correlation
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              Monitor live metric relationships,
              operational fluctuations, anomaly drift,
              and adaptive signal behavior through
              synchronized telemetry streams.
            </p>
          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap items-center gap-3">
            <StatusPill
              icon={<Activity size={13} />}
              label={`${activeMetrics.length} metrics`}
            />

            <StatusPill
              icon={<Radio size={13} />}
              label="Realtime sync"
            />

            <div className="rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                Stream active
              </span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* ACTIVE METRICS */}
        {/* ================================================= */}

        <div className="mt-6 flex flex-wrap gap-2">
          {activeMetrics.map((metric) => {
            const config = METRIC_CONFIGS[metric];

            return (
              <div
                key={metric}
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-white/5
                  bg-white/3
                  px-3 py-2
                "
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: config.color,
                    boxShadow: `0 0 10px ${config.color}`
                  }}
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-dark">
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================= */}
      {/* CHART */}
      {/* ================================================= */}

      <div className="relative z-10 px-3 pb-3 pt-5 sm:px-5 sm:pb-5">
        <div className="h-[560px] rounded-[26px] border border-white/5 bg-[#040B14]/90 p-4 sm:p-6">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: -22,
                bottom: 10
              }}
            >
              {/* ================================================= */}
              {/* DEFINITIONS */}
              {/* ================================================= */}

              <defs>
                {activeMetrics.map((metric) => (
                  <linearGradient
                    key={metric}
                    id={`gradient-${metric}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={
                        METRIC_CONFIGS[metric].color
                      }
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor={
                        METRIC_CONFIGS[metric].color
                      }
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>

              {/* ================================================= */}
              {/* GRID */}
              {/* ================================================= */}

              <CartesianGrid
                vertical={false}
                stroke="rgba(148,163,184,0.08)"
                strokeDasharray="4 4"
              />

              {/* ================================================= */}
              {/* X AXIS */}
              {/* ================================================= */}

              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                minTickGap={42}
                tick={{
                  fill: '#64748b',
                  fontSize: 10
                }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString(
                    [],
                    {
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit'
                    }
                  )
                }
              />

              {/* ================================================= */}
              {/* Y AXIS */}
              {/* ================================================= */}

              <YAxis
                axisLine={false}
                tickLine={false}
                width={40}
                tick={{
                  fill: '#64748b',
                  fontSize: 10
                }}
              />

              {/* ================================================= */}
              {/* TOOLTIP */}
              {/* ================================================= */}

              <Tooltip
                cursor={{
                  stroke: '#38bdf8',
                  strokeOpacity: 0.25
                }}
                contentStyle={{
                  background:
                    'rgba(7, 16, 26, 0.96)',
                  border:
                    '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px',
                  backdropFilter: 'blur(18px)',
                  boxShadow:
                    '0 10px 40px rgba(0,0,0,0.45)'
                }}
                labelStyle={{
                  color: '#cbd5e1',
                  fontSize: 11,
                  marginBottom: 8,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
                itemStyle={{
                  color: '#e2e8f0',
                  fontSize: 12
                }}
                formatter={tooltipFormatter}
                labelFormatter={(value) =>
                  new Date(value).toLocaleTimeString(
                    [],
                    {
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit'
                    }
                  )
                }
              />

              {/* ================================================= */}
              {/* LEGEND */}
              {/* ================================================= */}

              <Legend
                wrapperStyle={{
                  fontSize: 11,
                  paddingTop: 12
                }}
              />

              {/* ================================================= */}
              {/* AREAS */}
              {/* ================================================= */}

              {activeMetrics.map((metric) => (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={
                    METRIC_CONFIGS[metric].label
                  }
                  stroke={
                    METRIC_CONFIGS[metric].color
                  }
                  fill={`url(#gradient-${metric})`}
                  strokeWidth={2.4}
                  fillOpacity={1}
                  dot={false}
                  activeDot={{
                    r: 4,
                    strokeWidth: 0
                  }}
                  isAnimationActive={false}
                />
              ))}

              {/* ================================================= */}
              {/* BASELINE */}
              {/* ================================================= */}

              <ReferenceLine
                y={0}
                stroke="rgba(148,163,184,0.18)"
              />

              {/* ================================================= */}
              {/* BRUSH */}
              {/* ================================================= */}

              <Brush
                dataKey="timestamp"
                height={34}
                stroke="#38bdf8"
                travellerWidth={10}
                fill="rgba(15,23,42,0.95)"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString(
                    [],
                    {
                      minute: '2-digit',
                      second: '2-digit'
                    }
                  )
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* STATUS PILL */
/* ================================================= */

function StatusPill({
  icon,
  label
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-full
        border border-white/5
        bg-white/3
        px-4 py-2
      "
    >
      <div className="text-m-blue-light">
        {icon}
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-dark">
        {label}
      </span>
    </div>
  );
}
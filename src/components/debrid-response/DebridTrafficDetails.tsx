"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTrafficDetails } from "@/hooks/useDebridTrafficDetails";
import type { TrafficDetailsResponse } from "@/types/response/trafficDetailsResponse";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimelineItem = {
  dateKey: string;
  dateLabel: string;
  bytes: number;
};

const panelClassName =
  "w-full rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff,#f4f0fa)] p-5 shadow-[0_24px_36px_-30px_rgba(52,33,82,0.7),0_1px_0_rgba(255,255,255,0.95)_inset]";

const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const bytesToGbValue = (bytes: number): string => {
  const gb = bytes / 1024 ** 3;

  if (gb === 0) {
    return "0";
  }

  if (gb >= 100) {
    return Math.round(gb).toString();
  }

  return Number(gb.toFixed(2)).toString();
};

const bytesToGbLabel = (bytes: number): string => `${bytesToGbValue(bytes)} GB`;

const getTimeline = (
  data: TrafficDetailsResponse | undefined,
): TimelineItem[] => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const dateKey = toLocalDateString(date);
    const dayTraffic = data?.[dateKey];

    return {
      dateKey,
      dateLabel: date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      bytes: dayTraffic?.bytes ?? 0,
    };
  });
};

export const DebridTrafficDetails: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTrafficDetails();

  if (!hasKey) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Add a token to load traffic details.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Loading traffic timeline...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-[1.4rem] border border-[#ffd6ce] bg-[linear-gradient(145deg,#fffaf8,#fff0eb)] p-5 shadow-[0_20px_30px_-30px_rgba(165,64,42,0.85),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a5402a]/80">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#a5402a]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const timeline = getTimeline(data);
  const totalBytes = timeline.reduce((sum, day) => sum + day.bytes, 0);
  const averageBytes = totalBytes / Math.max(1, timeline.length);
  const peakDay = timeline.reduce(
    (currentPeak, day) => (day.bytes > currentPeak.bytes ? day : currentPeak),
    timeline[0],
  );

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Traffic Analytics
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
            Traffic - Last 7 Days
          </h2>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Daily transfer volume with rolling week trend insight.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-white/85 bg-[#edf1ff] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700/80">
            Total
          </p>
          <p className="mt-1 text-lg font-semibold text-indigo-700">
            {bytesToGbLabel(totalBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-white/85 bg-[#f4f0ff] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700/80">
            Daily Avg
          </p>
          <p className="mt-1 text-lg font-semibold text-violet-700">
            {bytesToGbLabel(averageBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-white/85 bg-[#fff6f1] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700/80">
            Peak Day
          </p>
          <p className="mt-1 text-lg font-semibold text-orange-700">
            {peakDay.dateLabel}
          </p>
        </div>
      </div>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timeline}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trafficAreaFillNeo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f6fff" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4f6fff" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#ddd6e6" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "#847f91", fontSize: 12 }}
              axisLine={{ stroke: "#ddd6e6" }}
              tickLine={{ stroke: "#ddd6e6" }}
            />
            <YAxis
              tick={{ fill: "#847f91", fontSize: 12 }}
              axisLine={{ stroke: "#ddd6e6" }}
              tickLine={{ stroke: "#ddd6e6" }}
              tickFormatter={(value: number) => bytesToGbValue(value)}
              label={{
                value: "GB",
                angle: -90,
                position: "insideLeft",
                fill: "#847f91",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => {
                return [bytesToGbLabel(value as number), "Traffic"];
              }}
              labelStyle={{ color: "#2d2b32", fontWeight: 600 }}
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.96)",
                borderColor: "#e1dae9",
                borderRadius: "0.9rem",
                boxShadow: "0 20px 28px -24px rgba(52,33,82,0.8)",
              }}
            />
            <Area
              type="monotone"
              dataKey="bytes"
              stroke="#4f6fff"
              strokeWidth={2.5}
              fill="url(#trafficAreaFillNeo)"
              dot={{ r: 2.5, fill: "#4f6fff" }}
              activeDot={{ r: 4.5, fill: "#3855de" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

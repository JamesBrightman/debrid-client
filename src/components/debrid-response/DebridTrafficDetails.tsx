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

  return Number(gb.toFixed(2)).toString();
};

const bytesToGbLabel = (bytes: number): string => `${bytesToGbValue(bytes)} Gb`;

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
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load traffic details.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading traffic timeline...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const timeline = getTimeline(data);

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Taffic - last 7 days
      </h2>
      <div className="mt-3 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timeline}
            margin={{ top: 8, right: 12, left: 8, bottom: 4 }}
          >
            <defs>
              <linearGradient id="trafficAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a5402a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#a5402a" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9e3ee" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "#8e8a96", fontSize: 12 }}
              axisLine={{ stroke: "#e9e3ee" }}
              tickLine={{ stroke: "#e9e3ee" }}
            />
            <YAxis
              tick={{ fill: "#8e8a96", fontSize: 12 }}
              axisLine={{ stroke: "#e9e3ee" }}
              tickLine={{ stroke: "#e9e3ee" }}
              tickFormatter={(value: number) => bytesToGbValue(value)}
              label={{
                value: "Gb",
                angle: -90,
                position: "insideLeft",
                fill: "#8e8a96",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => {
                return [bytesToGbLabel(value as number), "Traffic"];
              }}
              labelStyle={{ color: "#2d2b32", fontWeight: 600 }}
              contentStyle={{
                borderColor: "#e9e3ee",
                borderRadius: "0.75rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="bytes"
              stroke="#a5402a"
              strokeWidth={2}
              fill="url(#trafficAreaFill)"
              dot={{ r: 2, fill: "#a5402a" }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

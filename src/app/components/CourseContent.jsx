"use client";

import {
  BarChart3,
  BookOpen,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const modules = [
  { title: "Candlestick Behaviour", Icon: BarChart3 },
  { title: "Wave Education", Icon: TrendingUp },
  { title: "Demand & Supply", Icon: Target },
  { title: "Stoploss Hunting", Icon: Shield },
  { title: "Market Rhythm", Icon: Users },
  { title: "Probability Zones", Icon: BookOpen },
  { title: "Level Drawing", Icon: BarChart3 },
  { title: "PHHL / PDHL / PWHL / PMHL", Icon: Target },
  { title: "Price Action Levels", Icon: TrendingUp },
  { title: "Where to Buy/Sell", Icon: Shield },
];

export default function CourseContent() {
  return (
    <section className="px-4 py-6 bg-[#111824]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9ff3f]">
            Course Content
          </span> */}
          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            What You Will Learn
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg">
            A structured 10-day learning path built around market reading, price
            behavior, and practical execution.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {modules.map(({ title, Icon }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#75c13f]/10 text-[#75c13f]">
                <Icon className="h-7 w-7" strokeWidth={1.9} />
              </div>
              <h3 className="text-sm font-bold leading-6 text-white">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

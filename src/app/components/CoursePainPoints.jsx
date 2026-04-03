"use client";

const painPoints = [
  "Relying on indicators instead of understanding price behavior",
  "Getting the entry right, but the exit wrong",
  "Repeated stop-loss hits that break confidence",
  "Not understanding how the market actually moves",
  "Emotional trading that turns small mistakes into big losses",
];

export default function CoursePainPoints() {
  return (
    <section className="px-4 py-5 bg-[#0f141b]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          {/* <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9ff3f]">
            Pain Points
          </span> */}
          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            What Holds Most Traders Back
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg">
            Most traders do not fail because the market is impossible. They fail
            because they do not have a structured way to read it.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {painPoints.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-lg backdrop-blur"
            >
              <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-[#75c13f] to-[#5da432]" />
              <p className="text-sm leading-7 text-slate-200">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#75c13f]/20 bg-gradient-to-r from-[#75c13f]/10 to-transparent p-6 md:p-8">
          <p className="text-lg font-semibold text-white md:text-2xl">
            Solution: Learn to read the market, not guess it.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            This course is built to help students identify structure, context,
            and probability so they can trade with clarity instead of hope.
          </p>
        </div>
      </div>
    </section>
  );
}

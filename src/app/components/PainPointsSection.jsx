"use client";

export default function PainPointsSection() {
  const painPoints = [
    {
      icon: "📊",
      title: "Over-reliance on Indicators",
      description:
        "Depending entirely on technical indicators without understanding price action",
    },
    {
      icon: "📈",
      title: "Incorrect Entry, Wrong Exit",
      description:
        "Getting the entry right but failing to exit at the optimal price",
    },
    {
      icon: "🎯",
      title: "Stoploss Gets Hit Repeatedly",
      description:
        "Continuous stoploss hits due to poor placement and market understanding",
    },
    {
      icon: "🧠",
      title: "Market Comprehension Gap",
      description:
        "Difficulty understanding market structure and price movements",
    },
    {
      icon: "😰",
      title: "Emotional Trading",
      description:
        "Making decisions based on fear and greed instead of strategy",
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Common Problems in Trading
          </h2>
          <p className="text-lg text-slate-600">
            Are you struggling with these challenges?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
            >
              <div className="text-4xl mb-3">{point.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {point.title}
              </h3>
              <p className="text-slate-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

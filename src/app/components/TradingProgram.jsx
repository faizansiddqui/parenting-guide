import React from 'react';

const highlights = [
  {
    title: "Understanding Child Psychology",
    description: "Bacho ke behave karne ke peeche ka asli reason samjhein aur unse connect karein.",
    icon: "🧠", // Aap yahan image path bhi daal sakte hain
  },
  {
    title: "The 'No-Shouting' Formula",
    description: "Gussa kiye bina bacho se apni baat kaise manwayein, seekhein practical steps.",
    icon: "🤫",
  },
  {
    title: "Digital Balance Strategy",
    description: "Mobile aur Screen time ko smart tarike se manage karne ki effective techniques.",
    icon: "📱",
  },
  {
    title: "Deep Connection Exercises",
    description: "Aise methods jo aapke aur aapke bache ke beech 10x trust build karenge.",
    icon: "🤝",
  },
  {
    title: "Simple & Daily-Apply Methods",
    description: "Koi mushkil theory nahi, sirf wo jo aap aaj se hi apne ghar mein apply kar sakein.",
    icon: "✨",
  },
];

const ParentingProgram = () => {
  return (
    <section className="py-5 sm:py-5 sm:pb-8 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-24">
          <span className="mb-4 inline-block rounded-full bg-[#2d1a0a] border border-brand-green/20 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">
            Course Curriculum
          </span>
          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-black text-[#2D1A0A] tracking-tight">
            Program <span className="text-brand-green italic font-serif">Highlights</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Is program mein hum un core topics par baat karenge jo aapki parenting ko asaan aur bacho ke sath bond ko majboot banayenge.
          </p>
        </div>

        {/* Cards - Vertical Stack with Sleek Design */}
        <div className="max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex flex-row items-center gap-6 sm:gap-8">
                {/* Icon/Image Container */}
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FDFBF7] border border-brand-green/10 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {/* Agar image use karni ho toh: <img src={item.image} className="w-full h-full object-contain" /> */}
                  <span>{item.icon}</span>
                </div>

                {/* Content - High Visibility */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl font-black text-[#2D1A0A] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-lg text-gray-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Arrow (Visible on Desktop) */}
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-green translate-x-4 group-hover:translate-x-0 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Tagline */}
        <div className="mt-16 text-center">
            <p className="text-[#2D1A0A] font-black text-lg sm:text-xl">
                And Much More... <span className="text-brand-green">100% Practical Knowledge</span>
            </p>
        </div>
      </div>
    </section>
  );
};

export default ParentingProgram;
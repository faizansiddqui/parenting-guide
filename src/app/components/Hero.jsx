import React, { useState, useEffect, useRef } from "react";

const MobileHero = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="hero"
      className="min-h-screen relative bg-[#FDFBF7] overflow-hidden font-sans"
    >
      {/* Background Texture - Opacity reduced for maximum text clarity */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

      {/* Header - Stronger visibility */}
      <header
        className={`fixed left-0 w-full z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md transition-transform duration-300 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {/* <h1 className="text-[#331d0c] text-sm font-black tracking-tighter uppercase">
              Parenting <span className="text-brand-green">Guide</span>
            </h1> */}
          </div>
          <div className="leading-tight text-right">
            <div className="text-[#2D1A0A] text-lg font-black italic">
              PREMIUM <span className="text-brand-green">ADVICE</span>
            </div>
            <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">
              Nurturing Future
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-lg mx-auto pt-20 pb-5 px-5 flex flex-col items-center">
        {/* Headline - Bold & High Contrast */}
        <div className="text-center w-full mb-3">
          {/* <span className="inline-block py-1 px-4 rounded-full bg-brand-green/10 border border-brand-green/20 text-[#4A2B12] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
            Expert Training Program
          </span> */}
          <h1 className="text-2xl font-black leading-[1.1] text-[#2D1A0A] tracking-tight drop-shadow-sm">
            NOURISHING LIVES, <br />
            <span className="text-brand-green">GUIDING HEARTS</span>
          </h1>
        </div>
        {/* Button */}
        <div className="relative rounded-2xl px-2.5 py-1.5 bg-gradient-to-br from-red-600 to-red-700 shadow-2xl border border-white/10">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-0">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            </div>
            <span className="text-white text-base sm:text-lg font-extrabold tracking-widest drop-shadow-lg">
              ACCESS NOW
            </span>
          </div>
        </div>

        {/* Mentor Image Section */}
        <div className="relative mb-3 mt-2">
          <div className="relative w-[320px] max-w-[90vw] aspect-[4/5] mx-auto">
            {/* Soft background shape behind image */}
            <div className="absolute inset-0 bg-brand-green/10 rounded-[2.5rem] scale-105 border border-brand-green/20 animate-pulse" />

            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <img
                src="/profile.png"
                alt="Advisor Pravesh Gupta"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Stats - Enhanced Visibility */}
            <div className="absolute -left-4 top-1/4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-white/50 z-20">
              <p className="text-[#4A2B12] text-2xl font-black leading-none">
                500+
              </p>
              <p className="text-[10px] font-bold text-gray-600 uppercase mt-1 tracking-wider">
                Families
              </p>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-white/50 z-20">
              <p className="text-[#4A2B12] text-2xl font-black leading-none">
                Expert
              </p>
              <p className="text-[10px] font-bold text-gray-600 uppercase mt-1 tracking-wider">
                Advisor
              </p>
            </div>
          </div>
        </div>

        {/* Action Card - High Contrast UI */}
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 flex flex-col items-center justify-center text-center mt-4">
          <button
            onClick={() => (window.location.href = "/form")}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#4A2B12] via-[#D99B38] to-[#4A2B12] bg-[length:200%_auto] hover:bg-right text-white text-lg font-black uppercase tracking-[0.05em] shadow-[0_10px_40px_-5px_rgba(217,155,56,0.5)] shadow-xl hover:shadow-[0_20px_50px_-5px_rgba(217,155,56,0.6)] active:scale-[0.98] transition-all duration-500 transform"
          >
            Register Now — Free
          </button>

          <div className="relative inline-block mt-6">
            <p className="text-gray-500 text-lg font-bold line-through decoration-[#2D1A0A]/50 mb-[-8px]">
              ₹10,000 VALUE
            </p>
            <h2 className="text-black text-4xl sm:text-5xl font-black tracking-tighter italic drop-shadow-2xl">
              FREE <span className="text-[#2D1A0A]">NOW</span>
            </h2>
          </div>

          {/* DETAILS BLOCK */}
          <div className="text-center p-6 rounded-3xl  ">
            {/* CALL TO ACTION SUBTEXT */}
            <p className="text-sm font-medium text-gray-600 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D1A0A] animate-pulse"></span>
              Exclusive Access for Early Birds
            </p>

            {/* MENTOR SECTION */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-[#2D1A0A] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                Mentor
              </p>
              <p className="text-[#2D1A0A] text-xl font-extrabold tracking-tight">
                Mr. Pravesh Gupta
              </p>
              <p className="text-gray-600 text-[10px] uppercase font-medium mt-1">
                Advisory Expert & Mentor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;

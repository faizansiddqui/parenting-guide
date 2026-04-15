"use client";

import { useEffect, useRef, useState } from "react";
import GalleryCard from "./GalleryCard";

const galleryItems = [
  {
    image: "/moments/img2.avif",
    title: "The Conscious Parent Meet",
    event: "Deep dive into child psychology and emotional intelligence for modern families.",
    participants: "200+ Parents",
    location: "Mumbai",
    date: "Jan 2026",
    highlight: "Interactive",
  },
  {
    image: "/moments/img1.avif",
    title: "Live Q&A: Screen Time Control",
    event: "Practical workshop on managing digital habits and improving focus in children.",
    participants: "150+ Families",
    location: "Delhi (Live Session)",
    date: "Feb 2026",
    highlight: "Housefull",
  },
  {
    image: "/moments/img3.avif",
    title: "Advanced Parent Graduation",
    event: "Celebrating parents who completed our 6-month mentorship program.",
    participants: "80+ Certified",
    location: "Lucknow",
    date: "Dec 2025",
    highlight: "Top Success Rate",
  },
  {
    image: "/moments/img4.avif",
    title: "Bonding Beyond Boundaries",
    event: "A special session dedicated to father-child relationship strengthening.",
    participants: "120+ Active",
    location: "Jaipur",
    date: "Nov 2025",
  },
  {
    image: "/moments/img5.avif",
    title: "Modern Parenting Foundation",
    event: "Essential concepts for new parents starting their journey with us.",
    participants: "300+ Participants",
    location: "Online",
    date: "Oct 2025",
  },
  {
    image: "/moments/img6.avif",
    title: "Excellence Awards 2025",
    event: "Recognizing extraordinary transformations in parent-child relationships.",
    participants: "25 Winners",
    location: "Annual Gala",
    date: "Dec 2025",
    highlight: "Awards Ceremony",
  },
];

const GallerySection = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px 0px" }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="py-10 sm:py-10 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-10">
          <span className="mb-4 inline-block rounded-full bg-[#2d1a0a] border border-brand-green/20 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">
            Event Gallery
          </span>
          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-black text-[#2D1A0A] tracking-tight">
            Moments of <span className="text-brand-green italic">Transformation</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Witness our community of mindful parents growing, learning, and building deeper connections with their children.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`opacity-0 translate-y-12 transition-all duration-700 ease-out ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : ""
              } ${index % 3 === 1 ? "delay-150" : index % 3 === 2 ? "delay-300" : ""}`}
            >
              <GalleryCard {...item} />
            </div>
          ))}
        </div>

        {/* Bottom Banner Card */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6 rounded-[2.5rem] bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 backdrop-blur-md sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="text-xl font-black text-[#2D1A0A]">
                Ready to be part of our next workshop?
              </p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">
                Seats fill up fast for our offline sessions
              </p>
            </div>
            <button 
              onClick={() => window.location.href='/form'} 
              className="rounded-2xl bg-[#2d1a0a] text-white px-8 py-4 text-sm font-black uppercase tracking-widest shadow-xl transition-all duration-300 hover:bg-brand-green hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
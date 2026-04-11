"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: "1",
    title: "Understanding My Child's Tantrums",
    description:
      "I was struggling with my 4-year-old's daily meltdowns. Advisor Pravesh Kumar's techniques helped me understand the 'why' behind the behavior. Now, our home is much more peaceful, and I feel like a more confident parent.",
    videoId: "5RskS9g03Rc", // Replace with actual parenting testimonial IDs
  },
  {
    id: "2",
    title: "Finally, A Screen-Free Routine",
    description:
      "Screen addiction was ruining our family dinners. The step-by-step guidance on setting boundaries without being a 'villain' worked like magic. My kids are now playing outdoors and reading more than ever.",
    videoId: "_mqVRykdHjk",
  },
  {
    id: "3",
    title: "Building Deep Connection",
    description:
      "I felt like my teenager was drifting away. The communication strategies taught in this program helped us reconnect. We've gone from constant arguments to having meaningful conversations every night.",
    videoId: "KGsxezObd0Q",
  },
  {
    id: "4",
    title: "Positive Discipline That Works",
    description:
      "I never liked yelling, but I didn't know another way. This program showed me how to use positive discipline. It's not about being soft; it's about being effective. Truly a life-changing experience for us.",
    videoId: "YX2ZQPaUkcI",
  },
  {
    id: "5",
    title: "Single Parent Support",
    description:
      "Being a single mom is tough, but having a roadmap made it manageable. The advice on emotional resilience for both me and my child was exactly what I needed to hear during a difficult transition.",
    videoId: "VctTjg9D1ZA",
  },
  {
    id: "6",
    title: "Better Sleep for Everyone",
    description:
      "Bedtime used to be a 2-hour battle. With the new routine and behavioral shifts suggested by Pravesh ji, my kids now go to bed happily. I finally have some 'me-time' in the evenings!",
    videoId: "umVpG2O83bI",
  },
];

const VideoCard = ({ testimonial, isActive, onBecomeActive }) => {
  const containerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [thumbnailFallback, setThumbnailFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            onBecomeActive();
          }
        });
      },
      { threshold: 0.6 }
    );

    if (container) observer.observe(container);
    return () => { if (container) observer.unobserve(container); };
  }, [onBecomeActive]);

  const truncatedDescription = testimonial.description.slice(0, 100) + "...";

  const embedUrl = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`;
  const thumbnailSrc = thumbnailFallback
    ? `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`;

  return (
    <div
      ref={containerRef}
      className={`group relative flex flex-col overflow-hidden rounded-[1rem] bg-white transition-all duration-500 ${
        isActive
          ? "ring-4 ring-[#2a180a] border border-[#2a180a] shadow-md"
          : "border border-[#2a180a] hover:shadow-md"
      }`}
    >
      {/* Video Section */}
      <div className="relative w-full aspect-video bg-gray-100">
        {isActive ? (
          <iframe
            src={embedUrl}
            title={testimonial.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
          />
        ) : (
          <div className="relative w-full h-full cursor-pointer" onClick={onBecomeActive}>
            <Image
              src={thumbnailSrc}
              alt={testimonial.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setThumbnailFallback(true)}
              unoptimized
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-brand-brown/10 backdrop-blur-[2px]">
                <div className="w-16 h-16 bg-black/90 rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-brand-green border-b-[10px] border-b-transparent ml-1"></div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-col">
        <h3 className={`text-xl font-black mb-3 leading-tight ${isActive ? "text-[#2a180a]" : "text-[#2a180a]"}`}>
          {testimonial.title}
        </h3>

        <div className="text-gray-600 leading-relaxed text-sm font-medium">
          <p>{isExpanded ? testimonial.description : truncatedDescription}</p>
        </div>

         <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 self-start text-xs font-semibold uppercase tracking-wide text-[#2a180a] cursor-pointer hover:text-[#75c13f] transition-colors"
        >
          {isExpanded ? "Close" : "Read Full Story"}
        </button>
      </div>
    </div>
  );
};

const VideoTestimonials = () => {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section className="w-full bg-[#FDFBF7] py-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="mb-4 inline-flex items-center rounded-full bg-[#2d1a0a] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white border border-brand-green/20">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#2a180a] mb-6 tracking-tight">
            Happy Parents, <br /><span className="text-brand-green italic font-serif">Brighter Futures</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Real families who have transformed their household dynamics through Advisor Pravesh Kumar’s proven guidance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <VideoCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={activeVideoId === testimonial.id}
              onBecomeActive={() => setActiveVideoId(testimonial.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
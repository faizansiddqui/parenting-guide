import React from 'react';
import { Users, Calendar, MapPin, Sparkles } from "lucide-react";

const GalleryCard = ({
  image,
  title,
  event,
  participants,
  location,
  date,
  highlight,
  className = "",
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-[1rem] bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${className}`}>
      
      {/* Image Section - Clean Top Rounding */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Highlight Badge Overlay */}
        {highlight && (
          <div className="absolute top-4 right-4 bg-[#2d1a0a] backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-brand-green/20">
            <div className="flex items-center gap-1.5 text-[10px] text-brand-green font-black uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              {highlight}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 space-y-4 bg-white">
        {/* Title - Deep Brown for High Visibility */}
        <h3 className="text-xl sm:text-2xl font-black leading-tight text-[#2D1A0A]">
          {title}
        </h3>
        
        {/* Event Description */}
        <p className="text-sm sm:text-base text-gray-500 font-medium line-clamp-2 leading-relaxed">
          {event}
        </p>
        
        {/* Info Tags - Using Brand Green Accents */}
        <div className="flex flex-wrap gap-2 pt-2">
          {participants && (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400 font-black uppercase tracking-wide border border-brand-green/10">
              <Users className="h-3.5 w-3.5" />
              {participants}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400 font-black uppercase tracking-wide border border-brand-green/10">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
          )}
        </div>
        
        {/* Location - Minimalist Footer */}
        <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
          {location && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-widest">
              <MapPin className="h-3.5 w-3.5 text-brand-green" />
              {location}
            </div>
          )}
          
          {/* Subtle Decorative element */}
          <div className="h-1.5 w-1.5 rounded-full bg-brand-green/30"></div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
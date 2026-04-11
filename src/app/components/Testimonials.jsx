'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Mother, Delhi',
    quote: 'Mindful parenting workshop ne meri soch hi badal di! Bachchon ke saath patience aur samajhdari aa gyi. Ab mera ghar zyada peaceful hai.',
    rating: 5,
    image: '/profile.jpg',
    type: 'text'
  },
  {
    name: 'Anjali Verma',
    role: 'Working Mother, Bangalore',
    quote: 'School ke pressure aur parenting stress ko handle karna seekh gyi. Practical tips jo din mein use kar sakti hoon. Bahut helpful!',
    rating: 5,
    image: '/profile.jpg',
    type: 'text'
  },
  {
    name: 'Rahul Gupta',
    role: 'Father, Mumbai',
    quote: 'Mera ladka bohot aggressive tha. Workshop ke techniques se ab wo zyada calm aur focused hai. Relationship bhi improve ho gyi.',
    rating: 5,
    image: '/profile.jpg',
    type: 'text'
  },
  {
    name: 'Neha Patel',
    role: 'Parent Coach, Pune',
    quote: 'Expert guidance se meri 3 saal ke bete ka behavior problem solve ho gya. Ab sab kuch normal hai. Highly recommend!',
    rating: 5,
    image: '/profile.jpg',
    type: 'text'
  },
  {
    name: 'Harsh Kapoor',
    role: 'Father, Hyderabad',
    quote: 'Child psychology samjh aa gya! Ab mein samajh sakta hoon ki mera baccha kya chahta hai. Parenting bilkul badal gyi.',
    rating: 5,
    image: '/profile.jpg',
    type: 'text'
  },
  {
    name: 'YouTube Testimonial',
    role: 'Real Parent Success Story',
    quote: 'Watch real parents share their transformation stories with mindful parenting techniques.',
    rating: 5,
    image: '/profile.jpg',
    type: 'video',
    videoId: 'dQw4w9WgXcQ'
  }
];

export default function TestimonialsSection() {
  return (
    <div id="learn" className="relative bg-[#0a0a0a] text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B5E2B]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#4A2B12]/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#3B5E2B]/20 border border-[#3B5E2B]/30 mb-8 mx-auto max-w-max">
            <div className="w-2 h-2 rounded-full bg-[#3B5E2B] animate-pulse"></div>
            <span className="text-[#3B5E2B] text-sm font-semibold tracking-wide uppercase">What Our Parents Say</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Parent Stories & <span className="text-[#3B5E2B]">Success Transformations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thousands of parents have transformed their parenting journey with mindful techniques and expert guidance.
          </p>
        </div>

        {/* Swiper Testimonials */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} bg-[#3B5E2B]/30 border border-[#3B5E2B]/50 rounded-full w-3 h-3"></span>`;
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!h-auto">
                {testimonial.type === 'video' ? (
                  <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#3B5E2B]/20 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between hover:border-[#3B5E2B]/40 transition-all group overflow-hidden">
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-4 group">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${testimonial.videoId}?rel=0`}
                        title="Parent Testimonial Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100">
                        <Play className="w-12 h-12 text-white fill-white" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-300 italic text-base md:text-lg leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                    <div className="pt-4 border-t border-[#3B5E2B]/10">
                      <h4 className="font-bold text-white text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#3B5E2B]/20 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between hover:border-[#3B5E2B]/40 transition-all group">
                    {/* Quote */}
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-center gap-1 mb-3 md:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 md:w-5 h-4 md:h-5 ${i < Math.floor(testimonial.rating) ? 'text-[#3B5E2B] fill-[#3B5E2B]' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 italic text-base md:text-lg leading-relaxed mb-3 md:mb-4">"{testimonial.quote}"</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-[#3B5E2B]/10">
                      <div className="relative flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#3B5E2B]/20 group-hover:border-[#3B5E2B]/50 transition-colors"
                        />
                        <div className="absolute -bottom-0.5 md:-bottom-1 -right-0.5 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-[#3B5E2B] rounded-full flex items-center justify-center text-black text-xs font-bold">
                          ✓
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm md:text-base truncate">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-gray-400 truncate">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#3B5E2B]/10 border border-[#3B5E2B]/30 rounded-full flex items-center justify-center text-[#3B5E2B] hover:bg-[#3B5E2B]/20 transition-all group cursor-pointer z-10">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#3B5E2B]/10 border border-[#3B5E2B]/30 rounded-full flex items-center justify-center text-[#3B5E2B] hover:bg-[#3B5E2B]/20 transition-all group cursor-pointer z-10">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 pt-12 border-t border-[#3B5E2B]/10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#3B5E2B] mb-2">25K+</div>
            <p className="text-gray-400 text-sm md:text-base">Happy Parents</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#3B5E2B] mb-2">95%</div>
            <p className="text-gray-400 text-sm md:text-base">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#3B5E2B] mb-2">1000+</div>
            <p className="text-gray-400 text-sm md:text-base">Families Transformed</p>
          </div>
        </div>

      </div>
    </div>
  );
}

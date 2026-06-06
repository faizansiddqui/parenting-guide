"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  Layout,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function ThankYouClient({ communityLink, eventName }) {
  const router = useRouter();
  const resolvedCommunityLink =
    communityLink || process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || "";
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const validateAccess = () => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("thankyouData");
    if (!saved) return null;
    try {
      const parsedData = JSON.parse(saved);
      if (!parsedData.name || !parsedData.email || !parsedData.phone)
        return null;

      if (parsedData.timestamp) {
        const submissionTime = new Date(parsedData.timestamp);
        const currentTime = new Date();
        if (currentTime - submissionTime >= 60 * 60 * 1000) {
          localStorage.removeItem("thankyouData");
          return null;
        }
      }
      return parsedData;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const userData = validateAccess();
    if (!userData) {
      router.replace("/");
      return undefined;
    }

    setTimeout(() => {
      setData(userData);
      setIsVisible(true);
    }, 100);

    const timer = setTimeout(() => {
      localStorage.removeItem("thankyouData");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-12 h-12 border-4 border-[#3B5E2B]/20 border-t-[#3B5E2B] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A2B12] flex items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      {/* --- Aesthetic Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3B5E2B_0.8px,transparent_0.8px)] [background-size:40px_40px] opacity-[0.05]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#3B5E2B]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#D99B38]/5 rounded-full blur-[120px]" />
      </div>

      <div
        className={`relative z-10 w-full max-w-3xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(74,43,18,0.07)] border border-white overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-[#3B5E2B] to-[#4D7A38] p-8 sm:p-12 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6 animate-bounce-slow">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
                Registration Success!
              </h1>
              <p className="text-white/80 font-medium max-w-md mx-auto leading-relaxed">
                Congratulations! Aapne apne bache ke behtar bhavishya ki taraf
                pehla kadam badha liya hai.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            {resolvedCommunityLink ? (
              <a
                href={resolvedCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-10 w-full px-5 py-5 bg-[#25D366] hover:bg-[#1eb956] text-white font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-2xl transition-all duration-500 shadow-[0_15px_30px_rgba(37,211,102,0.2)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:scale-100"
              >
                Join WhatsApp Community
                <span className="bg-white/20 p-1 rounded-full group-hover:scale-125 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ) : null}

            <div className="grid gap-2 md:grid-cols-2">
              {/* Profile Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px flex-1 bg-stone-100"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B5E2B]">
                    Guardian Details
                  </span>
                  <div className="h-px flex-1 bg-stone-100"></div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-2">
                    <Users className="w-5 h-5 text-[#3B5E2B]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Guardian Name
                    </p>
                    <p className="text-base font-bold text-[#4A2B12]">
                      {data.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-2">
                    <Phone className="w-5 h-5 text-[#3B5E2B]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Phone Number
                    </p>
                    <p className="text-base font-bold text-[#4A2B12]">
                      {data.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="p-2">
                    <MapPin className="w-5 h-5 text-[#3B5E2B]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-base font-bold text-[#4A2B12]">
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Webinar Schedule Card */}
              <div className="bg-[#FDFBF7] rounded-[2rem] p-6 border-2 border-dashed border-[#3B5E2B]/20 relative">
                <div className="absolute -top-3 left-6 bg-[#3B5E2B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Event Schedule
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-[#3B5E2B]" />
                    <div>
                      <p className="text-sm font-bold text-[#4A2B12]">
                        {data.webinarDate}
                      </p>
                      <p className="text-xs text-stone-400 font-medium">
                        {data.webinarDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-[#3B5E2B]" />
                    <div>
                      <p className="text-sm font-bold text-[#4A2B12]">
                        {data.webinarTime}
                      </p>
                      <p className="text-xs text-stone-400 font-medium">
                        IST Timezone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Layout className="w-6 h-6 text-[#3B5E2B]" />
                    <div>
                      <p className="text-sm font-bold text-[#4A2B12]">
                        {data.webinarType}
                      </p>
                      <p className="text-xs text-stone-400 font-medium">
                        {eventName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Branding */}
            <div className="mt-10 pt-8 border-t border-stone-50 text-center">
              <p className="text-[10px] text-stone-300 font-black uppercase tracking-[0.3em]">
                Empowered By Pravesh Parenting • 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Award,
  Star,
  User,
  Mail,
  Phone,
  ChevronRight,
  Clock,
  Loader2,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- PARENTING TEXT DATA ---
const calculateWebinarData = () => {
  const now = new Date();
  const SUNDAY = 0;
  const THURSDAY = 4;

  let webinarDateObj = new Date();
  const webinarType = "Mindful Parenting Workshop"; // Text changed
  const webinarTime = "08:00 PM";

  function getNextDay(targetDay) {
    const result = new Date(now);
    const dayDiff = (targetDay - now.getDay() + 7) % 7;
    result.setDate(now.getDate() + (dayDiff === 0 ? 7 : dayDiff));
    return result;
  }

  const nextSunday = getNextDay(SUNDAY);
  const nextThursday = getNextDay(THURSDAY);
  webinarDateObj = nextSunday < nextThursday ? nextSunday : nextThursday;

  const webinarDay = webinarDateObj.toLocaleDateString("en-IN", {
    weekday: "long",
  });
  const webinarDate = webinarDateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return { webinarDay, webinarDate, webinarTime, webinarType };
};

const initialWebinarData = calculateWebinarData();

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

const calculateBookedSeats = () => {
  const now = new Date();
  const seatCount = 92 + now.getDate() + Math.floor(now.getHours() / 2);
  return Math.max(100, seatCount);
};

export default function LearningForm({ showStickyBar = true }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [bookedSeats] = useState(() => calculateBookedSeats());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    webinarDay: initialWebinarData.webinarDay,
    webinarDate: initialWebinarData.webinarDate,
    webinarTime: initialWebinarData.webinarTime,
    webinarType: initialWebinarData.webinarType,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [remainingTime, setRemainingTime] = useState(30 * 60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTimer = localStorage.getItem("parentingFormTimer");
      if (savedTimer) {
        const parsedTimer = parseInt(savedTimer, 10);
        if (parsedTimer > 0) setRemainingTime(parsedTimer);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("parentingFormTimer", newTime.toString());
        }
        return newTime <= 0 ? 30 * 60 : newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let formattedPhone = formData.phone.trim();
      if (formattedPhone.startsWith("+91"))
        formattedPhone = formattedPhone.substring(3);
      else if (formattedPhone.startsWith("91"))
        formattedPhone = formattedPhone.substring(2);

      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: formattedPhone }),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem(
          "thankyouData",
          JSON.stringify({ ...formData, phone: formattedPhone }),
        );
        router.push("/thank-you");
      } else {
        throw new Error(result.message || "Failed");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex items-center justify-center py-12 px-4 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(7rem+env(safe-area-inset-bottom,0px))] overflow-hidden">
      {/* --- Earthy Background Design --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3B5E2B_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.1]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3B5E2B]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4A2B12]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_25px_70px_rgba(74,43,18,0.08)] border border-white overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* LEFT PANEL: Form Section */}
          <div className="p-6 sm:p-12 lg:p-16" ref={formRef}>
            <div className="max-w-md mx-auto">
              <div className="mb-2 lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-[#4A2B12] leading-tight">
                  Master The Art of{" "}
                  <span className="text-[#3B5E2B] italic font-serif">
                    Mindful
                  </span>{" "}
                  Parenting
                </h2>
                <p className="mt-4 text-stone-500 font-medium leading-relaxed">
                  Apne bache ke bhavishya ko ek nayi disha dein. Workshop join
                  karne ke liye form bharein.
                </p>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-bold animate-pulse">
                    {errorMessage}
                  </div>
                )}
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3B5E2B]/10 text-[#3B5E2B] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <span className="text-[#4A2B12]">
                  {bookedSeats} Seats Booked
                </span>
                {/* <span></span> */}
              </span>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                    Parent&apos;s Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-[#3B5E2B] transition-colors" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Singh"
                      className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#3B5E2B]/5 focus:border-[#3B5E2B] transition-all text-[#4A2B12] font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-[#3B5E2B] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#3B5E2B]/5 focus:border-[#3B5E2B] transition-all text-[#4A2B12] font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                    State
                  </label>
                  <div className="relative group">
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full appearance-none px-5 pr-12 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#3B5E2B]/5 focus:border-[#3B5E2B] transition-all text-[#4A2B12] font-bold"
                    >
                      <option value="">Select your state</option>
                      {indianStates.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 rotate-90" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                    WhatsApp Number
                  </label>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-16 bg-stone-100 border border-stone-100 rounded-2xl text-[#4A2B12] font-black text-xs">
                      +91
                    </div>
                    <div className="relative flex-1 group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-[#3B5E2B] transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98765 43510"
                        className="w-full pl-12 pr-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#3B5E2B]/5 focus:border-[#3B5E2B] transition-all text-[#4A2B12] font-bold"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full group mt-4 font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-500 shadow-xl flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-stone-200 text-stone-400"
                      : "bg-[#4A2B12] hover:border hover:border-[#4A2B12] hover:text-[#4A2B12] cursor-pointer hover:bg-white text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Register Now — Free{" "}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT PANEL: Mentor Visuals */}
          <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-[#FDFBF7] to-white border-r border-stone-100">
            {/* Badges */}
            <div className="absolute top-15 right-10 animate-float z-99">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-stone-100 flex items-center gap-3">
                <div className="bg-[#D99B38] p-2 rounded-xl">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#4A2B12] leading-none">
                    4.9/5
                  </p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    Expert Mentor
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-8 animate-float delay-700">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-stone-100 flex items-center gap-3">
                <div className="bg-[#3B5E2B] p-2 rounded-xl text-white">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#4A2B12] leading-none">
                    25K+
                  </p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    Happy Parents
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-[#3B5E2B]/10 rounded-full blur-3xl group-hover:bg-[#3B5E2B]/20 transition-all duration-700" />
              <div className="relative w-80 h-[400px] bg-white rounded-[2rem] overflow-hidden border-8 border-white shadow-xl">
                <Image
                  fill
                  alt="Parenting Expert"
                  src="/profile.png"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-black text-[#4A2B12]">
                Mr. Pravesh Gupta
              </h3>
              <p className="text-sm font-black text-[#3B5E2B] uppercase tracking-[0.3em] mt-1">
                Child Psychology Expert
              </p>
            </div>
          </div>
        </div>
      </div>

      {showStickyBar && (
        <div
          className="lg:hidden fixed inset-x-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]"
          style={{
            bottom: "env(safe-area-inset-bottom, 0px)",
            paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                  Closing Soon
                </p>
                <div className="text-xl sm:text-2xl font-mono font-black text-[#4A2B12] tabular-nums tracking-tighter">
                  {formatTime(remainingTime)}
                </div>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/form")}
              className="hover:bg-white bg-[#4A2B12] text-white hover:text-[#4A2B12] hover:border hover:border-[#4A2B12] cursor-pointer font-black text-xs sm:text-sm tracking-[0.2em] px-4 sm:px-12 py-4 rounded-2xl transition-all duration-500 shadow-lg active:scale-95 uppercase flex items-center gap-2"
            >
              FREE ACCESS <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

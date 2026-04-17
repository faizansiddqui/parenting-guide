import React from "react";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    // Background ko light rakha hai (#FDFBF7 - Cream White)
    <footer className="relative bg-[#FDFBF7] text-[#4A2B12] overflow-hidden mb-20 md:mb-0 border-t border-stone-200">
      {/* Background Subtle Effects - Light & Airy */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Green Glow - Top Right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B5E2B]/5 rounded-full blur-[120px]"></div>
        {/* Soft Brown Glow - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D99B38]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-2 lg:px-8 py-10">
          {/* Main Footer Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            {/* Social Proof Section */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
              <div className="bg-[#3B5E2B]/10 p-1.5 rounded-full">
                <Users className="w-4 h-4 text-[#3B5E2B]" />
              </div>
              <span className="font-bold text-stone-600 tracking-tight">
                Join 25K+ Mindful Parents
              </span>
            </div>

            {/* Copyright Section */}
            <div className="text-center">
              <p className="text-stone-500 font-medium">
                © 2026{" "}
                <span className="text-[#4A2B12] font-black uppercase tracking-wider">
                  Pravesh Parenting
                </span>
              </p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">
                Empowering Families Daily
              </p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">
                Developed by <b>Akamify</b>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-8">
              <Link
                href="/privacy-policy"
                className="text-stone-500 hover:text-[#3B5E2B] font-bold transition-all duration-300 hover:translate-y-[-1px]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-stone-500 hover:text-[#3B5E2B] font-bold transition-all duration-300 hover:translate-y-[-1px]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line - Very Subtle Green */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#3B5E2B]/20 to-transparent opacity-30"></div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Shop", href: "#shop" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#F9F8F6]/70 backdrop-blur-md">
        <nav className="container mx-auto px-10 h-[90px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.98 12.01L14.47 5.97C14.71 4.97 13.9 4 12.87 4H8.4C6.52 4 5 5.52 5 7.4V12.01C5 12.56 5.44 13.01 6 13.01H11.98C12.54 13.01 12.98 12.56 12.98 12.01Z" fill="#1A1A1A"/>
              <path d="M22.02 12.01L20.53 5.97C20.29 4.97 21.1 4 22.13 4H26.6C28.48 4 30 5.52 30 7.4V12.01C30 12.56 29.56 13.01 29 13.01H23.02C22.46 13.01 22.02 12.56 22.02 12.01Z" fill="#1A1A1A"/>
              <circle cx="17.5" cy="19.5" r="3.5" fill="#1A1A1A"/>
              <circle cx="11.5" cy="23.5" r="2.5" fill="#1A1A1A"/>
              <circle cx="23.5" cy="23.5" r="2.5" fill="#1A1A1A"/>
              <circle cx="14.5" cy="18.5" r="1.5" fill="#F9F8F6"/>
              <circle cx="20.5" cy="18.5" r="1.5" fill="#F9F8F6"/>
            </svg>
            <span className="text-3xl font-heading tracking-tight text-[#1A1A1A]">PetPals<span className="text-[#987D6B] text-[8px] relative -top-3">●</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] text-[#1A1A1A] hover:text-[#987D6B] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#EDECED] text-[#1A1A1A] hover:bg-[#E5E4E5] transition-colors">
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button className="hidden sm:inline-flex items-center justify-center h-11 px-8 rounded-full text-[15px] font-medium bg-[#987D6B] text-white hover:bg-[#8A7160] transition-colors">
              Book Now
            </button>
          </div>
        </nav>
      </header>

      {/* Floating Badges */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Link href="#" className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform border border-gray-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className="text-[13px] font-semibold text-black">Purchase Now</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform border border-gray-100">
          <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H0V20H20L40 0H20Z" fill="var(--framer-blue, #0055FF)"/><path d="M40 20H20V40H40L20 20Z" fill="var(--framer-blue, #0055FF)"/></svg>
          <span className="text-[13px] font-semibold text-black">Made in Framer</span>
        </Link>
      </div>
    </>
  );
}

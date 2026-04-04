"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/AnimationProvider";
import { PawPrint } from "../Hero/Hero";

export function FeaturedMarquee() {
  const text = "WELCOME TO PETPALS, BUDDIES! ✨ ";

  return (
    <section className="py-32 bg-[#F9F8F6] overflow-hidden flex justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* <FadeInUp>
          <div className="relative flex items-center justify-center w-[100px] h-[100px] max-w-md mx-auto aspect-square"> */}
            
            {/* Rotating Text */}
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path
                  id="circlePath"
                  d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-heading fill-primary tracking-[0.25em] uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    {text} {text} {text}
                  </textPath>
                </text>
              </svg>
            </motion.div> */}

            {/* Center Image Container */}
            {/* <div className="relative z-10 w-[65%] h-[65%] rounded-full flex justify-center items-center overflow-hidden">
               <div className="w-10 h-10 text-primary/20 -rotate-40">
                <PawPrint className="w-full h-full" />
               </div>
            </div> */}
            
          {/* </div>
        </FadeInUp> */}
      </div>
    </section>
  );
}

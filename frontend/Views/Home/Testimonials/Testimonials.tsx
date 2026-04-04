"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationProvider";
import { Quote } from "lucide-react";
import Image from "next/image";
import { BouncingElement, PawPrint } from "../Hero/Hero";

const testimonials = [
  {
    quote: "PetPals exceeded my expectations. Their pet sitting service was truly exceptional. Thanks to their dedicated care and attention.",
    name: "Sarah L.",
    image: "/assets/testimonial-1.png",
  },
  {
    quote: "I can't praise PetPals' grooming team enough. They transformed my dog into a furry superstar and made my pup feel truly pampered.",
    name: "Michael R.",
    image: "/assets/testimonial-2.png",
  },
  {
    quote: "PetPals' veterinarians are absolute gems. They provided top-notch medical care and showed immense compassion for my aging dog.",
    name: "Jennifer M.",
    image: "/assets/testimonial-3.png",
  },
];

// bg-[#EDECED]/30

export function Testimonials() {
  return (
    <section className="py-32 relative max-md:py-10 px-5">
      <div className="container flex justify-between max-md:flex-col gap-10 mx-auto max-w-7xl">

        {/* left side */}
        <div className="relative flex">
          <FadeInUp>
            <h2 className="text-4xl md:text-7xl mt-28 max-w-lg font-heading text-foreground mb-4">Real Stories from PetPals Families</h2>
          </FadeInUp>

          <BouncingElement
            axis="rotate"
            startVal={10}
            endVal={40}
            className="absolute top-[8%] right-[8%] w-20 h-20 text-primary/20"
          >
            <PawPrint className="w-full h-full" />
          </BouncingElement>


          <BouncingElement
            axis="rotate"
            startVal={-20}
            endVal={-50}
            className="absolute top-[68%] max-md:top-[95%] left-[0%] w-20 h-20 max-md:w-10  max-md:h-10 text-primary/20"
          >
            <PawPrint className="w-full h-full" />
          </BouncingElement>

          <div className="absolute top-1/2 translate-y-1/2 right-[5%] max-md:-right-[5%]">
            <Quote className="text-primary fill-primary w-12 h-12 max-md:w-8 max-md:h-8 absolute top-6 right-6 " />
          </div>
          {/* <FadeInUp delay={0.1}>
            <p className="text-muted-foreground max-w-2xl">
              Don't just take our word for it. Hear what our happy clients have to say about their experience with us.
            </p>
          </FadeInUp> */}
        </div>

        {/* right side */}

        <StaggerContainer className="flex flex-col max-w-2xl gap-8">
          {testimonials.map((item, index) => (
            <StaggerItem key={index}>
              <div className="bg-card group hover:bg-primary border border-border p-8 rounded-3xl relative h-full flex flex-col transition-all hover:-translate-y-2 hover:shadow-xl">
                <Quote className="text-primary/20 group-hover:text-white w-12 h-12 absolute top-6 right-6 rotate-180" />

                <p className="text-muted-foreground group-hover:text-section-bg italic leading-relaxed grow relative z-10 mb-8 pt-4">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-secondary/50">
                    {/* Fallback box if image isn't loaded */}
                    <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full flex items-center justify-center text-primary/40 text-[8px] text-center">Img</div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <h4 className="font-heading group-hover:text-white text-lg text-foreground">{item.name}</h4>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

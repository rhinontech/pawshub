"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationProvider";
import { Quote } from "lucide-react";
import Image from "next/image";

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

export function Testimonials() {
  return (
    <section className="py-32 bg-[#EDECED]/30 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">Real Stories from PetPals Families</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-muted-foreground max-w-2xl">
              Don't just take our word for it. Hear what our happy clients have to say about their experience with us.
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
             <StaggerItem key={index}>
               <div className="bg-card border border-border p-8 rounded-3xl relative h-full flex flex-col transition-all hover:-translate-y-2 hover:shadow-xl">
                 <Quote className="text-primary/20 w-12 h-12 absolute top-6 right-6 rotate-180" />
                 
                 <p className="text-muted-foreground italic leading-relaxed grow relative z-10 mb-8 pt-4">
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
                   <h4 className="font-heading text-lg text-foreground">{item.name}</h4>
                 </div>
               </div>
             </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

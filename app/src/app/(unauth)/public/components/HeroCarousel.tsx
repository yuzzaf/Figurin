"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel({ banners }: { banners: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Timer otomatis setiap 4 detik
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000); 
    
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="md:col-span-3 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-lg bg-gray-900 border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
      
      {/* Gambar Carousel yang meloop */}
      {banners.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Hero Banner ${index + 1}`}
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          unoptimized
          priority={index === 0}
        />
      ))}

      {/* Kontrol Kiri/Kanan Manual (muncul saat di hover) */}
      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 border border-white/10 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 border border-white/10 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      {/* Titik indikator kecil di bawah */}
      <div className="absolute bottom-6 right-8 z-30 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-orange-500 w-8" : "bg-white/50 w-2 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Teks statis */}
      <div className="absolute bottom-0 left-0 p-8 z-20 w-full md:w-2/3 pointer-events-none">
        <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
          Exclusive Release
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
          Elevate Your <span className="text-orange-400">Collection</span>
        </h1>
        <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-2 max-w-sm">
          Discover the most detailed and sought-after figures from around
          the world. Secure yours before they're gone.
        </p>
        <Link href="/public/products" className="pointer-events-auto">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:shadow-orange-500/50">
            Shop Now <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}

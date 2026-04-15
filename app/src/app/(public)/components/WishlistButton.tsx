"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistButton({ productId, initialInWishlist = false, variant = "default" }: { productId: string, initialInWishlist?: boolean, variant?: "default" | "icon" }) {
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const router = useRouter();

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    // Optimistic Update
    const previousState = inWishlist;
    setInWishlist(!previousState);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        setInWishlist(previousState);
        router.push("/login");
        return;
      }

      const data = await res.json();
      
      if (res.ok) {
        // If the API says already exists, we might want to stay true
        if (data.message === "Item already in wishlist") {
          setInWishlist(true);
        }
        router.refresh();
      } else {
        setInWishlist(previousState);
      }
    } catch (error) {
      setInWishlist(previousState);
      console.error("Error toggling wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={toggleWishlist}
        disabled={loading}
        className={`p-3 rounded-2xl backdrop-blur-sm shadow-xl transition-all hover:scale-110 flex items-center justify-center ${
          inWishlist ? "bg-rose-500 text-white" : "bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-white"
        }`}
      >
        <Heart 
          size={20} 
          className={`${loading ? "animate-pulse" : ""} ${inWishlist ? "fill-current" : ""}`} 
        />
      </button>
    );
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${
        inWishlist ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
      }`}
    >
      <Heart 
        size={22} 
        className={`${loading ? "animate-pulse" : ""} group-hover:scale-110 transition-transform ${inWishlist ? "fill-current" : ""}`} 
      />
      <span className="hidden md:inline">
        {inWishlist ? "Wishlisted" : "Add to Wishlist"}
      </span>
    </button>
  );
}

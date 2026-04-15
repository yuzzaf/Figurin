"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistButton({ productId, initialInWishlist = false, variant = "default" }: { productId: string, initialInWishlist?: boolean, variant?: "default" | "icon" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.ok) {
        // You could add a toast here
        router.refresh();
      }
    } catch (error) {
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
        className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-400 hover:text-rose-500 hover:bg-white shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      >
        <Heart size={20} className={loading ? "animate-pulse" : ""} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className="p-5 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold transition-all flex items-center justify-center gap-2 group"
    >
      <Heart size={22} className={`${loading ? "animate-pulse" : ""} group-hover:scale-110 transition-transform`} />
      <span className="hidden md:inline">Add to Wishlist</span>
    </button>
  );
}

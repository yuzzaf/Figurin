"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart, ArrowRight } from "lucide-react";

export default function WishlistClient() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      setItems(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.product._id !== productId));
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-rose-50 rounded-2xl">
          <Heart size={32} className="text-rose-500 fill-rose-500" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
          <p className="text-gray-500 font-medium">Items you've added for later.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Looks like you haven't added anything to your wishlist yet.
            Start exploring our collection!
          </p>
          <Link href="/products">
            <button className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 mx-auto">
              Explore Collection <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={item.product.thumbnail || "https://dummyimage.com/600x600/ccc/fff"}
                  alt={item.product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                
                {/* Remove Button Overlay */}
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-rose-500 hover:bg-white p-3 rounded-2xl shadow-xl transition-all hover:scale-110"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.product.tags?.slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {item.product.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {item.product.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      Rp {item.product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  
                  <Link href={`/products/${item.product._id}`}>
                    <button className="bg-gray-50 text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
                      View Piece
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProducts } from "../products/actions";

export default function InfiniteProductList({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialProducts.length >= 10);
  const [page, setPage] = useState(2);

  const fetchMoreData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const resp = await getProducts(page, 10);
      const newProducts = resp.data || [];
      
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => {
          // Filter duplicates just in case
          const existingIds = new Set(prev.map(p => p._id || p.id));
          const filtered = newProducts.filter((p: any) => !existingIds.has(p._id || p.id));
          return [...prev, ...filtered];
        });
        setPage(page + 1);
        if (newProducts.length < 10) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-8 pb-12 w-full col-span-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      }
      endMessage={
        <p className="text-center w-full col-span-full py-8 text-gray-400 font-medium text-sm">
          No more products to show.
        </p>
      }
      className="overflow-visible!" // Fix for some react-infinite-scroll layout issues
      style={{ overflow: "visible" }} // Ensure grid works smoothly
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 pb-10">
        {products.map((item: any, index: number) => (
          <div
            key={`${item._id || item.id}-${index}`}
            className="bg-white rounded-3xl p-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group relative"
          >
            {/* Badge for exclusivity */}
            {item.price > 3000000 && (
              <div className="absolute top-6 right-6 z-20 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
                PREMIUM
              </div>
            )}

            {/* Thumbnail Image */}
            <div className="relative h-[220px] md:h-[260px] w-full bg-gray-50 rounded-2xl mb-4 overflow-hidden flex-shrink-0">
              <Image
                src={
                  item.thumbnail
                }
                alt={item.name || "Product image"}
                fill
                className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />

              {/* On-Hover Add to Cart overlay button */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all font-bold shadow-xl flex items-center gap-2">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>

            {/* Area Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.slice(0, 2).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title & Excerpt */}
            <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-orange-500 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-4">
              {item.excerpt}
            </p>

            {/* Bottom (Price) */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">
                  Starting at
                </p>
                <p className="text-gray-900 font-black text-lg md:text-xl relative inline-block">
                  Rp {item.price ? item.price.toLocaleString("id-ID") : "0"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

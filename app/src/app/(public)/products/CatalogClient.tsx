"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowLeft,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProducts } from "./actions";
import WishlistButton from "../components/WishlistButton";

export default function CatalogClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, [search, filter, sort]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const resp = await getProducts(1, 10, search, filter, sort);
      setProducts(resp.data || []);
      setPage(2);
      setHasMore((resp.data || []).length >= 10);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const resp = await getProducts(page, 10, search, filter, sort);
      const newProducts = resp.data || [];
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(page + 1);
        if (newProducts.length < 10) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header / Filter Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 md:relative z-40 transition-shadow duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft size={18} /> Home
            </Link>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Collection
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search pieces..."
                className="w-full md:w-64 bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer appearance-none pr-10 relative"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">A - Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-10 w-full col-span-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            }
            endMessage={
              <p className="text-center w-full col-span-full py-10 text-gray-400 font-medium text-sm">
                You've reached the end of our vault.
              </p>
            }
            className="overflow-visible!"
            style={{ overflow: "visible" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-10">
              {products.map((item: any, index: number) => (
                <Link
                  href={`/products/${item._id || item.id}`}
                  key={`${item._id || item.id}-${index}`}
                  className="bg-white rounded-3xl p-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group relative"
                >
                  {/* Badge for exclusivity */}
                  {item.price > 3000000 && (
                    <div className="absolute top-6 right-6 z-20 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
                      PREMIUM
                    </div>
                  )}

                  {/* Thumbnail Image */}
                  <div className="relative aspect-square w-full bg-gray-50 rounded-2xl mb-4 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.thumbnail || "https://dummyimage.com/400x400/ccc/fff"}
                      alt={item.name}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />

                    {/* On-Hover Add to Cart overlay button */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all font-bold shadow-xl flex items-center gap-2">
                        <ShoppingBag size={18} />
                      </button>
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-all delay-75">
                        <WishlistButton productId={item._id || item.id} variant="icon" />
                      </div>
                    </div>
                  </div>

                  {/* Area Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(item.tags || []).slice(0, 2).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>

                  {/* Bottom (Price) */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                        Valuation
                      </p>
                      <p className="text-gray-900 font-black text-base md:text-lg">
                        Rp {item.price ? item.price.toLocaleString("id-ID") : "0"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </main>
  );
}

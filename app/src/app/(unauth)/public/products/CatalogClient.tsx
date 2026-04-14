"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProducts } from "./actions";

export default function CatalogClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState<string>("price-asc");
  const [filterTag, setFilterTag] = useState<string>("");

  // Debounce logic for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchInitialLogs = async () => {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      
      try {
        const resp = await getProducts(1, 10, debouncedSearch, filterTag, sortType);
        setProducts(resp.data || []);
        if ((resp.data || []).length < 10) {
          setHasMore(false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialLogs();
  }, [debouncedSearch, sortType, filterTag]);

  // Loading more
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      await new Promise((res) => setTimeout(res, 500)); // Simulasi loading UI
      const resp = await getProducts(nextPage, 10, debouncedSearch, filterTag, sortType);
      
      const newProducts = resp.data || [];
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => {
          // Prevent duplicates
          const existingIds = new Set(prev.map(p => p._id || p.id));
          const filtered = newProducts.filter((p: any) => !existingIds.has(p._id || p.id));
          return [...prev, ...filtered];
        });
        setPage(nextPage);
        if (newProducts.length < 10) setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] font-sans pb-24">
      {/* Top Nav Area */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/public"
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft size={18} /> Home
            </Link>
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Figure.in Catalog
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search figures..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-full md:w-64 transition-all"
              />
            </div>
            
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="py-2 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Filter Badges */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <SlidersHorizontal size={18} className="text-gray-400 mr-2" />
          {["", "scale figure", "nendoroid", "figma", "action figure", "prize"].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                filterTag === tag 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tag === "" ? "All" : tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No figures found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
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
                You've reached the end of the catalog.
              </p>
            }
            className="overflow-visible!" 
            style={{ overflow: "visible" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-10">
              {products.map((item: any, index: number) => (
                <Link
                  href={`/public/products/${item._id || item.id}`}
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
                  <div className="relative h-[200px] md:h-[240px] w-full bg-gray-50 rounded-2xl mb-4 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.thumbnail || "https://dummyimage.com/600x600/ccc/fff"}
                      alt={item.name || "Product image"}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />

                    {/* On-Hover overlay button */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all font-bold shadow-xl flex items-center gap-2">
                        <ShoppingBag size={18} />
                      </div>
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
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>

                  {/* Bottom (Price) */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-black text-lg relative inline-block">
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

import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./(unauth)/public/components/HeroCarousel";
import { getProducts } from "./(unauth)/public/products/actions";
import { Flame, Sparkles } from "lucide-react";
import InfiniteProductList from "./(unauth)/public/components/InfiniteProductList";

async function getBanners() {
  return [
    "/images/banners/banner1.png",
    "/images/banners/banner2.png",
    "/images/banners/banner3.png",
    "/images/banners/banner4.png",
  ];
}

async function getCategories() {
  return [
    { title: "POP UP & SCALE", image: "/category1.jpg" },
    { title: "MERCHANDISE", image: "/category2.jpg" },
    { title: "WIPEOUT DEALS!", image: "/category3.jpg" },
  ];
}

export default async function HomePage() {
  const [banners, categories, productsResponse] = await Promise.all([
    getBanners(),
    getCategories(),
    getProducts(1, 10),
  ]);

  const products = productsResponse?.data || [];

  return (
    <main className="bg-gray-50 min-h-screen font-sans pb-20">
      {/* ===== PREMIUM HERO BENTO GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
          {/* Main Big Looping Banner */}
          <HeroCarousel banners={banners} />

          {/* Side Banners */}
          <div className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            <div className="w-full h-full bg-slate-300 absolute inset-0 flex items-center justify-center text-xs text-gray-500">
              Banner 2
            </div>
            <Image
              src={banners[1]}
              alt="Side 1"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute bottom-4 left-4 z-20">
              <h3 className="text-white font-bold text-lg">Pre-Orders</h3>
              <p className="text-orange-300 text-xs font-medium">
                Reserve Today
              </p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
            <div className="w-full h-full bg-slate-400 absolute inset-0 flex items-center justify-center text-xs text-gray-500">
              Banner 3
            </div>
            <Image
              src={banners[2]}
              alt="Side 2"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute bottom-4 left-4 z-20">
              <h3 className="text-white font-bold text-lg">Clearance</h3>
              <p className="text-orange-300 text-xs font-medium">
                Up to 50% Off
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES (CIRCULAR/PILL DESIGN) ===== */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-orange-500" size={24} />
          <h2 className="text-2xl font-black text-gray-900">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((item, i) => (
            <div
              key={i}
              className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <div className="w-full h-full bg-gray-200 absolute inset-0 flex flex-col items-center justify-center text-xs text-gray-500">
                Img {i + 1}
              </div>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-md bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FLASH SALE / HIGHLIGHT BAR ===== */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>
          <div className="relative z-10 flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-orange-500/20 p-3 rounded-2xl">
              <Flame className="text-orange-500" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">New Arrivals Drop</h2>
              <p className="text-gray-400 text-sm mt-1">
                Check out the latest additions to our vault.
              </p>
            </div>
          </div>
          <Link href="/public/products">
            <button className="relative z-10 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* ===== PRODUCTS (NEW PREMIUM CARDS) ===== */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Trending Now
            </h2>
            <p className="text-gray-500 mt-2">
              Highly anticipated items based on community favorites.
            </p>
          </div>
        </div>

        <InfiniteProductList initialProducts={products} />
      </section>
    </main>
  );
}

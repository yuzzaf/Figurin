import Image from "next/image";

async function getBanners() {
  // simulasi fetch (nanti bisa dari API / DB)
  return ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
}

async function getCategories() {
  return [
    {
      title: "POP UP, PRIZE & SCALED FIGURE",
      image: "/category1.jpg",
    },
    {
      title: "MERCHANDISE",
      image: "/category2.jpg",
    },
    {
      title: "WIPEOUT!",
      image: "/category3.jpg",
    },
  ];
}

export default async function HomePage() {
  const banners = await getBanners();
  const categories = await getCategories();

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* ===== HERO ===== */}
      <section className="px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4">
          {banners.map((src, i) => (
            <div
              key={i}
              className="relative h-[200px] rounded-xl overflow-hidden shadow"
            >
              <Image
                src={src}
                alt={`banner-${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROMO ===== */}
      <section className="px-4 grid md:grid-cols-3 gap-4">
        {/* 360 View */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">360° View Available!</h2>
            <p className="text-sm mt-2">
              Explore your hobby world from your screen
            </p>
          </div>
          <button className="mt-4 bg-orange-500 px-4 py-2 rounded-md">
            Explore Store
          </button>
        </div>

        {/* Event */}
        <div className="relative h-[180px] rounded-xl overflow-hidden">
          <Image src="/event.jpg" alt="event" fill className="object-cover" />
        </div>

        {/* Coming Soon */}
        <div className="bg-yellow-400 flex items-center justify-center rounded-xl">
          <h2 className="text-xl font-bold">Coming Soon</h2>
        </div>
      </section>

      {/* ===== CATEGORY ===== */}
      <section className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((item, i) => (
            <div
              key={i}
              className="relative h-[200px] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-center p-2 text-sm">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCTS (dummy) ===== */}
      <section className="px-4 pb-10">
        <h2 className="text-lg font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl p-3 shadow">
              <div className="h-[120px] bg-gray-200 rounded mb-2" />
              <h3 className="text-sm font-semibold">Product Name {item}</h3>
              <p className="text-orange-500 font-bold text-sm">Rp 250.000</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

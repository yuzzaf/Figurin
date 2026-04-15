import Product from "@/app/server/models/Product";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Star } from "lucide-react";
import WishlistButton from "../../components/WishlistButton";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  let product = null;

  try {
    product = await Product.getProductById(resolvedParams.slug);
  } catch (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h1>
        <Link
          href="/"
          className="text-orange-500 hover:text-orange-600 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#FDFDFD] font-sans pb-24">
      {/* Top Nav Area */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Collection
          </Link>
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Figure.in
          </h2>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Left Column: Image Galaxy */}
          <div className="space-y-6">
            <div className="relative w-full aspect-square bg-gray-50 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex items-center justify-center overflow-hidden cursor-crosshair group">
              <div className="absolute inset-0 bg-white backdrop-blur-md opacity-0 group-hover:opacity-10 transition-opacity z-10 pointer-events-none" />
              <Image
                src={
                  product.thumbnail ||
                  "https://dummyimage.com/1000x1000/ccc/fff"
                }
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />

              {/* Floating Element: Exclusive */}
              {product.price > 3000000 && (
                <div className="absolute top-8 right-8 z-20 bg-gradient-to-r from-orange-600 to-rose-600 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  PREMIUM EXCLUSIVE
                </div>
              )}
            </div>

            {/* Images Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {product.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover mix-blend-multiply"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="flex flex-col">
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              {product.excerpt || product.description}
            </p>

            <div className="flex items-end gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  Valuation
                </p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <button className="flex-1 bg-gradient-to-tr from-orange-600 to-rose-500 hover:from-orange-500 hover:to-rose-400 text-white font-bold text-lg py-5 rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingBag size={22} /> Add to Collection
              </button>
              <WishlistButton productId={product._id.toString()} />
            </div>

            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="flex flex-col gap-2">
                <ShieldCheck className="text-orange-500" size={24} />
                <h4 className="font-bold text-gray-900 text-sm">
                  Authentic Guarantee
                </h4>
                <p className="text-xs text-gray-500">
                  100% genuine verified products.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Truck className="text-orange-500" size={24} />
                <h4 className="font-bold text-gray-900 text-sm">
                  Secure Shipping
                </h4>
                <p className="text-xs text-gray-500">
                  Fully insured and trackable.
                </p>
              </div>
            </div>

            {/* Complete Description */}
            {product.description && (
              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  About this piece
                </h3>
                <div className="prose prose-orange max-w-none text-gray-600 text-base leading-loose">
                  <p>{product.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

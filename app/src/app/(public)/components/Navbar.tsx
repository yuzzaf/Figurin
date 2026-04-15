import Link from "next/link";
import { cookies } from "next/headers";
import { ShoppingBag, Heart, User, LogOut, Menu, Sparkles } from "lucide-react";
import { handleLogout } from "@/app/(unauth)/login/actions";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const isLoggedIn = !!token;

  return (
    <div className="fixed top-6 inset-x-0 z-[100] px-4 md:px-8">
      <nav className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
        <div className="px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-gradient-to-br from-orange-500 to-rose-500 p-2.5 rounded-2xl shadow-lg shadow-orange-500/30 group-hover:rotate-12 transition-all duration-500">
                  <ShoppingBag size={22} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-orange-600 via-rose-600 to-orange-600 bg-clip-text text-transparent tracking-tighter leading-tight">
                  Figure.in
                </span>
                <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-[0.2em] -mt-1 ml-0.5">
                  The Collector's Vault
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { name: "Home", href: "/" },
                { name: "Catalog", href: "/products" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all"
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  href="/wishlist"
                  className="px-5 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-full transition-all flex items-center gap-2"
                >
                  <Heart size={16} className="fill-rose-500" />
                  Wishlist
                </Link>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 bg-gray-50/50 p-1.5 rounded-[1.5rem] border border-gray-100">
                <div className="hidden md:flex items-center gap-3 pl-3 pr-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collector</span>
                    <span className="text-xs font-black text-gray-900">Premium User</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center p-0.5 shadow-md">
                     <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <User size={16} className="text-orange-500" />
                     </div>
                  </div>
                </div>
                
                <form action={handleLogout}>
                  <button className="p-3 rounded-2xl text-gray-400 hover:text-rose-500 hover:bg-white hover:shadow-sm transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="hidden md:block px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log In
                </Link>
                <Link href="/register">
                  <button className="relative group overflow-hidden bg-orange-500 text-white px-7 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-orange-500/20 transition-all focus:ring-2 focus:ring-orange-500/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles size={16} /> Join Now
                    </span>
                  </button>
                </Link>
              </div>
            )}
            
            <button className="lg:hidden p-3 rounded-2xl bg-gray-50 text-gray-600">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

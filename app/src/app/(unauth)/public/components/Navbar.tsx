import Link from "next/link";
import { cookies } from "next/headers";
import { ShoppingBag, Heart, User, LogOut, Menu } from "lucide-react";
import { handleLogout } from "@/app/(unauth)/login/actions";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const isLoggedIn = !!token;

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-2 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tighter">
                Figure.in
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              Home
            </Link>
            <Link
              href="/public/products"
              className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              Collection
            </Link>
            {isLoggedIn && (
              <Link
                href="/wishlist"
                className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                <Heart size={16} className="text-rose-500" />
                Wishlist
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-[10px] text-white font-bold">
                    U
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    Account
                  </span>
                </div>

                <form action={handleLogout}>
                  <button className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm">
                    <LogOut size={20} />
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-gray-900/10 hover:bg-orange-600 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

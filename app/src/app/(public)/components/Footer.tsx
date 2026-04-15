import Link from "next/link";
import { ShoppingBag, Mail, MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tighter">
                Figure.in
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Curating the world's most exquisite collection of authentic scale
              figures and collectibles. Your journey into the collector's vault
              starts here.
            </p>
            <div className="flex gap-4">
              {[Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              Quick Access
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Collection", href: "/products" },
                { name: "Flash Sales", href: "/#flash-sale" },
                { name: "Member Rewards", href: "#" },
                { name: "New Arrivals", href: "/#trending" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-orange-600 text-sm font-semibold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              Collector Support
            </h4>
            <ul className="space-y-4">
              {[
                "Care Instructions",
                "Shipping Guide",
                "Authenticity Garantee",
                "Return Policy",
                "Community Forum",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-orange-600 text-sm font-semibold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              The Vault HQ
            </h4>
            <ul className="space-y-5">
              <li className="flex gap-3 text-sm font-medium text-gray-500">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>123 Collector Street, Neo Tokyo, Shibuya District</span>
              </li>
              <li className="flex gap-3 text-sm font-medium text-gray-500">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+62 (21) 888-SHADOW</span>
              </li>
              <li className="flex gap-3 text-sm font-medium text-gray-500">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>vault@figure.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2024 Figure.in - Authentic Collector Specialists
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

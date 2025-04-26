import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200/50 shadow-sm">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"
          >
            GlassCart
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/categories"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Deals
            </Link>
            <Link
              href="/new"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              What's New
            </Link>
            <Link
              href="/popular"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Popular
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-100/80 border border-slate-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-slate-100/80 transition-colors"
          >
            <Heart className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Wishlist</span>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
              3
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-slate-100/80 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Cart</span>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600">
              2
            </Badge>
          </Button>
          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100/80 transition-colors"
            >
              <User className="h-5 w-5 text-slate-700" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-slate-100/80 transition-colors"
          >
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      <div className="mt-3 md:hidden relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-100/80 border border-slate-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
        />
      </div>
    </div>
  </header>;
}

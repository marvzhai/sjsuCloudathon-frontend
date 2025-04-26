"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ItemCard from "./components/ItemCard";

import FeaturedCarousel from "./components/FeaturedCarousel";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"
              >
                Ecomm
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
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg text-slate-700 mb-8">
                Shop the latest trends with our glass-inspired modern shopping
                experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity text-white">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100/80 transition-colors"
                >
                  Explore Categories
                </Button>
              </div>
            </div>
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Product Categories
            </h2>
            <FeaturedCarousel />
          </div>
        </section>
        {/* 
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <CategoryCard
                title="Electronics"
                image="/placeholder.svg?height=200&width=200"
                count={120}
              />
              <CategoryCard
                title="Fashion"
                image="/placeholder.svg?height=200&width=200"
                count={350}
              />
              <CategoryCard
                title="Home & Kitchen"
                image="/placeholder.svg?height=200&width=200"
                count={210}
              />
              <CategoryCard
                title="Beauty"
                image="/placeholder.svg?height=200&width=200"
                count={180}
              />
            </div>
          </div>
        </section> */}

        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              All Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ItemCard
                id="1"
                name="Wireless Headphones"
                price={129.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.8}
                reviewCount={120}
              />
              <ItemCard
                id="2"
                name="Smart Watch Series 7"
                price={299.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.9}
                reviewCount={85}
                badge="New"
              />
              <ItemCard
                id="3"
                name="Portable Bluetooth Speaker"
                price={79.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.7}
                reviewCount={63}
                discount={15}
              />
              <ItemCard
                id="4"
                name="Wireless Charging Pad"
                price={49.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.5}
                reviewCount={42}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">GlassCart</h3>
              <p className="text-slate-400">
                Your modern shopping destination with a unique glass-inspired
                design experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Clearance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Email Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Returns Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2024 GlassCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

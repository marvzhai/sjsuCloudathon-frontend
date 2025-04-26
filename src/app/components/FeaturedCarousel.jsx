"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: "featured1",
    title: "Gaming",
    description: "Discover our new Wireless RBG Headphones with up to 30% off",
    image: "/products/headphones.jpg",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: "featured2",
    title: "",
    description: "Latest electronics with exclusive online discounts",
    image: "/placeholder.svg?height=600&width=1200",
    color: "from-rose-500/20 to-orange-500/20",
  },
  {
    id: "featured3",
    title: "",
    description: "Transform your space with our curated collection",
    image: "/placeholder.svg?height=600&width=1200",
    color: "from-green-500/20 to-teal-500/20",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timeoutRef = useRef(null);

  const next = () => {
    setCurrent((current) =>
      current === featuredProducts.length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrent((current) =>
      current === 0 ? featuredProducts.length - 1 : current - 1
    );
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();

    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        next();
      }, 5000);
    }

    return () => {
      resetTimeout();
    };
  }, [current, autoplay]);

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-md h-[300px] md:h-[400px]"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${featuredProducts[current].color}`}
          ></div>
          <div className="absolute inset-0 flex md:items-center p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
              <div className="z-10">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {featuredProducts[current].title}
                </motion.h3>
                <motion.p
                  className="text-slate-700 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {featuredProducts[current].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity text-white">
                    Shop Now
                  </Button>
                </motion.div>
              </div>
              <div className="hidden md:flex items-center justify-center h-full">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    src={featuredProducts[current].image}
                    alt={featuredProducts[current].title}
                    className="w-full h-full object-cover rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxHeight: "280px" }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-6 bg-purple-600" : "bg-slate-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm z-10"
        onClick={prev}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm z-10"
        onClick={next}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
}

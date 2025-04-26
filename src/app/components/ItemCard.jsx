"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ItemCard({
  id,
  name,
  price,
  image,
  rating,
  reviewCount,
  discount,
  badge,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {badge && (
          <Badge className="absolute top-2 left-2 bg-purple-600">{badge}</Badge>
        )}

        {discount && (
          <Badge className="absolute top-2 left-2 bg-rose-500">
            -{discount}%
          </Badge>
        )}

        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <Button className="bg-white text-slate-900 hover:bg-white/90">
            Quick View
          </Button>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-slate-900 mb-1 truncate">{name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500">
            <Star className="fill-current h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="mx-1 text-slate-300">•</span>
          <span className="text-xs text-slate-500">{reviewCount} reviews</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {discount ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-slate-900">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-slate-100"
            >
              <Heart className="h-4 w-4 text-slate-700" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                "bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity text-white"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

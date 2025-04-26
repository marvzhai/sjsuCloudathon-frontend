"use client";

import { motion } from "framer-motion";
import Link from "next/link";

//import 

export default function CategoryCard({ title, image, count }) {
  return (
    <Link href={`/category/${title.toLowerCase()}`}>
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 aspect-square"
        whileHover={{ y: -5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-rose-500/5 group-hover:opacity-100"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-slate-100/80 backdrop-blur-sm flex items-center justify-center">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="font-medium text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{count} products</p>
        </div>
      </motion.div>
    </Link>
  );
}

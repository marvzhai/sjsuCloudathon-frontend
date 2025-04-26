"use client";

import ItemCard from "@/app/components/ItemCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div>
        <ItemCard
          id={1}
          name="Product 1"
          price={100}
          image="https://via.placeholder.com/150"
          rating={4.5}
          reviewCount={100}
          discount={20}
          badge="New"
        />
      </div>
    </main>
  );
}

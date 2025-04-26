"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-slate-600 mb-6">
                Looks like you haven't added any products to your cart yet.
                Start shopping to fill it up!
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Cart Items ({cart.items.length})
                  </h2>
                </div>

                <div className="divide-y divide-slate-200">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 flex flex-col sm:flex-row items-start gap-4"
                    >
                      <div className="h-24 w-24 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.image || "/placeholder.svg?height=96&width=96"
                          }
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.id}`}
                          className="font-medium text-slate-900 hover:text-purple-600 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>

                        {item.options &&
                          Object.keys(item.options).length > 0 && (
                            <div className="mt-1 text-sm text-slate-500">
                              {Object.entries(item.options).map(
                                ([key, value]) => (
                                  <span key={key} className="mr-4">
                                    {key}:{" "}
                                    <span className="font-medium">{value}</span>
                                  </span>
                                )
                              )}
                            </div>
                          )}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-900">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="mx-2 text-slate-400">×</span>
                            <div className="flex items-center border rounded-md">
                              <button
                                type="button"
                                className="p-1 hover:bg-slate-100"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity,
                                    -1
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </button>
                              <span className="px-2 text-sm">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="p-1 hover:bg-slate-100"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity,
                                    1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </button>
                        </div>

                        <div className="mt-1 text-sm font-medium text-slate-900">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">
                      ${cart.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-medium text-slate-900">
                      ${cart.tax.toFixed(2)}
                    </span>
                  </div>

                  {cart.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">
                        -${cart.discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-slate-900">Total</span>
                    <span className="font-bold text-slate-900">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2 mb-4">
                      <Input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-white/50 backdrop-blur-sm border border-slate-200/50 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        variant="outline"
                        className="border-slate-200 hover:bg-slate-100/80 transition-colors"
                      >
                        {isApplyingCoupon ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </div>

                    {couponError && (
                      <p className="text-sm text-red-500 mb-4">{couponError}</p>
                    )}

                    <Button
                      onClick={() => router.push("/checkout")}
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity h-12"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>

                    <div className="mt-4 text-center text-sm text-slate-500">
                      <p>Secure checkout powered by Stripe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Check,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Badge } from '@/components/ui/badge';
// import { useProduct } from "@/hooks/use-products";
// import { useCart } from "@/hooks/use-cart";
// import { useWishlist } from "@/hooks/use-wishlist";
import ProductCard from '../../components/ItemCard';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { product, isLoading, error } = useProduct(params.id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);

    try {
      const options = {};
      if (selectedColor) options.color = selectedColor;
      if (selectedSize) options.size = selectedSize;

      await addToCart(product, quantity, options);
      setAddedToCart(true);

      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;

    setIsAddingToWishlist(true);

    try {
      await toggleWishlistItem(product.id);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Product not found
        </h1>
        <p className="text-slate-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-rose-500 to-purple-600"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  // Mock related products - in a real app, you would fetch these from the API
  const relatedProducts = [
    {
      id: 'related1',
      name: 'Similar Product 1',
      price: 89.99,
      image: '/placeholder.svg?height=300&width=300',
      rating: 4.5,
      reviewCount: 28,
    },
    {
      id: 'related2',
      name: 'Similar Product 2',
      price: 119.99,
      image: '/placeholder.svg?height=300&width=300',
      rating: 4.7,
      reviewCount: 42,
    },
    {
      id: 'related3',
      name: 'Similar Product 3',
      price: 99.99,
      image: '/placeholder.svg?height=300&width=300',
      rating: 4.6,
      reviewCount: 35,
      discount: 10,
    },
    {
      id: 'related4',
      name: 'Similar Product 4',
      price: 149.99,
      image: '/placeholder.svg?height=300&width=300',
      rating: 4.8,
      reviewCount: 19,
      badge: 'New',
    },
  ];

  // Mock product images - in a real app, these would come from the product data
  const productImages = [
    product.image || '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600&text=Image+2',
    '/placeholder.svg?height=600&width=600&text=Image+3',
    '/placeholder.svg?height=600&width=600&text=Image+4',
  ];

  // Mock reviews - in a real app, these would come from the API
  const reviews = [
    {
      id: 1,
      user: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'This product exceeded my expectations. The quality is excellent and it works perfectly for what I needed.',
    },
    {
      id: 2,
      user: 'Sarah Miller',
      avatar: '/placeholder.svg?height=40&width=40',
      rating: 4,
      date: '1 month ago',
      comment:
        "Great product overall. The only reason I'm giving 4 stars instead of 5 is because of the shipping time.",
    },
    {
      id: 3,
      user: 'Michael Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      rating: 5,
      date: '2 months ago',
      comment:
        'Absolutely love this! Will definitely purchase again and recommend to friends.',
    },
  ];

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to shopping</span>
        </Link>
      </div>

      {/* Product details */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-md"
            >
              <img
                src={productImages[activeImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden bg-white/70 backdrop-blur-sm border transition-all',
                    activeImage === index
                      ? 'border-purple-500 ring-2 ring-purple-500/20'
                      : 'border-slate-200/50 hover:border-slate-300',
                  )}
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            {/* Title and badges */}
            <div>
              {product.badge && (
                <Badge className="mb-2 bg-purple-600">{product.badge}</Badge>
              )}
              {product.discount && (
                <Badge className="mb-2 bg-rose-500">
                  -{product.discount}% OFF
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-slate-900">
                {product.name}
              </h1>

              <div className="flex items-center mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="fill-current h-5 w-5" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="mx-2 text-slate-300">•</span>
                <span className="text-slate-600">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              {product.discount ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600">
              {product.description ||
                'No description available for this product.'}
            </p>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'h-10 px-3 rounded-md border text-sm font-medium transition-all',
                        selectedColor === color
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300',
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'h-10 w-10 rounded-md border text-sm font-medium transition-all',
                        selectedSize === size
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center w-32 h-10 rounded-md border border-slate-200 bg-white">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="flex-1 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 h-full flex items-center justify-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="flex-1 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock status */}
            <div className="flex items-center">
              {product.stock > 0 ? (
                <>
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-700">
                    In stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-red-700">Out of stock</span>
                </>
              )}
            </div>

            {/* Add to cart and wishlist */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock <= 0}
                className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity h-12"
              >
                {isAddingToCart ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : addedToCart ? (
                  <Check className="h-5 w-5 mr-2" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button
                onClick={handleToggleWishlist}
                disabled={isAddingToWishlist}
                variant="outline"
                className="flex-1 border-slate-200 hover:bg-slate-100/80 transition-colors h-12"
              >
                {isAddingToWishlist ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Heart
                    className={cn(
                      'h-5 w-5 mr-2',
                      isInWishlist(product.id) && 'fill-rose-500 text-rose-500',
                    )}
                  />
                )}
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4">
                <h3 className="font-medium text-slate-900 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3 w-3 text-purple-600" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product details tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg h-auto">
            <TabsTrigger value="description" className="py-3">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="py-3">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="py-3">
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>
          <div className="mt-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6">
            <TabsContent value="description">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-slate-600">
                  {product.description ||
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                    tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget
                    ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.`}
                </p>
                <p className="text-slate-600 mt-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">General</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Brand</dt>
                        <dd className="font-medium text-slate-900">
                          GlassCart
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Model</dt>
                        <dd className="font-medium text-slate-900">
                          GC-{product.id}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Release Year</dt>
                        <dd className="font-medium text-slate-900">2024</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Warranty</dt>
                        <dd className="font-medium text-slate-900">1 Year</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">
                      Physical
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Dimensions</dt>
                        <dd className="font-medium text-slate-900">
                          10 x 5 x 2 inches
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Weight</dt>
                        <dd className="font-medium text-slate-900">0.5 kg</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Materials</dt>
                        <dd className="font-medium text-slate-900">
                          Premium Quality
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Colors Available</dt>
                        <dd className="font-medium text-slate-900">
                          {product.colors
                            ? product.colors.join(', ')
                            : 'Various'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity">
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-slate-200 pb-6 last:border-0"
                    >
                      <div className="flex items-start">
                        <img
                          src={review.avatar || '/placeholder.svg'}
                          alt={review.user}
                          className="h-10 w-10 rounded-full mr-4 object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-900">
                              {review.user}
                            </h4>
                            <span className="text-sm text-slate-500">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-4 w-4',
                                  i < review.rating
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-slate-300',
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-slate-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Related products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              discount={product.discount}
              badge={product.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

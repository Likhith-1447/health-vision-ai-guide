
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Star, Leaf, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  benefits: string[];
  image: string;
  inStock: boolean;
}

const AyurvedicProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: 1,
      name: "Ashwagandha Premium Capsules",
      description: "Pure Ashwagandha root extract for stress relief and vitality",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 2847,
      category: "herbs",
      benefits: ["Stress Relief", "Energy Boost", "Immunity"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 2,
      name: "Triphala Churna Organic",
      description: "Traditional blend of three fruits for digestive health",
      price: 399,
      rating: 4.6,
      reviews: 1523,
      category: "digestive",
      benefits: ["Digestive Health", "Detox", "Weight Management"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 3,
      name: "Brahmi Memory Booster",
      description: "Enhance cognitive function and mental clarity naturally",
      price: 749,
      originalPrice: 999,
      rating: 4.7,
      reviews: 981,
      category: "brain",
      benefits: ["Memory Enhancement", "Focus", "Mental Clarity"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 4,
      name: "Turmeric Curcumin Complex",
      description: "High potency turmeric with black pepper for maximum absorption",
      price: 649,
      rating: 4.9,
      reviews: 3247,
      category: "inflammation",
      benefits: ["Anti-inflammatory", "Joint Health", "Immunity"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 5,
      name: "Arjuna Heart Care Tablets",
      description: "Traditional heart tonic for cardiovascular wellness",
      price: 549,
      rating: 4.5,
      reviews: 756,
      category: "heart",
      benefits: ["Heart Health", "Blood Pressure", "Circulation"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 6,
      name: "Neem Blood Purifier",
      description: "Natural blood purifier and skin health supplement",
      price: 429,
      rating: 4.4,
      reviews: 1247,
      category: "skin",
      benefits: ["Blood Purification", "Skin Health", "Detox"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 7,
      name: "Giloy Immunity Booster",
      description: "Powerful immune system support with Guduchi extract",
      price: 599,
      originalPrice: 799,
      rating: 4.6,
      reviews: 1834,
      category: "immunity",
      benefits: ["Immunity", "Fever Relief", "Antioxidant"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 8,
      name: "Amla Vitamin C Natural",
      description: "Rich source of natural Vitamin C for overall health",
      price: 379,
      rating: 4.5,
      reviews: 2156,
      category: "immunity",
      benefits: ["Vitamin C", "Hair Health", "Skin Glow"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 9,
      name: "Moringa Superfood Powder",
      description: "Nutrient-dense superfood for energy and vitality",
      price: 699,
      rating: 4.7,
      reviews: 892,
      category: "superfood",
      benefits: ["Energy", "Nutrition", "Protein"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 10,
      name: "Tulsi Holy Basil Extract",
      description: "Sacred herb for respiratory health and stress relief",
      price: 449,
      originalPrice: 599,
      rating: 4.8,
      reviews: 1567,
      category: "respiratory",
      benefits: ["Respiratory Health", "Stress Relief", "Immunity"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 11,
      name: "Spirulina Blue Green Algae",
      description: "Pure spirulina for detox and energy enhancement",
      price: 899,
      rating: 4.6,
      reviews: 743,
      category: "superfood",
      benefits: ["Detox", "Energy", "Protein"],
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 12,
      name: "Shatavari Women's Health",
      description: "Traditional herb for women's reproductive health",
      price: 649,
      rating: 4.7,
      reviews: 1298,
      category: "women",
      benefits: ["Hormonal Balance", "Women's Health", "Vitality"],
      image: "/placeholder.svg",
      inStock: true
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "herbs", name: "Herbal Supplements" },
    { id: "digestive", name: "Digestive Health" },
    { id: "brain", name: "Brain & Memory" },
    { id: "inflammation", name: "Anti-inflammatory" },
    { id: "heart", name: "Heart Care" },
    { id: "skin", name: "Skin & Beauty" },
    { id: "immunity", name: "Immunity Boost" },
    { id: "superfood", name: "Superfoods" },
    { id: "respiratory", name: "Respiratory" },
    { id: "women", name: "Women's Health" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-green-500 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                AyurGen Store
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Authentic Ayurvedic Products
            </h1>
            <div className="absolute -top-2 -right-8">
              <Heart className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover traditional Ayurvedic medicines and wellness products sourced from trusted manufacturers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-scale-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-emerald-200 focus:border-emerald-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700" 
                    : "hover:border-emerald-400"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2 text-gray-800">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1">
                  {product.benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Leaf className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-50 to-green-50 animate-scale-in">
            <CardContent className="p-6 text-center">
              <Leaf className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">100% Natural</h3>
              <p className="text-sm text-gray-600">Pure Ayurvedic products with no artificial additives</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 animate-scale-in">
            <CardContent className="p-6 text-center">
              <Heart className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Trusted Quality</h3>
              <p className="text-sm text-gray-600">Products from certified and reputable manufacturers</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 animate-scale-in">
            <CardContent className="p-6 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Traditional Wisdom</h3>
              <p className="text-sm text-gray-600">Based on thousands of years of Ayurvedic knowledge</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AyurvedicProducts;

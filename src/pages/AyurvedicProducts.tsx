
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Star, Leaf, Filter } from "lucide-react";
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
      inStock: false
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
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "herbs", name: "Herbal Supplements" },
    { id: "digestive", name: "Digestive Health" },
    { id: "brain", name: "Brain & Memory" },
    { id: "inflammation", name: "Anti-inflammatory" },
    { id: "heart", name: "Heart Care" },
    { id: "skin", name: "Skin & Beauty" }
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-gray-800">Ayurvedic Store</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Authentic Ayurvedic Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover traditional Ayurvedic medicines and wellness products sourced from trusted manufacturers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
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
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
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
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="text-2xl font-bold text-green-600">
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
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AyurvedicProducts;

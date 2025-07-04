
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Sparkles, Award, Shield, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductHeader from "@/components/ProductHeader";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";

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
      description: "Pure Ashwagandha root extract for stress relief and enhanced vitality",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 2847,
      category: "herbs",
      benefits: ["Stress Relief", "Energy Boost", "Immunity Support"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 2,
      name: "Triphala Churna Organic",
      description: "Traditional blend of three fruits for optimal digestive wellness",
      price: 399,
      rating: 4.6,
      reviews: 1523,
      category: "digestive",
      benefits: ["Digestive Health", "Natural Detox", "Weight Management"],
      image: "photo-1556909559-f3a6d1dec6e6",
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
      image: "photo-1556909559-f3a6d1dec6e6",
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
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 5,
      name: "Arjuna Heart Care Tablets",
      description: "Traditional heart tonic for cardiovascular wellness and strength",
      price: 549,
      rating: 4.5,
      reviews: 756,
      category: "heart",
      benefits: ["Heart Health", "Blood Pressure", "Circulation"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 6,
      name: "Neem Blood Purifier",
      description: "Natural blood purifier and comprehensive skin health supplement",
      price: 429,
      rating: 4.4,
      reviews: 1247,
      category: "skin",
      benefits: ["Blood Purification", "Skin Health", "Natural Detox"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 7,
      name: "Giloy Immunity Booster",
      description: "Powerful immune system support with premium Guduchi extract",
      price: 599,
      originalPrice: 799,
      rating: 4.6,
      reviews: 1834,
      category: "immunity",
      benefits: ["Immunity", "Fever Relief", "Antioxidant Power"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 8,
      name: "Amla Vitamin C Natural",
      description: "Rich source of natural Vitamin C for comprehensive health",
      price: 379,
      rating: 4.5,
      reviews: 2156,
      category: "immunity",
      benefits: ["Vitamin C", "Hair Health", "Radiant Skin"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 9,
      name: "Moringa Superfood Powder",
      description: "Nutrient-dense superfood for sustained energy and vitality",
      price: 699,
      rating: 4.7,
      reviews: 892,
      category: "superfood",
      benefits: ["Natural Energy", "Complete Nutrition", "Plant Protein"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 10,
      name: "Tulsi Holy Basil Extract",
      description: "Sacred herb for respiratory health and natural stress relief",
      price: 449,
      originalPrice: 599,
      rating: 4.8,
      reviews: 1567,
      category: "respiratory",
      benefits: ["Respiratory Health", "Stress Relief", "Immunity"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 11,
      name: "Spirulina Blue Green Algae",
      description: "Pure spirulina for comprehensive detox and energy enhancement",
      price: 899,
      rating: 4.6,
      reviews: 743,
      category: "superfood",
      benefits: ["Natural Detox", "Energy Boost", "Complete Protein"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: true
    },
    {
      id: 12,
      name: "Shatavari Women's Health",
      description: "Traditional herb for women's reproductive health and wellness",
      price: 649,
      rating: 4.7,
      reviews: 1298,
      category: "women",
      benefits: ["Hormonal Balance", "Women's Health", "Natural Vitality"],
      image: "photo-1556909559-f3a6d1dec6e6",
      inStock: false
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
      title: "✨ Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      <ProductHeader cartCount={cart.length} />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Enhanced Filters */}
        <div className="mb-12">
          <ProductFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative mb-8">
              <Leaf className="mx-auto h-24 w-24 text-muted-foreground/40" />
              <Sparkles className="absolute top-0 right-1/2 transform translate-x-6 h-6 w-6 text-primary animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4">No products found</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Try adjusting your search terms or browse our categories to discover amazing products
            </p>
          </div>
        )}

        {/* Enhanced Features Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold gradient-text mb-4">Why Choose AyurGen?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the perfect blend of ancient wisdom and modern quality standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 card-interactive bg-gradient-to-br from-card to-secondary/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="mb-6 relative">
                  <Leaf className="mx-auto h-16 w-16 text-primary animate-float" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">100% Natural & Pure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sourced directly from nature with no artificial additives, preservatives, or synthetic compounds
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 card-interactive bg-gradient-to-br from-card to-accent/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="mb-6 relative">
                  <Shield className="mx-auto h-16 w-16 text-blue-600 animate-float" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">Certified Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rigorously tested and certified by trusted authorities for purity, potency, and safety
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 card-interactive bg-gradient-to-br from-card to-purple-50/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="mb-6 relative">
                  <Award className="mx-auto h-16 w-16 text-purple-600 animate-float" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">Ancient Wisdom</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Formulated using time-tested Ayurvedic principles passed down through generations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
            <div className="text-center animate-scale-in">
              <div className="text-2xl font-bold text-primary mb-1">50,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center animate-scale-in stagger-1">
              <div className="text-2xl font-bold text-primary mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center animate-scale-in stagger-2">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center animate-scale-in stagger-3">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Money Back</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyurvedicProducts;

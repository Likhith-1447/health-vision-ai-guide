
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Leaf, Camera, ShoppingCart, Stethoscope, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">HealthWise AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/analysis" className="text-gray-600 hover:text-green-600 transition-colors">
                Medical Analysis
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors">
                Ayurvedic Store
              </Link>
              <Link to="/recommendations" className="text-gray-600 hover:text-green-600 transition-colors">
                AI Health Tips
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            AI-Powered <span className="text-green-600">Health</span> & 
            <span className="text-blue-600"> Wellness</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Analyze medical images with advanced AI, discover authentic Ayurvedic products, 
            and get personalized health recommendations all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analysis">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Camera className="mr-2 h-5 w-5" />
                Start Medical Analysis
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                <Leaf className="mr-2 h-5 w-5" />
                Explore Ayurveda
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Complete Health Companion
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Medical Image Analysis</CardTitle>
                <CardDescription>
                  Upload medical images and get AI-powered analysis with detailed findings and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/analysis">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Analyze Images
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Ayurvedic Products</CardTitle>
                <CardDescription>
                  Discover authentic Ayurvedic medicines, herbs, and wellness products from trusted sources
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/products">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">AI Health Recommendations</CardTitle>
                <CardDescription>
                  Get personalized health tips, diet suggestions, and lifestyle recommendations powered by AI
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/recommendations">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Get Recommendations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Images Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Ayurvedic Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2000+</div>
              <div className="text-gray-600">Health Tips Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">HealthWise AI</span>
              </div>
              <p className="text-gray-400">
                Empowering your health journey with AI and ancient wisdom.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Medical Analysis</li>
                <li>Ayurvedic Products</li>
                <li>Health Recommendations</li>
                <li>Wellness Consultation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Disclaimer</h3>
              <p className="text-gray-400 text-sm">
                Always consult with a qualified healthcare professional before making any medical decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

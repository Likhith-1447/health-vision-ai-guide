
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Leaf, Camera, ShoppingCart, Stethoscope, Heart, Activity, Apple, Dumbbell, Sparkles, Zap, User, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Heart className="h-8 w-8 text-emerald-600" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-blue-500 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                AyurGen
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/analysis" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Medical Analysis
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Ayurvedic Store
              </Link>
              <Link to="/recommendations" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                AI Health Tips
              </Link>
              <Link to="/symptom-checker" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Symptom Checker
              </Link>
              <Link to="/nutrition" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Nutrition AI
              </Link>
              <Link to="/fitness" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Fitness Planner
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 animate-gradient"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-scale-in">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                AyurGen
              </span>
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
              <p className="text-2xl text-gray-600 font-medium">
                AI-Powered Ayurvedic Wellness Platform
              </p>
              <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Harness the power of artificial intelligence combined with ancient Ayurvedic wisdom. 
            Analyze medical images, discover authentic products, get personalized health insights, 
            check symptoms, plan nutrition, and create fitness routines - all in one comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <Link to="/analysis">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Camera className="mr-3 h-6 w-6" />
                Start Medical Analysis
              </Button>
            </Link>
            <Link to="/symptom-checker">
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Stethoscope className="mr-3 h-6 w-6" />
                Check Symptoms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Complete AI Health Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six powerful AI-driven tools to transform your health journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Medical Analysis */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Medical Image Analysis</CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced AI analysis of medical images with detailed findings and professional recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/analysis">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                    Analyze Images
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Symptom Checker */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-red-50 to-red-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI Symptom Checker</CardTitle>
                <CardDescription className="text-gray-600">
                  Intelligent symptom analysis with potential conditions and recommended actions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/symptom-checker">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg">
                    Check Symptoms
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Ayurvedic Products */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Ayurvedic Products</CardTitle>
                <CardDescription className="text-gray-600">
                  Authentic Ayurvedic medicines, herbs, and wellness products from trusted sources
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/products">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Health Recommendations */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI Health Recommendations</CardTitle>
                <CardDescription className="text-gray-600">
                  Personalized health tips, lifestyle suggestions, and wellness guidance powered by AI
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/recommendations">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg">
                    Get Recommendations
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nutrition AI */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 to-orange-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Apple className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI Nutrition Advisor</CardTitle>
                <CardDescription className="text-gray-600">
                  Smart meal planning, dietary recommendations, and nutritional guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/nutrition">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg">
                    Plan Nutrition
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Fitness Planner */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-teal-50 to-teal-100 hover:scale-105 animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Dumbbell className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI Fitness Planner</CardTitle>
                <CardDescription className="text-gray-600">
                  Personalized workout routines, exercise recommendations, and fitness tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/fitness">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg">
                    Create Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold text-emerald-400 mb-2">5000+</div>
              <div className="text-gray-300">Images Analyzed</div>
            </div>
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold text-blue-400 mb-2">1200+</div>
              <div className="text-gray-300">Ayurvedic Products</div>
            </div>
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold text-purple-400 mb-2">10000+</div>
              <div className="text-gray-300">Health Insights Generated</div>
            </div>
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold text-orange-400 mb-2">99%</div>
              <div className="text-gray-300">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  AyurGen
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing healthcare with AI-powered Ayurvedic wisdom for a healthier tomorrow.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">AI Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Medical Analysis</li>
                <li>Symptom Checker</li>
                <li>Health Recommendations</li>
                <li>Nutrition Planning</li>
                <li>Fitness Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Ayurvedic Medicines</li>
                <li>Herbal Supplements</li>
                <li>Wellness Products</li>
                <li>Consultation Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Disclaimer</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AyurGen provides AI-generated insights for informational purposes. Always consult qualified healthcare professionals for medical decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

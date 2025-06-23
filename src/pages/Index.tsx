
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Leaf, 
  Brain, 
  Activity, 
  Apple, 
  Dumbbell,
  Bot,
  Bell,
  Heart,
  Calendar,
  BarChart3,
  Package,
  Crown,
  Globe,
  Star,
  Zap,
  Shield,
  Users,
  Award,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const features = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "AI Medical Analysis",
      description: "Upload medical images for instant AI-powered analysis and professional insights",
      link: "/analysis",
      color: "from-blue-500 to-cyan-500",
      badge: "Advanced AI"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "24/7 Virtual Vaidya",
      description: "Chat with our AI assistant for real-time Ayurvedic health guidance",
      link: "/assistant",
      color: "from-purple-500 to-pink-500",
      badge: "New"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Smart Symptom Checker",
      description: "Describe your symptoms and get AI-powered health assessments with voice support",
      link: "/symptom-checker",
      color: "from-red-500 to-orange-500",
      badge: "Voice Enabled"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Prakriti Assessment",
      description: "Discover your Ayurvedic body constitution with our comprehensive dosha test",
      link: "/prakriti-test",
      color: "from-green-500 to-emerald-500",
      badge: "Traditional"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Health Alerts & Forecasting",
      description: "Get predictions about seasonal illnesses and disease outbreaks in your area",
      link: "/alerts",
      color: "from-yellow-500 to-amber-500",
      badge: "Predictive"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Doctor Consultations",
      description: "Book appointments with certified Ayurvedic practitioners for personalized care",
      link: "/consultation",
      color: "from-indigo-500 to-purple-500",
      badge: "Professional"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Wellness Dashboard",
      description: "Track your health progress with gamified insights and personalized recommendations",
      link: "/dashboard",
      color: "from-teal-500 to-cyan-500",
      badge: "Gamified"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Subscription Plans",
      description: "Monthly wellness packages with auto-delivery and AI-powered follow-ups",
      link: "/subscriptions",
      color: "from-pink-500 to-rose-500",
      badge: "Auto-Delivery"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Ayurvedic Store",
      description: "Discover authentic Ayurvedic products with AI-powered personalized recommendations",
      link: "/products",
      color: "from-emerald-500 to-green-500",
      badge: "Authentic"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Health Recommendations",
      description: "Get personalized wellness insights and lifestyle guidance based on your health data",
      link: "/recommendations",
      color: "from-violet-500 to-purple-500",
      badge: "Personalized"
    },
    {
      icon: <Apple className="h-8 w-8" />,
      title: "Nutrition AI Advisor",
      description: "Smart meal planning and dietary guidance tailored to your constitution",
      link: "/nutrition",
      color: "from-orange-500 to-red-500",
      badge: "Smart Planning"
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "AI Fitness Planner",
      description: "Customized workout routines and fitness tracking integrated with wellness goals",
      link: "/fitness",
      color: "from-blue-500 to-indigo-500",
      badge: "Customized"
    }
  ];

  const stats = [
    { number: "25,000+", label: "Happy Users", icon: <Users className="h-6 w-6" /> },
    { number: "50,000+", label: "AI Consultations", icon: <Bot className="h-6 w-6" /> },
    { number: "1,500+", label: "Authentic Products", icon: <Leaf className="h-6 w-6" /> },
    { number: "95%", label: "User Satisfaction", icon: <Star className="h-6 w-6" /> }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      title: "Instant AI Analysis",
      description: "Get immediate health insights powered by advanced AI"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Privacy Protected",
      description: "Your health data is secure and never shared"
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Certified Practitioners",
      description: "Connect with qualified Ayurvedic doctors"
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Multilingual Support",
      description: "Available in 10+ Indian languages"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Enhanced Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Leaf className="h-8 w-8 text-emerald-600" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-green-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  AyurGen
                </h1>
                <p className="text-xs text-gray-600">AI-Powered Ayurvedic Wellness</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/subscriptions">
                <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 hover:scale-105 transition-all">
                  <Crown className="mr-2 h-4 w-4" />
                  Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 px-4 py-2 hover:scale-105 transition-transform">
              <Sparkles className="mr-2 h-4 w-4" />
              Revolutionary AI + Ancient Wisdom
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Your Complete<br />Ayurvedic Wellness<br />Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect fusion of cutting-edge AI technology and 5000-year-old Ayurvedic wisdom. 
              Get personalized health insights, connect with certified practitioners, and transform your wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assistant">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 hover:scale-105 transition-all text-lg px-8 py-6 shadow-lg">
                  <Bot className="mr-2 h-5 w-5" />
                  Start AI Consultation
                </Button>
              </Link>
              <Link to="/prakriti-test">
                <Button variant="outline" size="lg" className="hover:scale-105 transition-all text-lg px-8 py-6 border-2 border-emerald-200 hover:border-emerald-400">
                  <Heart className="mr-2 h-5 w-5" />
                  Discover Your Dosha
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-emerald-600">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Complete Wellness Ecosystem
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From AI-powered health analysis to traditional Ayurvedic consultations - everything you need for holistic wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-gray-50 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} p-4 text-white mb-4 hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AyurGen?</h2>
            <p className="text-lg text-gray-600">Experience the future of personalized healthcare</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who have already discovered the power of AI-enhanced Ayurvedic wellness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assistant">
                <Button size="lg" variant="secondary" className="hover:scale-105 transition-all text-lg px-8 py-6 bg-white text-emerald-600 hover:bg-gray-100">
                  <Bot className="mr-2 h-5 w-5" />
                  Start Free AI Consultation
                </Button>
              </Link>
              <Link to="/subscriptions">
                <Button size="lg" variant="outline" className="hover:scale-105 transition-all text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-emerald-600">
                  <Crown className="mr-2 h-5 w-5" />
                  Explore Premium Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">AyurGen</span>
            </div>
            <p className="text-gray-400 mb-6">
              Bridging ancient Ayurvedic wisdom with modern AI technology for complete wellness
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 AyurGen. All rights reserved.</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Brain, 
  Heart, 
  Stethoscope, 
  Pill, 
  Users, 
  Activity,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Zap
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Medical Analysis",
      description: "Upload medical images for instant AI-powered analysis with professional accuracy",
      href: "/analysis",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Stethoscope,
      title: "Symptom Checker",
      description: "Get personalized health insights based on your symptoms",
      href: "/symptom-checker",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "AI Health Assistant",
      description: "Chat with our AI for personalized health guidance and recommendations",
      href: "/assistant",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Health Recommendations",
      description: "Receive tailored wellness advice based on Ayurvedic principles",
      href: "/recommendations",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Pill,
      title: "Ayurvedic Products",
      description: "Discover natural remedies and herbs for holistic healing",
      href: "/products",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with certified Ayurvedic practitioners for personalized care",
      href: "/consultation",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Analyses Done", icon: Camera },
    { number: "95%", label: "Accuracy Rate", icon: Star },
    { number: "24/7", label: "AI Support", icon: Brain }
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                AyurGen AI Platform
              </h1>
              <p className="text-sm text-muted-foreground">
                Your intelligent health companion
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-8 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                AyurGen AI
              </h1>
              <div className="absolute -top-4 -right-4 animate-bounce">
                <Sparkles className="h-12 w-12 text-primary/60 animate-pulse" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Experience the future of healthcare with AI-powered medical analysis, 
              personalized Ayurvedic guidance, and intelligent health insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/analysis" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <div className="text-center mb-12 space-y-4 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground">
                Comprehensive Health Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover our suite of AI-powered tools designed to revolutionize your healthcare experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={feature.title} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in hover-lift cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors relative z-10">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground relative z-10">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Link to={feature.href} className="flex items-center justify-center">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is protected with enterprise-grade security and complete privacy."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get instant results with our optimized AI models trained on medical expertise."
              },
              {
                icon: Star,
                title: "Clinically Validated",
                description: "Our AI recommendations are backed by scientific research and medical validation."
              }
            ].map((indicator, index) => (
              <Card key={indicator.title} className="text-center border-0 shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <indicator.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{indicator.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{indicator.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-12 border border-primary/20 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Health Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust AyurGen AI for their healthcare needs. 
              Start your personalized wellness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/analysis" className="flex items-center">
                  Start Analysis
                  <Camera className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Link to="/consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

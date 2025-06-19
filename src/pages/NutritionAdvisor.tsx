import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Apple, CheckCircle, Sparkles, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AIResponseDisplay from "@/components/AIResponseDisplay";

const NutritionAdvisor = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goals, setGoals] = useState("");
  const [dietary, setDietary] = useState("");
  const [allergies, setAllergies] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyBkQd_1n4AxdCssdQkMAfpdY-7Ey0r5SB0";

  const generateNutritionPlan = async () => {
    if (!age || !weight || !height) {
      toast({
        title: "Missing Information",
        description: "Please fill in age, weight, and height.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `
You are a certified nutritionist and dietitian. Create a comprehensive nutrition plan with clear structure:

**Personal Details:**
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Activity Level: ${activityLevel || 'Not specified'}
- Goals: ${goals || 'General health'}
- Dietary Preferences: ${dietary || 'None specified'}
- Allergies/Restrictions: ${allergies || 'None'}

Please provide a structured response with the following sections:

1. **Health Assessment**: BMI calculation and health status overview
2. **Daily Caloric Needs**: Detailed calorie requirements with breakdown
3. **Macronutrient Distribution**: Proteins, carbohydrates, and fats with percentages
4. **7-Day Meal Plan**: Daily meal suggestions with Ayurvedic principles
5. **Food Recommendations**: Specific foods with portions and benefits
6. **Foods to Avoid**: Items to limit or eliminate
7. **Hydration Guidelines**: Water intake and timing recommendations
8. **Supplement Suggestions**: If needed, with dosages
9. **Meal Timing Strategy**: Optimal eating schedule
10. **Preparation Tips**: Practical advice for meal prep

Include traditional Ayurvedic foods and principles where appropriate. Make recommendations practical and culturally relevant.

Format your response with clear numbered sections and detailed explanations for easy implementation.
      `;

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const plan = result.candidates[0].content.parts[0].text;
        setRecommendations(plan);
        toast({
          title: "Nutrition Plan Ready",
          description: "Your personalized nutrition plan has been generated.",
        });
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate nutrition plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Apple className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold text-gray-800">AyurGen - Nutrition Advisor</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative">
              <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AI Nutrition Planning
              </h1>
              <div className="absolute -top-4 -right-4">
                <Zap className="h-8 w-8 text-orange-400 animate-pulse" />
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get structured personalized nutrition plans combining modern science with Ayurvedic wisdom
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Apple className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Tell us about yourself for personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="cm"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <select
                    id="activity"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (desk job, no exercise)</option>
                    <option value="light">Light (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                    <option value="active">Active (hard exercise 6-7 days/week)</option>
                    <option value="very-active">Very Active (physical job + exercise)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Health Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="e.g., weight loss, muscle gain, improved energy, better digestion..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Preferences</Label>
                  <Input
                    id="dietary"
                    placeholder="e.g., vegetarian, vegan, keto, low-carb..."
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Food Allergies/Restrictions</Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., nuts, dairy, gluten..."
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={generateNutritionPlan} 
                  disabled={!age || !weight || !height || loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Your Plan...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-5 w-5" />
                      Generate Nutrition Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="lg:col-span-1">
              {recommendations ? (
                <AIResponseDisplay response={recommendations} type="nutrition" />
              ) : (
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      Your Nutrition Plan
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Personalized nutrition recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-16">
                      <div className="animate-pulse mb-6">
                        <Apple className="mx-auto h-16 w-16 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Ready for Your Nutrition Plan?
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Fill in your details to get a structured personalized nutrition plan with Ayurvedic principles
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-6 text-center">
                <Target className="mx-auto h-12 w-12 text-orange-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Personalized Plans</h3>
                <p className="text-sm text-gray-600">Customized based on your goals and preferences</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <Sparkles className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Ayurvedic Wisdom</h3>
                <p className="text-sm text-gray-600">Traditional principles combined with modern nutrition</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Easy to Follow</h3>
                <p className="text-sm text-gray-600">Practical meal plans with detailed guidance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionAdvisor;

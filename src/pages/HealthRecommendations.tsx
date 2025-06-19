
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Utensils, Activity, Moon, AlertTriangle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const HealthRecommendations = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    healthGoals: "",
    currentConditions: "",
    dietaryRestrictions: ""
  });
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const generateRecommendations = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to generate recommendations.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.age || !formData.gender || !formData.healthGoals) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least age, gender, and health goals.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `
As a health and wellness expert, provide personalized recommendations based on this user profile:

Age: ${formData.age}
Gender: ${formData.gender}
Height: ${formData.height || 'Not specified'}
Weight: ${formData.weight || 'Not specified'}
Activity Level: ${formData.activityLevel || 'Not specified'}
Health Goals: ${formData.healthGoals}
Current Health Conditions: ${formData.currentConditions || 'None specified'}
Dietary Restrictions: ${formData.dietaryRestrictions || 'None specified'}

Please provide detailed recommendations in the following categories:
1. Diet and Nutrition
2. Exercise and Physical Activity
3. Sleep and Recovery
4. Stress Management
5. Lifestyle Modifications
6. Ayurvedic Remedies (if applicable)

Format your response as a structured JSON with the following format:
{
  "diet": {
    "title": "Diet and Nutrition",
    "recommendations": ["recommendation 1", "recommendation 2", ...],
    "foods_to_include": ["food 1", "food 2", ...],
    "foods_to_avoid": ["food 1", "food 2", ...]
  },
  "exercise": {
    "title": "Exercise and Physical Activity",
    "recommendations": ["recommendation 1", "recommendation 2", ...],
    "suggested_activities": ["activity 1", "activity 2", ...]
  },
  "sleep": {
    "title": "Sleep and Recovery",
    "recommendations": ["recommendation 1", "recommendation 2", ...]
  },
  "stress": {
    "title": "Stress Management",
    "recommendations": ["recommendation 1", "recommendation 2", ...],
    "techniques": ["technique 1", "technique 2", ...]
  },
  "lifestyle": {
    "title": "Lifestyle Modifications",
    "recommendations": ["recommendation 1", "recommendation 2", ...]
  },
  "ayurveda": {
    "title": "Ayurvedic Remedies",
    "recommendations": ["recommendation 1", "recommendation 2", ...],
    "herbs": ["herb 1", "herb 2", ...]
  }
}

Always include a disclaimer about consulting healthcare professionals.
      `;

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
        let responseText = result.candidates[0].content.parts[0].text;
        
        // Try to extract JSON from the response
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const recommendations = JSON.parse(jsonMatch[0]);
            setRecommendations(recommendations);
          } else {
            // Fallback to plain text
            setRecommendations({ raw: responseText });
          }
        } catch {
          setRecommendations({ raw: responseText });
        }

        toast({
          title: "Recommendations Generated",
          description: "Your personalized health recommendations are ready!",
        });
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Recommendation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate recommendations. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons = {
    diet: Utensils,
    exercise: Activity,
    sleep: Moon,
    stress: Brain,
    lifestyle: Heart,
    ayurveda: Activity
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">AI Health Recommendations</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Personalized Health Recommendations
            </h1>
            <p className="text-lg text-gray-600">
              Get AI-powered, personalized health and wellness recommendations based on your profile
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              {/* API Key */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                    Gemini API Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* User Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Health Profile</CardTitle>
                  <CardDescription>
                    Fill in your details for personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="170"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                        <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                        <SelectItem value="very_active">Very Active (2x/day or intense)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goals">Health Goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g., weight loss, muscle gain, stress reduction, better sleep..."
                      value={formData.healthGoals}
                      onChange={(e) => setFormData({...formData, healthGoals: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="conditions">Current Health Conditions (Optional)</Label>
                    <Textarea
                      id="conditions"
                      placeholder="e.g., diabetes, hypertension, arthritis..."
                      value={formData.currentConditions}
                      onChange={(e) => setFormData({...formData, currentConditions: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="restrictions">Dietary Restrictions (Optional)</Label>
                    <Textarea
                      id="restrictions"
                      placeholder="e.g., vegetarian, vegan, allergies, gluten-free..."
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={generateRecommendations}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Recommendations...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Recommendations
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations Display */}
            <div className="space-y-6">
              {recommendations ? (
                recommendations.raw ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Personalized Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm text-gray-700">
                          {recommendations.raw}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(recommendations).map(([key, category]: [string, any]) => {
                      const IconComponent = categoryIcons[key as keyof typeof categoryIcons] || Heart;
                      return (
                        <Card key={key}>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <IconComponent className="mr-2 h-5 w-5 text-purple-600" />
                              {category.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {category.recommendations && (
                              <div>
                                <h4 className="font-medium mb-2">Recommendations:</h4>
                                <ul className="space-y-1 text-sm text-gray-700">
                                  {category.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {category.foods_to_include && (
                              <div>
                                <h4 className="font-medium mb-2">Foods to Include:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {category.foods_to_include.map((food: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {food}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {category.foods_to_avoid && (
                              <div>
                                <h4 className="font-medium mb-2">Foods to Limit:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {category.foods_to_avoid.map((food: string, idx: number) => (
                                    <Badge key={idx} variant="destructive" className="text-xs">
                                      {food}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {category.suggested_activities && (
                              <div>
                                <h4 className="font-medium mb-2">Suggested Activities:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {category.suggested_activities.map((activity: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {activity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {category.techniques && (
                              <div>
                                <h4 className="font-medium mb-2">Techniques:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {category.techniques.map((technique: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {technique}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {category.herbs && (
                              <div>
                                <h4 className="font-medium mb-2">Recommended Herbs:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {category.herbs.map((herb: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                      {herb}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No recommendations yet
                    </h3>
                    <p className="text-gray-500">
                      Fill in your profile and click "Generate Recommendations" to get started
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendations;

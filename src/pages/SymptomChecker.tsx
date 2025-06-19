
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Activity, AlertTriangle, CheckCircle, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyBkQd_1n4AxdCssdQkMAfpdY-7Ey0r5SB0";

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe your symptoms.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `
You are an experienced medical professional providing preliminary symptom analysis. 
Based on the following information, provide a detailed assessment:

Symptoms: ${symptoms}
Age: ${age || 'Not specified'}
Gender: ${gender || 'Not specified'}  
Duration: ${duration || 'Not specified'}

Please provide:
1. Possible conditions (ranked by likelihood)
2. Recommended immediate actions
3. When to seek medical attention
4. Self-care suggestions
5. Warning signs to watch for

IMPORTANT: Always emphasize that this is preliminary analysis only and professional medical consultation is required for proper diagnosis and treatment.

Include disclaimer: "This is AI-generated preliminary analysis. Consult a healthcare professional for proper diagnosis and treatment."
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
        const analysisText = result.candidates[0].content.parts[0].text;
        setAnalysis(analysisText);
        toast({
          title: "Analysis Complete",
          description: "Symptom analysis has been generated successfully.",
        });
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Activity className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-gray-800">AI Symptom Checker</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative">
              <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Symptom Analysis
              </h1>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="h-8 w-8 text-red-400 animate-pulse" />
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get preliminary analysis of your symptoms with AI-powered insights and recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Symptom Information
                </CardTitle>
                <CardDescription className="text-red-100">
                  Please provide detailed information about your symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms Description *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms in detail (e.g., headache, fever, nausea, duration, severity...)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration of Symptoms</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 2 days, 1 week, since morning"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={analyzeSymptoms} 
                  disabled={!symptoms.trim() || loading}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-5 w-5" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-green-100">
                  AI-generated symptom analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {analysis ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm text-gray-700 bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-lg border-l-4 border-green-400 shadow-inner">
                        {analysis}
                      </div>
                    </div>
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Medical Disclaimer:</strong> This is AI-generated preliminary analysis only. 
                        Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="animate-pulse mb-6">
                      <Activity className="mx-auto h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Ready to Analyze Your Symptoms?
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Describe your symptoms and get AI-powered preliminary analysis with actionable recommendations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Emergency Alert */}
          <Alert className="mt-12 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Emergency Warning:</strong> If you're experiencing severe symptoms like chest pain, difficulty breathing, 
              severe bleeding, loss of consciousness, or other emergency situations, call emergency services immediately or go to the nearest emergency room.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;

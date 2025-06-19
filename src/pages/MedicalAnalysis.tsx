import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, Camera, AlertTriangle, CheckCircle, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AIResponseDisplay from "@/components/AIResponseDisplay";

const MedicalAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyBkQd_1n4AxdCssdQkMAfpdY-7Ey0r5SB0";

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast({
        title: "Missing Image",
        description: "Please select a medical image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Convert image to base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // Remove data:image/jpeg;base64, prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const samplePrompt = `
You are a medical practitioner and an expert in analyzing medical-related images working for a reputed hospital. 
You will be provided with images and you need to identify the anomalies, any disease or health issues.

Please structure your response with clear sections:

1. **Image Assessment**: Describe what you see in the image
2. **Findings**: List any abnormalities or notable features
3. **Possible Conditions**: Suggest potential diagnoses (ranked by likelihood)
4. **Recommendations**: Immediate actions and next steps
5. **Warning Signs**: Red flags to watch for
6. **Follow-up Care**: When to seek medical attention

Format your response with numbered sections and clear headings for easy reading.

You only need to respond if the image is related to a human body and health issues.

Always include: 'This is AI-generated preliminary analysis. Consult with a healthcare professional for proper diagnosis and treatment.'

If the image is unclear, say: 'Unable to determine based on the provided image.'
      `;

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const payload = {
        contents: [
          {
            parts: [
              { text: samplePrompt },
              {
                inline_data: {
                  mime_type: selectedFile.type,
                  data: base64Image
                }
              }
            ]
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
          description: "Medical image analysis has been generated successfully.",
        });
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setAnalysis(""); // Clear previous analysis
      } else {
        toast({
          title: "Invalid File",
          description: "Please select a valid image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Camera className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">AyurGen - Medical Analysis</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with animations */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative">
              <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AI-Powered Medical Image Analysis
              </h1>
              <div className="absolute -top-4 -right-4">
                <Zap className="h-8 w-8 text-blue-400 animate-pulse" />
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Upload medical images for advanced AI-powered analysis with structured, professional recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Medical Image
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Select a medical image for AI analysis (X-rays, scans, skin conditions, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-br from-blue-50 to-cyan-50">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="relative">
                        <Upload className="mx-auto h-16 w-16 text-blue-400" />
                        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-cyan-400 animate-pulse" />
                      </div>
                      <div className="text-lg font-medium text-gray-700">
                        Click to upload an image or drag and drop
                      </div>
                      <div className="text-sm text-gray-500">
                        PNG, JPG, JPEG up to 10MB
                      </div>
                    </div>
                  </Label>
                </div>

                {selectedFile && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span className="font-medium">File selected: {selectedFile.name}</span>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border-2 border-blue-200">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected medical image"
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  onClick={analyzeImage} 
                  disabled={!selectedFile || loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Image with AI...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-5 w-5" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="lg:col-span-1">
              {analysis ? (
                <AIResponseDisplay response={analysis} type="medical" />
              ) : (
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analysis Results
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      AI-generated medical image analysis and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-16">
                      <div className="animate-pulse mb-6">
                        <Camera className="mx-auto h-16 w-16 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Ready to Analyze Your Medical Image?
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Upload a medical image and click "Analyze with AI" to get detailed insights with structured formatting
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 text-center">
                <Zap className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Get results in seconds with our optimized AI models</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Highly Accurate</h3>
                <p className="text-sm text-gray-600">Advanced AI trained on medical datasets</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <Sparkles className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Detailed Insights</h3>
                <p className="text-sm text-gray-600">Comprehensive analysis with actionable recommendations</p>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Alert className="mt-12 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Important Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read from this AI analysis.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default MedicalAnalysis;

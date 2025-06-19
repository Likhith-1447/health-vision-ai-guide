
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, Camera, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MedicalAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const analyzeImage = async () => {
    if (!selectedFile || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please select an image and enter your Gemini API key.",
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

Generate the result in a detailed manner. Write all the findings, next steps, recommendations, etc. 

You only need to respond if the image is related to a human body and health issues.

Always write a disclaimer saying: 'Consult with a Doctor before making any decisions.'

If the image is unclear, say: 'Unable to determine based on the provided image.'
      `;

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
        description: "Failed to analyze the image. Please check your API key and try again.",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Medical Analysis</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              AI-Powered Medical Image Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Upload medical images for AI-powered analysis and recommendations
            </p>
          </div>

          {/* API Key Input */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Gemini API Key Required
              </CardTitle>
              <CardDescription>
                Enter your Google Gemini API key to enable medical image analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Gemini API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Get your API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Medical Image
                </CardTitle>
                <CardDescription>
                  Select a medical image for AI analysis (X-rays, scans, skin conditions, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        Click to upload an image or drag and drop
                      </div>
                      <div className="text-xs text-gray-400">
                        PNG, JPG, JPEG up to 10MB
                      </div>
                    </div>
                  </Label>
                </div>

                {selectedFile && (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      File selected: {selectedFile.name}
                    </div>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected medical image"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <Button 
                  onClick={analyzeImage} 
                  disabled={!selectedFile || !apiKey || loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  AI-generated medical image analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <div className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {analysis}
                      </div>
                    </div>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This analysis is AI-generated and should not replace professional medical advice. 
                        Always consult with a qualified healthcare provider.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Upload an image and click "Analyze Image" to see results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Alert className="mt-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default MedicalAnalysis;

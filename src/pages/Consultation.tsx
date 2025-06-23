
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, Star, Award, MapPin, Phone, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  location: string;
  languages: string[];
  availability: string;
  consultationFee: number;
  image: string;
  qualifications: string[];
  expertise: string[];
}

const Consultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "video",
    preferredDate: "",
    preferredTime: "",
    symptoms: ""
  });
  const { toast } = useToast();

  const doctors: Doctor[] = [
    {
      id: '1',
      name: "Dr. Priya Sharma",
      specialization: "Panchakarma & Detox Specialist",
      experience: 15,
      rating: 4.9,
      location: "Bangalore, Karnataka",
      languages: ["English", "Hindi", "Kannada"],
      availability: "Mon-Sat, 9 AM - 6 PM",
      consultationFee: 800,
      image: "/placeholder.svg",
      qualifications: ["BAMS", "MD (Ayurveda)", "PhD in Panchakarma"],
      expertise: ["Chronic Pain", "Digestive Disorders", "Stress Management", "Weight Management"]
    },
    {
      id: '2',
      name: "Dr. Rajesh Kumar",
      specialization: "Ayurvedic Cardiologist",
      experience: 20,
      rating: 4.8,
      location: "Delhi, NCR",
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Mon-Fri, 10 AM - 7 PM",
      consultationFee: 1200,
      image: "/placeholder.svg",
      qualifications: ["BAMS", "MD (Kayachikitsa)", "Fellowship in Ayurvedic Cardiology"],
      expertise: ["Heart Health", "Hypertension", "Cholesterol Management", "Lifestyle Disorders"]
    },
    {
      id: '3',
      name: "Dr. Meera Patel",
      specialization: "Women's Health & Fertility",
      experience: 12,
      rating: 4.9,
      location: "Mumbai, Maharashtra",
      languages: ["English", "Hindi", "Marathi", "Gujarati"],
      availability: "Tue-Sun, 11 AM - 8 PM",
      consultationFee: 900,
      image: "/placeholder.svg",
      qualifications: ["BAMS", "MD (Prasuti Tantra)", "Diploma in Yoga"],
      expertise: ["PCOS/PCOD", "Fertility Issues", "Menstrual Disorders", "Pregnancy Care"]
    },
    {
      id: '4',
      name: "Dr. Anand Krishnan",
      specialization: "Ayurvedic Dermatologist",
      experience: 18,
      rating: 4.7,
      location: "Chennai, Tamil Nadu",
      languages: ["English", "Tamil", "Telugu", "Hindi"],
      availability: "Mon-Sat, 8 AM - 5 PM",
      consultationFee: 700,
      image: "/placeholder.svg",
      qualifications: ["BAMS", "MD (Shalya Tantra)", "PG Diploma in Dermatology"],
      expertise: ["Skin Disorders", "Hair Loss", "Psoriasis", "Eczema"]
    }
  ];

  const handleBooking = () => {
    if (!selectedDoctor) return;
    
    // Validate form
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.preferredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your consultation with ${selectedDoctor.name} has been scheduled. You will receive a confirmation email shortly.`,
    });

    // Reset form
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      consultationType: "video",
      preferredDate: "",
      preferredTime: "",
      symptoms: ""
    });
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Video className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">AyurGen - Doctor Consultation</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Consult Certified Ayurvedic Doctors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with experienced Ayurvedic practitioners for personalized consultations and treatment plans
            </p>
          </div>

          {selectedDoctor ? (
            /* Booking Form */
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle>Book Consultation</CardTitle>
                  <CardDescription className="text-purple-100">
                    Schedule your appointment with {selectedDoctor.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Consultation Type</Label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="video"
                          checked={bookingForm.consultationType === "video"}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, consultationType: e.target.value }))}
                        />
                        <Video className="h-4 w-4" />
                        <span>Video Call</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="chat"
                          checked={bookingForm.consultationType === "chat"}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, consultationType: e.target.value }))}
                        />
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingForm.preferredTime}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Symptoms/Concerns</Label>
                    <Textarea
                      id="symptoms"
                      value={bookingForm.symptoms}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, symptoms: e.target.value }))}
                      placeholder="Briefly describe your health concerns..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button onClick={() => setSelectedDoctor(null)} variant="outline" className="flex-1">
                      Back to Doctors
                    </Button>
                    <Button onClick={handleBooking} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Doctor Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Consultation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                      <AvatarFallback className="bg-purple-100 text-purple-700 text-lg">
                        {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedDoctor.name}</h3>
                      <p className="text-gray-600">{selectedDoctor.specialization}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                        <span className="text-sm text-gray-500">• {selectedDoctor.experience} years exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="font-semibold">₹{selectedDoctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee:</span>
                      <span className="font-semibold">₹50</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total Amount:</span>
                      <span>₹{selectedDoctor.consultationFee + 50}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Expertise Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.expertise.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Doctor List */
            <div className="grid md:grid-cols-2 gap-8">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                        <p className="text-purple-600 font-medium mb-2">{doctor.specialization}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>{doctor.experience} years</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{doctor.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Qualifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.qualifications.map((qual, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.slice(0, 3).map((area, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                              {area}
                            </Badge>
                          ))}
                          {doctor.expertise.length > 3 && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              +{doctor.expertise.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.availability}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-gray-800">₹{doctor.consultationFee}</span>
                          <span>/consultation</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Languages: </span>
                        <span className="text-sm font-medium">{doctor.languages.join(', ')}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedDoctor(doctor)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6 text-center">
                <Video className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Secure Video Consultations</h3>
                <p className="text-sm text-gray-600">HIPAA-compliant video calls with end-to-end encryption</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Digital Prescriptions</h3>
                <p className="text-sm text-gray-600">Receive and store digital prescriptions securely</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 text-center">
                <Phone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Round-the-clock technical and medical support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

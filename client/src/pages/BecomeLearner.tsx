import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import WaveDivider from "@/components/WaveDivider";
import { trpc } from "@/lib/trpc";

export default function BecomeLearner() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    highestQualification: "",
    programInterest: "",
    employmentStatus: "",
    computerAccess: "",
    internetAccess: "",
    motivation: "",
    hearAboutUs: "",
  });

  const submitMutation = trpc.learnerApplications.submit.useMutation({
    onSuccess: () => {
      toast.success("Application submitted successfully! We'll contact you within 2-3 business days.");
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        idNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        highestQualification: "",
        programInterest: "",
        employmentStatus: "",
        computerAccess: "",
        internetAccess: "",
        motivation: "",
        hearAboutUs: "",
      });
    },
    onError: (error) => {
      toast.error(`Failed to submit application: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const benefits = [
    "Industry-recognized certifications",
    "Hands-on practical training",
    "Job placement assistance",
    "Experienced instructors",
    "Flexible learning schedules",
    "Modern training facilities",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Background (same as About style) */}
      <section
        className="relative h-[400px] md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/about-hero.jpg')" }} // or /learner-hero.jpg
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-secondary/80" />

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10">
          <GraduationCap className="w-20 h-20 mx-auto mb-6 text-secondary-foreground" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary-foreground">
            Become a Learner
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 text-secondary-foreground">
            Start your journey to a successful career in technology
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Program Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Application Form</CardTitle>
                  <p className="text-muted-foreground">
                    Complete the form below to apply for our training programs. Fields marked with * are required.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="idNumber" className="block text-sm font-medium mb-2">
                            ID Number *
                          </label>
                          <Input
                            id="idNumber"
                            name="idNumber"
                            type="text"
                            required
                            value={formData.idNumber}
                            onChange={handleChange}
                            placeholder="YYMMDDXXXXXXX"
                            maxLength={13}
                          />
                        </div>
                        <div>
                          <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
                            Date of Birth *
                          </label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium mb-2">
                            Gender *
                          </label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) => handleSelectChange("gender", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+27 XX XXX XXXX"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium mb-2">
                            Street Address *
                          </label>
                          <Input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-2">
                            City *
                          </label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Johannesburg"
                          />
                        </div>
                        <div>
                          <label htmlFor="province" className="block text-sm font-medium mb-2">
                            Province *
                          </label>
                          <Select
                            value={formData.province}
                            onValueChange={(value) => handleSelectChange("province", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Gauteng">Gauteng</SelectItem>
                              <SelectItem value="Western Cape">Western Cape</SelectItem>
                              <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                              <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                              <SelectItem value="Free State">Free State</SelectItem>
                              <SelectItem value="Limpopo">Limpopo</SelectItem>
                              <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                              <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                              <SelectItem value="North West">North West</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                            Postal Code *
                          </label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            required
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="2000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education & Program */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Education & Program Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="highestQualification" className="block text-sm font-medium mb-2">
                            Highest Qualification *
                          </label>
                          <Select
                            value={formData.highestQualification}
                            onValueChange={(value) => handleSelectChange("highestQualification", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Grade 10">Grade 10</SelectItem>
                              <SelectItem value="Grade 11">Grade 11</SelectItem>
                              <SelectItem value="Matric">Matric (Grade 12)</SelectItem>
                              <SelectItem value="Certificate">Certificate</SelectItem>
                              <SelectItem value="Diploma">Diploma</SelectItem>
                              <SelectItem value="Degree">Degree</SelectItem>
                              <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="programInterest" className="block text-sm font-medium mb-2">
                            Program of Interest *
                          </label>
                          <Select
                            value={formData.programInterest}
                            onValueChange={(value) => handleSelectChange("programInterest", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT Systems Support">IT Systems Support</SelectItem>
                              <SelectItem value="IT Systems Development">IT Systems Development</SelectItem>
                              <SelectItem value="IT Network Engineering">IT Network Engineering</SelectItem>
                              <SelectItem value="Business Administration">Business Administration</SelectItem>
                              <SelectItem value="Data Science">Data Science</SelectItem>
                              <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="employmentStatus" className="block text-sm font-medium mb-2">
                            Employment Status *
                          </label>
                          <Select
                            value={formData.employmentStatus}
                            onValueChange={(value) => handleSelectChange("employmentStatus", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Employed">Employed</SelectItem>
                              <SelectItem value="Unemployed">Unemployed</SelectItem>
                              <SelectItem value="Self-employed">Self-employed</SelectItem>
                              <SelectItem value="Student">Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Technical Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Technical Requirements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="computerAccess" className="block text-sm font-medium mb-2">
                            Do you have access to a computer? *
                          </label>
                          <Select
                            value={formData.computerAccess}
                            onValueChange={(value) => handleSelectChange("computerAccess", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Limited">Limited Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="internetAccess" className="block text-sm font-medium mb-2">
                            Do you have internet access? *
                          </label>
                          <Select
                            value={formData.internetAccess}
                            onValueChange={(value) => handleSelectChange("internetAccess", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Limited">Limited Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium mb-2">
                        Why do you want to join this program? *
                      </label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        required
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Tell us about your motivation, career goals, and what you hope to achieve..."
                        rows={5}
                      />
                    </div>

                    <div>
                      <label htmlFor="hearAboutUs" className="block text-sm font-medium mb-2">
                        How did you hear about us?
                      </label>
                      <Select
                        value={formData.hearAboutUs}
                        onValueChange={(value) => handleSelectChange("hearAboutUs", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Friend/Family">Friend/Family</SelectItem>
                          <SelectItem value="Google Search">Google Search</SelectItem>
                          <SelectItem value="Advertisement">Advertisement</SelectItem>
                          <SelectItem value="School/University">School/University</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to our terms and conditions. We'll contact you within 2-3 business days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

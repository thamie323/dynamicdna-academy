import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import WaveDivider from "@/components/WaveDivider";
import { trpc } from "@/lib/trpc";

export default function BecomeClient() {
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    industry: "",
    contactPerson: "",
    jobTitle: "",
    email: "",
    phone: "",
    companyAddress: "",
    city: "",
    province: "",
    postalCode: "",
    numberOfEmployees: "",
    trainingNeeds: "",
    serviceInterest: "",
    preferredTrainingMode: "",
    estimatedLearners: "",
    timeframe: "",
    budgetRange: "",
    additionalInfo: "",
  });

  const submitMutation = trpc.clientApplications.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! Our corporate team will contact you within 24 hours.");
      // Reset form
      setFormData({
        companyName: "",
        registrationNumber: "",
        industry: "",
        contactPerson: "",
        jobTitle: "",
        email: "",
        phone: "",
        companyAddress: "",
        city: "",
        province: "",
        postalCode: "",
        numberOfEmployees: "",
        trainingNeeds: "",
        serviceInterest: "",
        preferredTrainingMode: "",
        estimatedLearners: "",
        timeframe: "",
        budgetRange: "",
        additionalInfo: "",
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
    "Customized training solutions",
    "B-BBEE skills development support",
    "SETA grant assistance",
    "Flexible training schedules",
    "On-site and online options",
    "Comprehensive reporting",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Background (same style as About) */}
<section
  className="relative h-[400px] md:h-[500px] bg-cover bg-center"
  style={{ backgroundImage: "url('/about-hero.jpg')" }} // or your own image
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-secondary/80" />

  {/* Content */}
  <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10">
    <Briefcase className="w-20 h-20 mx-auto mb-6 text-secondary-foreground" />
    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary-foreground">
      Become a Client
    </h1>
    <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 text-secondary-foreground">
      Partner with us for comprehensive corporate training solutions
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
                  <CardTitle>Corporate Benefits</CardTitle>
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
                  <CardTitle className="text-3xl">Corporate Partnership Form</CardTitle>
                  <p className="text-muted-foreground">
                    Tell us about your training needs. Fields marked with * are required.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                            Company Name *
                          </label>
                          <Input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="ABC Corporation"
                          />
                        </div>
                        <div>
                          <label htmlFor="registrationNumber" className="block text-sm font-medium mb-2">
                            Registration Number
                          </label>
                          <Input
                            id="registrationNumber"
                            name="registrationNumber"
                            type="text"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            placeholder="2021/123456/07"
                          />
                        </div>
                        <div>
                          <label htmlFor="industry" className="block text-sm font-medium mb-2">
                            Industry *
                          </label>
                          <Select
                            value={formData.industry}
                            onValueChange={(value) => handleSelectChange("industry", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Government">Government</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="numberOfEmployees" className="block text-sm font-medium mb-2">
                            Number of Employees *
                          </label>
                          <Select
                            value={formData.numberOfEmployees}
                            onValueChange={(value) => handleSelectChange("numberOfEmployees", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10</SelectItem>
                              <SelectItem value="11-50">11-50</SelectItem>
                              <SelectItem value="51-200">51-200</SelectItem>
                              <SelectItem value="201-500">201-500</SelectItem>
                              <SelectItem value="501-1000">501-1000</SelectItem>
                              <SelectItem value="1000+">1000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Person</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            type="text"
                            required
                            value={formData.contactPerson}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                            Job Title *
                          </label>
                          <Input
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            required
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="HR Manager"
                          />
                        </div>
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
                            placeholder="jane@company.com"
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
                      </div>
                    </div>

                    {/* Company Address */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="companyAddress" className="block text-sm font-medium mb-2">
                            Street Address *
                          </label>
                          <Input
                            id="companyAddress"
                            name="companyAddress"
                            type="text"
                            required
                            value={formData.companyAddress}
                            onChange={handleChange}
                            placeholder="123 Business Avenue"
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

                    {/* Training Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Training Requirements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="trainingNeeds" className="block text-sm font-medium mb-2">
                            Training Needs *
                          </label>
                          <Textarea
                            id="trainingNeeds"
                            name="trainingNeeds"
                            required
                            value={formData.trainingNeeds}
                            onChange={handleChange}
                            placeholder="Describe your training requirements..."
                            rows={4}
                          />
                        </div>
                        <div>
                          <label htmlFor="serviceInterest" className="block text-sm font-medium mb-2">
                            Service of Interest *
                          </label>
                          <Select
                            value={formData.serviceInterest}
                            onValueChange={(value) => handleSelectChange("serviceInterest", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Learnerships">Learnerships</SelectItem>
                              <SelectItem value="Skills Programs">Skills Programs</SelectItem>
                              <SelectItem value="Corporate Training">Corporate Training</SelectItem>
                              <SelectItem value="SETA Grant Support">SETA Grant Support</SelectItem>
                              <SelectItem value="Consulting">Consulting</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="preferredTrainingMode" className="block text-sm font-medium mb-2">
                            Preferred Training Mode *
                          </label>
                          <Select
                            value={formData.preferredTrainingMode}
                            onValueChange={(value) => handleSelectChange("preferredTrainingMode", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Online">Online</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                              <SelectItem value="Flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="estimatedLearners" className="block text-sm font-medium mb-2">
                            Estimated Number of Learners
                          </label>
                          <Input
                            id="estimatedLearners"
                            name="estimatedLearners"
                            type="text"
                            value={formData.estimatedLearners}
                            onChange={handleChange}
                            placeholder="e.g., 20-30"
                          />
                        </div>
                        <div>
                          <label htmlFor="timeframe" className="block text-sm font-medium mb-2">
                            Preferred Timeframe
                          </label>
                          <Select
                            value={formData.timeframe}
                            onValueChange={(value) => handleSelectChange("timeframe", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Immediate">Immediate (Within 1 month)</SelectItem>
                              <SelectItem value="1-3 months">1-3 months</SelectItem>
                              <SelectItem value="3-6 months">3-6 months</SelectItem>
                              <SelectItem value="6+ months">6+ months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="budgetRange" className="block text-sm font-medium mb-2">
                            Budget Range
                          </label>
                          <Select
                            value={formData.budgetRange}
                            onValueChange={(value) => handleSelectChange("budgetRange", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Under R50,000">Under R50,000</SelectItem>
                              <SelectItem value="R50,000 - R100,000">R50,000 - R100,000</SelectItem>
                              <SelectItem value="R100,000 - R250,000">R100,000 - R250,000</SelectItem>
                              <SelectItem value="R250,000 - R500,000">R250,000 - R500,000</SelectItem>
                              <SelectItem value="R500,000+">R500,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                        Additional Information
                      </label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Any other details you'd like to share..."
                        rows={4}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Partnership Request"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to our terms and conditions. Our corporate team will contact you within 24 hours.
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

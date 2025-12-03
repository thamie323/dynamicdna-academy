import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { getLearnerApplicationById, getClientApplicationById } from "./db";

describe("Application Forms API", () => {
  // Test learner application submission
  describe("Learner Application", () => {
    it("should submit a learner application successfully", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      const applicationData = {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+27 11 123 4567",
        idNumber: "9001015009087",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        address: "123 Main Street",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "2000",
        highestQualification: "Matric",
        programInterest: "IT Systems Development",
        employmentStatus: "Unemployed",
        computerAccess: "Yes",
        internetAccess: "Yes",
        motivation: "I want to learn programming to build a career in tech.",
        hearAboutUs: "Google Search",
      };

      const result = await caller.learnerApplications.submit(applicationData);

      expect(result).toBeDefined();
      expect(result.id).toBeGreaterThan(0);
      expect(result.fullName).toBe("John Doe");
      expect(result.email).toBe("john.doe@example.com");
      expect(result.status).toBe("pending");
    });

    it("should retrieve submitted learner application", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      // Submit an application
      const applicationData = {
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+27 11 987 6543",
        idNumber: "9505205009088",
        dateOfBirth: "1995-05-20",
        gender: "Female",
        address: "456 Park Avenue",
        city: "Pretoria",
        province: "Gauteng",
        postalCode: "0001",
        highestQualification: "Diploma",
        programInterest: "Data Science",
        employmentStatus: "Student",
        computerAccess: "Yes",
        internetAccess: "Limited",
        motivation: "I'm passionate about data analysis and want to pursue a career in this field.",
        hearAboutUs: "Friend/Family",
      };

      const submitted = await caller.learnerApplications.submit(applicationData);

      // Retrieve the application directly from database
      const retrieved = await getLearnerApplicationById(submitted.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.fullName).toBe("Jane Smith");
      expect(retrieved?.email).toBe("jane.smith@example.com");
      expect(retrieved?.status).toBe("pending");
    });
  });

  // Test client application submission
  describe("Client Application", () => {
    it("should submit a client application successfully", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      const applicationData = {
        companyName: "Tech Corp Ltd",
        registrationNumber: "2020/123456/07",
        industry: "Technology",
        contactPerson: "Sarah Johnson",
        jobTitle: "HR Manager",
        email: "sarah@techcorp.com",
        phone: "+27 11 555 1234",
        companyAddress: "789 Business Street",
        city: "Sandton",
        province: "Gauteng",
        postalCode: "2196",
        numberOfEmployees: "51-200",
        trainingNeeds: "We need to upskill our IT support team in cloud technologies.",
        serviceInterest: "Corporate Training",
        preferredTrainingMode: "Hybrid",
        estimatedLearners: "25",
        timeframe: "1-3 months",
        budgetRange: "R100,000 - R250,000",
        additionalInfo: "We prefer training sessions during weekdays.",
      };

      const result = await caller.clientApplications.submit(applicationData);

      expect(result).toBeDefined();
      expect(result.id).toBeGreaterThan(0);
      expect(result.companyName).toBe("Tech Corp Ltd");
      expect(result.email).toBe("sarah@techcorp.com");
      expect(result.status).toBe("pending");
    });

    it("should retrieve submitted client application", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      // Submit an application
      const applicationData = {
        companyName: "Finance Solutions Inc",
        registrationNumber: "2019/654321/07",
        industry: "Finance",
        contactPerson: "Michael Brown",
        jobTitle: "Training Coordinator",
        email: "michael@financesolutions.com",
        phone: "+27 21 555 9876",
        companyAddress: "321 Corporate Drive",
        city: "Cape Town",
        province: "Western Cape",
        postalCode: "8001",
        numberOfEmployees: "201-500",
        trainingNeeds: "Compliance and regulatory training for our finance team.",
        serviceInterest: "Skills Programs",
        preferredTrainingMode: "On-site",
        estimatedLearners: "50",
        timeframe: "3-6 months",
        budgetRange: "R250,000 - R500,000",
        additionalInfo: "We need customized content for financial services sector.",
      };

      const submitted = await caller.clientApplications.submit(applicationData);

      // Retrieve the application directly from database
      const retrieved = await getClientApplicationById(submitted.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.companyName).toBe("Finance Solutions Inc");
      expect(retrieved?.email).toBe("michael@financesolutions.com");
      expect(retrieved?.status).toBe("pending");
    });
  });

  // Test validation
  describe("Form Validation", () => {
    it("should reject learner application with missing required fields", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      const incompleteData = {
        fullName: "Test User",
        email: "test@example.com",
        // Missing required fields
      } as any;

      await expect(
        caller.learnerApplications.submit(incompleteData)
      ).rejects.toThrow();
    });

    it("should reject client application with missing required fields", async () => {
      const caller = appRouter.createCaller({ user: null });
      
      const incompleteData = {
        companyName: "Test Company",
        email: "test@company.com",
        // Missing required fields
      } as any;

      await expect(
        caller.clientApplications.submit(incompleteData)
      ).rejects.toThrow();
    });
  });
});

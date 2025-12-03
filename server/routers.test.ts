import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';
import type { Context } from './_core/context';

// Mock context for testing
const createMockContext = (user?: any): Context => ({
  req: {} as any,
  res: {} as any,
  user: user || null,
});

describe('Backend API Tests', () => {
  describe('Auth Routes', () => {
    it('should return null for unauthenticated user', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.auth.me();
      expect(result).toBeNull();
    });

    it('should return user for authenticated user', async () => {
      const mockUser = {
        id: 1,
        openId: 'test-open-id',
        name: 'Test Admin',
        email: 'admin@test.com',
        role: 'admin' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
        loginMethod: 'oauth',
      };
      
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.auth.me();
      expect(result).toEqual(mockUser);
    });
  });

  describe('News Routes - Public Access', () => {
    it('should allow public access to published news', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      // This should not throw an error
      const result = await caller.news.getPublished();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should allow public access to news by slug', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      // This should not throw an error even if news doesn't exist (returns undefined)
      const result = await caller.news.getBySlug({ slug: 'test-slug' });
      // Result can be undefined if news doesn't exist, which is expected behavior
      expect(result === undefined || result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('News Routes - Admin Access', () => {
    it('should deny non-admin access to admin routes', async () => {
      const ctx = createMockContext({ id: 1, role: 'user' });
      const caller = appRouter.createCaller(ctx);
      
      await expect(caller.news.getAll()).rejects.toThrow('Admin access required');
    });

    it('should allow admin access to all news', async () => {
      const mockAdmin = {
        id: 1,
        openId: 'admin-open-id',
        name: 'Admin',
        email: 'admin@test.com',
        role: 'admin' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
        loginMethod: 'oauth',
      };
      
      const ctx = createMockContext(mockAdmin);
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.news.getAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Learner Applications - Public Submission', () => {
    it('should allow public submission of learner applications', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      const applicationData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+27123456789',
        idNumber: '9001015800080',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        address: '123 Test Street',
        city: 'Johannesburg',
        province: 'Gauteng',
        postalCode: '2000',
        highestQualification: 'Matric',
        programInterest: 'IT Systems Support',
        employmentStatus: 'Unemployed',
        computerAccess: 'Yes',
        internetAccess: 'Yes',
        motivation: 'I want to build a career in IT',
      };
      
      const result = await caller.learnerApplications.submit(applicationData);
      expect(result.success).toBe(true);
    });
  });

  describe('Client Applications - Public Submission', () => {
    it('should allow public submission of client applications', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      const applicationData = {
        companyName: 'Test Company',
        industry: 'Technology',
        contactPerson: 'Jane Smith',
        jobTitle: 'HR Manager',
        email: 'jane@testcompany.com',
        phone: '+27123456789',
        companyAddress: '456 Business Ave',
        city: 'Cape Town',
        province: 'Western Cape',
        postalCode: '8000',
        numberOfEmployees: '50-100',
        trainingNeeds: 'We need IT training for our staff',
        serviceInterest: 'Corporate Training',
        preferredTrainingMode: 'On-site',
      };
      
      const result = await caller.clientApplications.submit(applicationData);
      expect(result.success).toBe(true);
    });
  });

  describe('Student Stories - Public Access', () => {
    it('should allow public access to published stories', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.studentStories.getPublished();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should allow public access to featured stories', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.studentStories.getFeatured();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Admin Authorization', () => {
    it('should deny unauthenticated access to admin routes', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);
      
      await expect(caller.learnerApplications.getAll()).rejects.toThrow();
      await expect(caller.clientApplications.getAll()).rejects.toThrow();
      await expect(caller.studentStories.getAll()).rejects.toThrow();
    });

    it('should deny non-admin users access to admin routes', async () => {
      const mockUser = {
        id: 2,
        openId: 'user-open-id',
        name: 'Regular User',
        email: 'user@test.com',
        role: 'user' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
        loginMethod: 'oauth',
      };
      
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);
      
      await expect(caller.learnerApplications.getAll()).rejects.toThrow('Admin access required');
      await expect(caller.clientApplications.getAll()).rejects.toThrow('Admin access required');
      await expect(caller.studentStories.getAll()).rejects.toThrow('Admin access required');
    });
  });
});

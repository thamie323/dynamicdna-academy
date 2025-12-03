import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { ENV } from "./_core/env";
import { notifyOwner, sendApplicantEmail } from "./_core/notification";



// Admin-only procedure - ensures user is logged in and has admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ 
      code: 'FORBIDDEN',
      message: 'Admin access required' 
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== NEWS ROUTES ====================
  news: router({
    // Public: Get all published news
    getPublished: publicProcedure.query(async () => {
      return await db.getAllNews(true);
    }),

    // Public: Get news by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getNewsBySlug(input.slug);
      }),

    // Admin: Get all news (including unpublished)
    getAll: adminProcedure.query(async () => {
      return await db.getAllNews(false);
    }),

    // Admin: Get news by ID
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getNewsById(input.id);
      }),

    // Admin: Create news
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        category: z.string().default("General"),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        const newsData = {
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published ? new Date() : null,
        };
        await db.createNews(newsData);
        return { success: true };
      }),

    // Admin: Update news
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        excerpt: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        
        // If publishing for the first time, set publishedAt
        if (updateData.published) {
          const existing = await db.getNewsById(id);
          if (existing && !existing.published) {
            (updateData as any).publishedAt = new Date();
          }
        }
        
        await db.updateNews(id, updateData);
        return { success: true };
      }),

    // Admin: Delete news
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNews(input.id);
        return { success: true };
      }),
  }),

  // ==================== LEARNER APPLICATION ROUTES ====================
  // ==================== LEARNER APPLICATION ROUTES ====================
learnerApplications: router({
  // Public: Submit application
  submit: publicProcedure
  .input(z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    idNumber: z.string().min(1),
    dateOfBirth: z.string().min(1),
    gender: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    postalCode: z.string().min(1),
    highestQualification: z.string().min(1),
    programInterest: z.string().min(1),
    employmentStatus: z.string().min(1),
    computerAccess: z.string().min(1),
    internetAccess: z.string().min(1),
    motivation: z.string().min(1),
    hearAboutUs: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    // 1) Save application
    const application = await db.createLearnerApplication(input);

    // 2) Notify owner (do not break request if this fails)
    try {
      await notifyOwner({
        title: "New Learner Application",
        content: `New application from ${input.fullName} (${input.email}) for ${input.programInterest}`,
      });
    } catch (err) {
      console.error("notifyOwner failed (application still saved):", err);
    }

    // 3) Email the learner a confirmation
    try {
      await sendApplicantEmail(
        input.email,
        "We received your application – dynamicDNA Academy",
        `Hi ${input.fullName},

Thank you for applying to dynamicDNA Academy!

We have received your application for the program: ${input.programInterest}.
Our team will review your details and contact you within 2–3 business days with next steps.

If you have any questions in the meantime, you can reach us at ${ENV.ownerEmail || "enquiries@dynamicdna.co.za"}.

Kind regards,
dynamicDNA Academy`
      );
    } catch (err) {
      console.error("[Email] Failed to send learner confirmation email:", err);
      // intentionally not throwing
    }

    // 4) Response to frontend
    return {
      success: true,
      id: application.id,
    };
  }),


    // Admin: Get all applications
    getAll: adminProcedure
      .input(z.object({
        status: z.enum(["pending", "approved", "declined"]).optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getAllLearnerApplications(input?.status);
      }),

    // Admin: Get application by ID
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getLearnerApplicationById(input.id);
      }),

    // Admin: Update application status
    updateStatus: adminProcedure
  .input(z.object({
    id: z.number(),
    status: z.enum(["pending", "approved", "declined"]),
    adminNotes: z.string().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    await db.updateLearnerApplicationStatus(
      input.id,
      input.status,
      ctx.user.id,
      input.adminNotes
    );

    // Send email to the learner about the decision
    const application = await db.getLearnerApplicationById(input.id);
    if (application) {
      const statusLabel: Record<(typeof input)["status"], string> = {
        pending: "Pending Review",
        approved: "Approved",
        declined: "Declined",
      };

      const subject = `Your application status: ${statusLabel[input.status]} – dynamicDNA Academy`;

      const body =
        input.status === "approved"
          ? `Hi ${application.fullName},

Great news! Your application to dynamicDNA Academy has been APPROVED.

Program: ${application.programInterest}

Our team will contact you shortly with your registration details and next steps.

Kind regards,
dynamicDNA Academy`
          : input.status === "declined"
          ? `Hi ${application.fullName},

Thank you for your interest in dynamicDNA Academy.

After careful review, we regret to inform you that your application for ${application.programInterest} has not been successful at this time.

${
  input.adminNotes
    ? `Reason from our team:\n${input.adminNotes}\n\n`
    : ""
}We encourage you to keep building your skills and consider applying again in the future.

Kind regards,
dynamicDNA Academy`
          : `Hi ${application.fullName},

Your application status has been updated to: ${statusLabel[input.status]}.

We will keep you informed as your application progresses.

Kind regards,
dynamicDNA Academy`;

      try {
        await sendApplicantEmail(application.email, subject, body);
      } catch (err) {
        console.error("[Email] Failed to send learner status email:", err);
      }
    }

    return { success: true };
  }),

  }),

 // ==================== CLIENT APPLICATION ROUTES ====================
clientApplications: router({
  // Public: Submit application
  submit: publicProcedure
    .input(z.object({
      companyName: z.string().min(1),
      registrationNumber: z.string().optional(),
      industry: z.string().min(1),
      contactPerson: z.string().min(1),
      jobTitle: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
      companyAddress: z.string().min(1),
      city: z.string().min(1),
      province: z.string().min(1),
      postalCode: z.string().min(1),
      numberOfEmployees: z.string().min(1),
      trainingNeeds: z.string().min(1),
      serviceInterest: z.string().min(1),
      preferredTrainingMode: z.string().min(1),
      estimatedLearners: z.string().optional(),
      timeframe: z.string().optional(),
      budgetRange: z.string().optional(),
      additionalInfo: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // 1) Save application
      const application = await db.createClientApplication(input);

      // 2) Notify owner (admin) – best effort
      try {
        await notifyOwner({
          title: "New Client Application",
          content: `New application from ${input.companyName} (${input.contactPerson} - ${input.email})`,
        });
      } catch (err) {
        console.error("notifyOwner (client) failed (application still saved):", err);
      }

      // 3) Email client – best effort
      try {
        await sendApplicantEmail(
          input.email,
          "We received your corporate training enquiry",
          `Hi ${input.contactPerson},

Thank you for contacting dynamicDNA Academy.

We have received your enquiry from ${input.companyName} regarding:
Service interest: ${input.serviceInterest}
Training needs: ${input.trainingNeeds}

Our team will review your requirements and contact you within 2–3 business days
to discuss a tailored solution.

If you have any questions in the meantime, you can reach us at ${
            ENV.ownerEmail || "enquiries@dynamicdna.co.za"
          }.

Kind regards,
dynamicDNA Academy Team`
        );
      } catch (err) {
        console.error("[Email] Failed to send client confirmation email:", err);
        // intentionally not throwing
      }

      return {
        success: true,
        id: application.id,
      };
    }),

  // Admin: Get all applications
  getAll: adminProcedure
    .input(z.object({
      status: z.enum(["pending", "approved", "declined"]).optional(),
    }).optional())
    .query(async ({ input }) => {
      return await db.getAllClientApplications(input?.status);
    }),

  // Admin: Get application by ID
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.getClientApplicationById(input.id);
    }),

  // Admin: Update application status
  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "approved", "declined"]),
      adminNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await db.updateClientApplicationStatus(
        input.id,
        input.status,
        ctx.user.id,
        input.adminNotes
      );

      const application = await db.getClientApplicationById(input.id);

      if (application?.email) {
        const statusText =
          input.status === "approved"
            ? "approved"
            : input.status === "declined"
            ? "declined"
            : "updated";

        const body = `Hi ${application.contactPerson},

The status of your training enquiry with dynamicDNA Academy has been ${statusText}.

Company: ${application.companyName}
Service interest: ${application.serviceInterest}

Status: ${statusText.toUpperCase()}
${
  input.adminNotes
    ? `\nNotes from our team:\n${input.adminNotes}\n`
    : ""
}

If you have any questions, you can reply to this email or contact us at ${
          ENV.ownerEmail || "enquiries@dynamicdna.co.za"
        }.

Kind regards,
dynamicDNA Academy Team`;

        try {
          await sendApplicantEmail(
            application.email,
            `Your training enquiry has been ${statusText}`,
            body
          );
        } catch (err) {
          console.error("[Email] Failed to send client status email:", err);
        }
      }

      return { success: true };
    }),
}),
contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        // 1) Notify owner/admin
        try {
          await notifyOwner({
            title: `New Contact Enquiry: ${input.subject}`,
            content: `
New contact enquiry from ${input.name} (${input.email}${input.phone ? `, ${input.phone}` : ""})

Subject:
${input.subject}

Message:
${input.message}
          `.trim(),
          });
        } catch (err) {
          console.error("[Contact] Failed to notify owner:", err);
        }

        // 2) Auto-reply to the person who filled in the form
        try {
          await sendApplicantEmail(
  input.email,
  "We received your enquiry – dynamicDNA Academy",
  `
Hi ${input.name},

Thank you for contacting dynamicDNA Academy.

We have received your message regarding: "${input.subject}".

Our team will review your enquiry and get back to you within 2–3 business days.
If your matter is urgent, you can also reach us at ${ENV.ownerEmail || "our main office email"}.

Kind regards,
dynamicDNA Academy
  `.trim()
);
        } catch (err) {
          console.error("[Contact] Failed to send contact confirmation email:", err);
        }

        return { success: true };
      }),
  }),


  // ==================== STUDENT STORIES ROUTES ====================
  studentStories: router({
    // Public: Get published stories
    getPublished: publicProcedure.query(async () => {
      return await db.getAllStudentStories(true);
    }),

    // Public: Get featured stories
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedStudentStories();
    }),

    // Admin: Get all stories
    getAll: adminProcedure.query(async () => {
      return await db.getAllStudentStories(false);
    }),

    // Admin: Get story by ID
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getStudentStoryById(input.id);
      }),

    // Admin: Create story
    create: adminProcedure
      .input(z.object({
        studentName: z.string().min(1),
        program: z.string().min(1),
        graduationYear: z.number(),
        currentPosition: z.string().optional(),
        company: z.string().optional(),
        imageUrl: z.string().optional(),
        story: z.string().min(1),
        quote: z.string().optional(),
        featured: z.boolean().default(false),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        await db.createStudentStory(input);
        return { success: true };
      }),

    // Admin: Update story
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        studentName: z.string().min(1).optional(),
        program: z.string().min(1).optional(),
        graduationYear: z.number().optional(),
        currentPosition: z.string().optional(),
        company: z.string().optional(),
        imageUrl: z.string().optional(),
        story: z.string().min(1).optional(),
        quote: z.string().optional(),
        featured: z.boolean().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        await db.updateStudentStory(id, updateData);
        return { success: true };
      }),

    // Admin: Delete story
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteStudentStory(input.id);
        return { success: true };
      }),
  }),
  
});

export type AppRouter = typeof appRouter;

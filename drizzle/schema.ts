import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Only admins can log in to manage the system.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("admin").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * News articles table
 * Admins can create, edit, and delete news articles
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  category: varchar("category", { length: 100 }).notNull().default("General"),
  published: boolean("published").default(false).notNull(),
  authorId: int("authorId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * Learner applications table
 * Stores applications from "Become a Learner" form
 */
export const learnerApplications = mysqlTable("learner_applications", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  idNumber: varchar("idNumber", { length: 50 }).notNull(),
  dateOfBirth: varchar("dateOfBirth", { length: 50 }).notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  province: varchar("province", { length: 100 }).notNull(),
  postalCode: varchar("postalCode", { length: 20 }).notNull(),
  highestQualification: varchar("highestQualification", { length: 255 }).notNull(),
  programInterest: varchar("programInterest", { length: 255 }).notNull(),
  employmentStatus: varchar("employmentStatus", { length: 100 }).notNull(),
  computerAccess: varchar("computerAccess", { length: 50 }).notNull(),
  internetAccess: varchar("internetAccess", { length: 50 }).notNull(),
  motivation: text("motivation").notNull(),
  hearAboutUs: varchar("hearAboutUs", { length: 255 }),
  status: mysqlEnum("status", ["pending", "approved", "declined"]).default("pending").notNull(),
  adminNotes: text("adminNotes"),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearnerApplication = typeof learnerApplications.$inferSelect;
export type InsertLearnerApplication = typeof learnerApplications.$inferInsert;

/**
 * Client applications table
 * Stores applications from "Become a Client" form
 */
export const clientApplications = mysqlTable("client_applications", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  registrationNumber: varchar("registrationNumber", { length: 100 }),
  industry: varchar("industry", { length: 255 }).notNull(),
  contactPerson: varchar("contactPerson", { length: 255 }).notNull(),
  jobTitle: varchar("jobTitle", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  companyAddress: text("companyAddress").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  province: varchar("province", { length: 100 }).notNull(),
  postalCode: varchar("postalCode", { length: 20 }).notNull(),
  numberOfEmployees: varchar("numberOfEmployees", { length: 50 }).notNull(),
  trainingNeeds: text("trainingNeeds").notNull(),
  serviceInterest: varchar("serviceInterest", { length: 255 }).notNull(),
  preferredTrainingMode: varchar("preferredTrainingMode", { length: 100 }).notNull(),
  estimatedLearners: varchar("estimatedLearners", { length: 50 }),
  timeframe: varchar("timeframe", { length: 100 }),
  budgetRange: varchar("budgetRange", { length: 100 }),
  additionalInfo: text("additionalInfo"),
  status: mysqlEnum("status", ["pending", "approved", "declined"]).default("pending").notNull(),
  adminNotes: text("adminNotes"),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ClientApplication = typeof clientApplications.$inferSelect;
export type InsertClientApplication = typeof clientApplications.$inferInsert;

/**
 * Student stories table
 * Success stories displayed on Student Hub page
 */
export const studentStories = mysqlTable("student_stories", {
  id: int("id").autoincrement().primaryKey(),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  program: varchar("program", { length: 255 }).notNull(),
  graduationYear: int("graduationYear").notNull(),
  currentPosition: varchar("currentPosition", { length: 255 }),
  company: varchar("company", { length: 255 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  story: text("story").notNull(),
  quote: text("quote"),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentStory = typeof studentStories.$inferSelect;
export type InsertStudentStory = typeof studentStories.$inferInsert;

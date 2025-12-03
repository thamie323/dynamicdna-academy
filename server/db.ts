import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  news, 
  InsertNews, 
  News,
  learnerApplications,
  InsertLearnerApplication,
  LearnerApplication,
  clientApplications,
  InsertClientApplication,
  ClientApplication,
  studentStories,
  InsertStudentStory,
  StudentStory
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== NEWS FUNCTIONS ====================

export async function getAllNews(publishedOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  if (publishedOnly) {
    return await db.select().from(news).where(eq(news.published, true)).orderBy(desc(news.publishedAt));
  }
  
  return await db.select().from(news).orderBy(desc(news.createdAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getNewsBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createNews(newsData: InsertNews) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Make sure imageUrl is written as NULL when empty
  const result = await db.insert(news).values({
    title: newsData.title,
    slug: newsData.slug,
    excerpt: newsData.excerpt,
    content: newsData.content,
    category: newsData.category,
    published: newsData.published ?? false,
    authorId: newsData.authorId,
    imageUrl: newsData.imageUrl ?? null,   // 👈 save uploaded URL here
    publishedAt: newsData.publishedAt ?? null,
  });

  return result;
}

export async function updateNews(id: number, newsData: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Build update object explicitly so we don’t push undefineds
  const update: Partial<InsertNews> = {};

  if (newsData.title !== undefined) update.title = newsData.title;
  if (newsData.slug !== undefined) update.slug = newsData.slug;
  if (newsData.excerpt !== undefined) update.excerpt = newsData.excerpt;
  if (newsData.content !== undefined) update.content = newsData.content;
  if (newsData.category !== undefined) update.category = newsData.category;
  if (newsData.published !== undefined) update.published = newsData.published;

  // 👇 handle image explicitly
  if (newsData.imageUrl !== undefined) {
    // if you ever send "", this will store NULL
    update.imageUrl = newsData.imageUrl || null;
  }

  if (newsData.publishedAt !== undefined) {
    update.publishedAt = newsData.publishedAt;
  }

  await db.update(news).set(update).where(eq(news.id, id));
}


export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(news).where(eq(news.id, id));
}

// ==================== LEARNER APPLICATION FUNCTIONS ====================

export async function getAllLearnerApplications(status?: "pending" | "approved" | "declined") {
  const db = await getDb();
  if (!db) return [];

  if (status) {
    return await db.select().from(learnerApplications).where(eq(learnerApplications.status, status)).orderBy(desc(learnerApplications.createdAt));
  }

  return await db.select().from(learnerApplications).orderBy(desc(learnerApplications.createdAt));
}

export async function getLearnerApplicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(learnerApplications).where(eq(learnerApplications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLearnerApplication(applicationData: InsertLearnerApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(learnerApplications).values(applicationData).$returningId();
  const insertId = result[0].id;
  
  // Fetch and return the inserted record
  const inserted = await db.select().from(learnerApplications).where(eq(learnerApplications.id, insertId)).limit(1);
  return inserted[0];
}

export async function updateLearnerApplicationStatus(
  id: number, 
  status: "pending" | "approved" | "declined",
  reviewedBy: number,
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(learnerApplications).set({
    status,
    reviewedBy,
    reviewedAt: new Date(),
    adminNotes: adminNotes || null,
  }).where(eq(learnerApplications.id, id));
}

// ==================== CLIENT APPLICATION FUNCTIONS ====================

export async function getAllClientApplications(status?: "pending" | "approved" | "declined") {
  const db = await getDb();
  if (!db) return [];

  if (status) {
    return await db.select().from(clientApplications).where(eq(clientApplications.status, status)).orderBy(desc(clientApplications.createdAt));
  }

  return await db.select().from(clientApplications).orderBy(desc(clientApplications.createdAt));
}

export async function getClientApplicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(clientApplications).where(eq(clientApplications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createClientApplication(applicationData: InsertClientApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(clientApplications).values(applicationData).$returningId();
  const insertId = result[0].id;
  
  // Fetch and return the inserted record
  const inserted = await db.select().from(clientApplications).where(eq(clientApplications.id, insertId)).limit(1);
  return inserted[0];
}

export async function updateClientApplicationStatus(
  id: number, 
  status: "pending" | "approved" | "declined",
  reviewedBy: number,
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(clientApplications).set({
    status,
    reviewedBy,
    reviewedAt: new Date(),
    adminNotes: adminNotes || null,
  }).where(eq(clientApplications.id, id));
}

// ==================== STUDENT STORY FUNCTIONS ====================

export async function getAllStudentStories(publishedOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  if (publishedOnly) {
    return await db.select().from(studentStories).where(eq(studentStories.published, true)).orderBy(desc(studentStories.createdAt));
  }

  return await db.select().from(studentStories).orderBy(desc(studentStories.createdAt));
}

export async function getFeaturedStudentStories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(studentStories)
    .where(and(eq(studentStories.published, true), eq(studentStories.featured, true)))
    .orderBy(desc(studentStories.createdAt));
}

export async function getStudentStoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(studentStories).where(eq(studentStories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createStudentStory(storyData: InsertStudentStory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(studentStories).values({
    studentName: storyData.studentName,
    program: storyData.program,
    graduationYear: storyData.graduationYear,
    currentPosition: storyData.currentPosition ?? null,
    company: storyData.company ?? null,
    story: storyData.story,
    quote: storyData.quote ?? null,
    featured: storyData.featured ?? false,
    published: storyData.published ?? false,
    imageUrl: storyData.imageUrl ?? null,   // 👈 save uploaded URL here
  });

  return result;
}

export async function updateStudentStory(
  id: number,
  storyData: Partial<InsertStudentStory>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const update: Partial<InsertStudentStory> = {};

  if (storyData.studentName !== undefined) update.studentName = storyData.studentName;
  if (storyData.program !== undefined) update.program = storyData.program;
  if (storyData.graduationYear !== undefined) update.graduationYear = storyData.graduationYear;
  if (storyData.currentPosition !== undefined) {
    update.currentPosition = storyData.currentPosition || null;
  }
  if (storyData.company !== undefined) {
    update.company = storyData.company || null;
  }
  if (storyData.story !== undefined) update.story = storyData.story;
  if (storyData.quote !== undefined) update.quote = storyData.quote || null;
  if (storyData.featured !== undefined) update.featured = storyData.featured;
  if (storyData.published !== undefined) update.published = storyData.published;

  // 👇 image handling
  if (storyData.imageUrl !== undefined) {
    update.imageUrl = storyData.imageUrl || null;
  }

  await db.update(studentStories).set(update).where(eq(studentStories.id, id));
}

export async function deleteStudentStory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(studentStories).where(eq(studentStories.id, id));
}

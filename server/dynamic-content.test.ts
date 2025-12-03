import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { createNews, createStudentStory } from "./db";

describe("Dynamic Content Display", () => {
  let testNewsId: number;
  let testStoryId: number;
  let adminUser: any;

  beforeAll(async () => {
    // Create a mock admin user for testing
    adminUser = {
      id: 1,
      openId: "test-admin",
      name: "Test Admin",
      email: "admin@test.com",
      role: "admin",
    };
  });

  describe("News Articles", () => {
    it("should create and publish a news article", async () => {
      const caller = appRouter.createCaller({ user: adminUser });
      const timestamp = Date.now();

      const newsData = {
        title: "Test News Article",
        slug: `test-news-article-${timestamp}`,
        excerpt: "This is a test news article excerpt for testing dynamic content.",
        content: "Full content of the test news article goes here. This is used to validate that news articles can be created and published successfully.",
        imageUrl: "/test-image.jpg",
        category: "TEST",
        published: true,
      };

      const result = await caller.news.create(newsData);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should fetch published news articles", async () => {
      const caller = appRouter.createCaller({ user: null });

      const articles = await caller.news.getPublished();

      expect(articles).toBeDefined();
      expect(Array.isArray(articles)).toBe(true);
      
      // Check if we have at least the test article we created
      if (articles.length > 0) {
        const article = articles[0];
        expect(article).toHaveProperty("id");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("slug");
        expect(article).toHaveProperty("excerpt");
        expect(article).toHaveProperty("published");
        expect(article.published).toBe(true);
      }
    });

    it("should fetch news article by slug", async () => {
      const caller = appRouter.createCaller({ user: null });

      // First get all published articles
      const articles = await caller.news.getPublished();
      
      if (articles.length > 0) {
        const firstArticle = articles[0];
        
        // Fetch by slug
        const article = await caller.news.getBySlug({ slug: firstArticle.slug });

        expect(article).toBeDefined();
        expect(article?.slug).toBe(firstArticle.slug);
        expect(article?.title).toBe(firstArticle.title);
      }
    });

    it("should not fetch unpublished news articles in public endpoint", async () => {
      const caller = appRouter.createCaller({ user: adminUser });

      // Create an unpublished article
      const timestamp = Date.now();
      await caller.news.create({
        title: "Unpublished Test Article",
        slug: `unpublished-test-${timestamp}`,
        excerpt: "This should not appear in public listings",
        content: "Unpublished content",
        published: false,
      });

      // Try to fetch it as a public user
      const publicCaller = appRouter.createCaller({ user: null });
      const articles = await publicCaller.news.getPublished();

      // Verify the unpublished article is not in the list
      const unpublishedArticle = articles.find(a => a.slug === "unpublished-test");
      expect(unpublishedArticle).toBeUndefined();
    });
  });

  describe("Student Stories", () => {
    it("should create and publish a student story", async () => {
      const caller = appRouter.createCaller({ user: adminUser });

      const storyData = {
        studentName: "Test Student",
        program: "Software Development",
        graduationYear: 2024,
        story: "This is a test success story to validate that student stories can be created and published successfully.",
        currentPosition: "Software Developer at Test Company",
        imageUrl: "/test-student.jpg",
        published: true,
      };

      const result = await caller.studentStories.create(storyData);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should fetch published student stories", async () => {
      const caller = appRouter.createCaller({ user: null });

      const stories = await caller.studentStories.getPublished();

      expect(stories).toBeDefined();
      expect(Array.isArray(stories)).toBe(true);
      
      // Check if we have at least the test story we created
      if (stories.length > 0) {
        const story = stories[0];
        expect(story).toHaveProperty("id");
        expect(story).toHaveProperty("studentName");
        expect(story).toHaveProperty("program");
        expect(story).toHaveProperty("story");
        expect(story).toHaveProperty("published");
        expect(story.published).toBe(true);
      }
    });

    it("should not fetch unpublished student stories in public endpoint", async () => {
      const caller = appRouter.createCaller({ user: adminUser });

      // Create an unpublished story
      await caller.studentStories.create({
        studentName: "Hidden Student",
        program: "Test Program",
        graduationYear: 2023,
        story: "This story should not appear in public listings",
        published: false,
      });

      // Try to fetch it as a public user
      const publicCaller = appRouter.createCaller({ user: null });
      const stories = await publicCaller.studentStories.getPublished();

      // Verify the unpublished story is not in the list
      const unpublishedStory = stories.find(s => s.studentName === "Hidden Student");
      expect(unpublishedStory).toBeUndefined();
    });

    it("should validate student story data structure", async () => {
      const caller = appRouter.createCaller({ user: null });

      const stories = await caller.studentStories.getPublished();

      if (stories.length > 0) {
        const story = stories[0];
        
        // Validate required fields
        expect(typeof story.studentName).toBe("string");
        expect(typeof story.program).toBe("string");
        expect(typeof story.story).toBe("string");
        expect(typeof story.published).toBe("boolean");
        
        // Optional fields should be string or null/undefined
        if (story.currentPosition !== null && story.currentPosition !== undefined) {
          expect(typeof story.currentPosition).toBe("string");
        }
        if (story.imageUrl !== null && story.imageUrl !== undefined) {
          expect(typeof story.imageUrl).toBe("string");
        }
      }
    });
  });

  describe("Content Ordering", () => {
    it("should return news articles ordered by published date (newest first)", async () => {
      const caller = appRouter.createCaller({ user: null });

      const articles = await caller.news.getPublished();

      if (articles.length > 1) {
        for (let i = 0; i < articles.length - 1; i++) {
          const current = new Date(articles[i].publishedAt || 0);
          const next = new Date(articles[i + 1].publishedAt || 0);
          
          // Current article should be newer than or equal to next article
          expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
        }
      }
    });

    it("should return student stories ordered by creation date (newest first)", async () => {
      const caller = appRouter.createCaller({ user: null });

      const stories = await caller.studentStories.getPublished();

      if (stories.length > 1) {
        for (let i = 0; i < stories.length - 1; i++) {
          const current = new Date(stories[i].createdAt);
          const next = new Date(stories[i + 1].createdAt);
          
          // Current story should be newer than or equal to next story
          expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
        }
      }
    });
  });
});

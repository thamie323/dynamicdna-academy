-- =====================================================
-- dynamicDNA Academy - Database Setup Script
-- =====================================================
-- This script creates the database, user, and sample data
-- Run this in MySQL Workbench or MySQL command line
-- =====================================================

-- Step 1: Create Database
-- =====================================================
CREATE DATABASE IF NOT EXISTS dynamicdna_academy 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Step 2: Create Database User (Optional but Recommended)
-- =====================================================
-- Replace 'your_secure_password' with your actual password
CREATE USER IF NOT EXISTS 'dynamicdna_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON dynamicdna_academy.* TO 'dynamicdna_user'@'localhost';
FLUSH PRIVILEGES;

-- Step 3: Use the Database
-- =====================================================
USE dynamicdna_academy;

-- Step 4: Create Tables
-- =====================================================
-- Note: You should use `pnpm db:push` instead of running these manually
-- These are provided for reference only

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  loginMethod VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn DATETIME
);

-- News table (for news articles)
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  imageUrl VARCHAR(500),
  category VARCHAR(100) DEFAULT 'General',
  published BOOLEAN DEFAULT FALSE,
  authorId INT,
  publishedAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE SET NULL
);

-- Learner Applications table
CREATE TABLE IF NOT EXISTS learner_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  dateOfBirth DATE,
  gender VARCHAR(50),
  idNumber VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postalCode VARCHAR(20),
  highestQualification VARCHAR(255),
  institution VARCHAR(255),
  graduationYear INT,
  employmentStatus VARCHAR(100),
  currentEmployer VARCHAR(255),
  preferredProgram VARCHAR(255) NOT NULL,
  preferredSchedule VARCHAR(100),
  trainingGoals TEXT,
  priorExperience TEXT,
  hearAboutUs VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Client Applications table
CREATE TABLE IF NOT EXISTS client_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  companyName VARCHAR(255) NOT NULL,
  registrationNumber VARCHAR(100),
  industry VARCHAR(255),
  companySize VARCHAR(100),
  contactPersonName VARCHAR(255) NOT NULL,
  contactPersonTitle VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postalCode VARCHAR(20),
  trainingNeeds TEXT NOT NULL,
  numberOfEmployees INT,
  preferredSchedule VARCHAR(100),
  budget VARCHAR(100),
  timeline VARCHAR(255),
  additionalInfo TEXT,
  hearAboutUs VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student Stories table
CREATE TABLE IF NOT EXISTS student_stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentName VARCHAR(255) NOT NULL,
  program VARCHAR(255) NOT NULL,
  graduationYear INT NOT NULL,
  currentPosition VARCHAR(255),
  company VARCHAR(255),
  imageUrl VARCHAR(500),
  story TEXT NOT NULL,
  quote TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 5: Create Admin User
-- =====================================================
-- Replace the values with your actual information
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
VALUES (
  'local-admin-001',
  'Admin User',
  'admin@dynamicdna.co.za',
  'admin',
  'local',
  NOW(),
  NOW(),
  NOW()
);

-- Step 6: Insert Sample Data (Optional)
-- =====================================================

-- Sample News Article
INSERT INTO news (title, slug, excerpt, content, category, published, publishedAt, createdAt, updatedAt)
VALUES (
  'Welcome to dynamicDNA Academy',
  'welcome-to-dynamicdna-academy',
  'We are excited to announce the launch of our new digital skills training platform designed to empower individuals and organizations.',
  'dynamicDNA Academy is a premier technology training institution committed to delivering excellence in ICT education. We combine theoretical knowledge with practical applications to cultivate highly skilled professionals, with particular emphasis on Fourth Industrial Revolution competencies.

Our comprehensive training programs are designed to bridge the digital skills gap and prepare learners for successful careers in technology. Whether you are an individual looking to upskill or an organization seeking to develop your workforce, we have tailored solutions to meet your needs.

Join hundreds of students who have already started their journey to a successful career in technology. Whether you are an individual looking to upskill or an organization seeking to develop your team, we have the perfect solution for you.',
  'General',
  1,
  NOW(),
  NOW(),
  NOW()
);

-- Sample Student Story
INSERT INTO student_stories (studentName, program, graduationYear, currentPosition, company, story, published, createdAt, updatedAt)
VALUES (
  'Thabo Molefe',
  'Software Development',
  2024,
  'Junior Software Developer',
  'Tech Solutions SA',
  'After completing the Software Development program at dynamicDNA Academy, I was able to secure my dream job as a software developer. The hands-on training and industry-relevant curriculum prepared me perfectly for the workplace. The instructors were knowledgeable and supportive throughout my learning journey.',
  1,
  NOW(),
  NOW()
);

INSERT INTO student_stories (studentName, program, graduationYear, currentPosition, company, story, published, createdAt, updatedAt)
VALUES (
  'Nomsa Dlamini',
  'Data Science',
  2023,
  'Data Analyst',
  'Financial Services Corp',
  'The Data Science program exceeded my expectations. I learned practical skills that I use every day in my current role. The project-based learning approach helped me build a strong portfolio that impressed potential employers during interviews.',
  1,
  NOW(),
  NOW()
);

-- Step 7: Verify Installation
-- =====================================================
-- Run these queries to verify everything was created correctly

-- Check tables
SHOW TABLES;

-- Check admin user
SELECT * FROM users WHERE role = 'admin';

-- Check sample data
SELECT COUNT(*) as total_news FROM news;
SELECT COUNT(*) as total_stories FROM student_stories;

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Your database is now ready to use.
-- Next steps:
-- 1. Update your .env file with the database credentials
-- 2. Run `pnpm db:push` to sync the schema
-- 3. Start the development server with `pnpm dev`
-- =====================================================

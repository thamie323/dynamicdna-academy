# dynamicDNA Academy - Local Setup Guide

This guide will walk you through setting up the dynamicDNA Academy project on your local machine with your own MySQL database.

---

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| **Node.js** | 18.0.0 or higher | JavaScript runtime for running the application |
| **pnpm** | 8.0.0 or higher | Package manager (faster than npm) |
| **MySQL** | 8.0 or higher | Database server |
| **MySQL Workbench** | 8.0 or higher | Database management tool (recommended) |
| **Git** | 2.0 or higher | Version control to download the project |

---

## Step 1: Download the Project Files

First, you need to download all the project files from the Manus platform to your local computer.

### Option A: Download from Management UI

Navigate to the **Code** panel in the Management UI (right sidebar) and click the **"Download All Files"** button. This will download a ZIP file containing your entire project. Extract this ZIP file to a folder on your computer, for example `C:\Projects\dynamicdna-academy` (Windows) or `~/Projects/dynamicdna-academy` (Mac/Linux).

### Option B: Using Git (if available)

If you have access to the project repository, you can clone it directly using Git commands in your terminal or command prompt.

---

## Step 2: Install Node.js and pnpm

If you don't already have Node.js and pnpm installed, follow these steps:

### Installing Node.js

Visit the official Node.js website at [nodejs.org](https://nodejs.org/) and download the LTS (Long Term Support) version for your operating system. Run the installer and follow the installation wizard. After installation, verify it worked by opening a terminal or command prompt and typing:

```bash
node --version
npm --version
```

You should see version numbers displayed for both commands.

### Installing pnpm

Once Node.js is installed, you can install pnpm globally by running this command in your terminal:

```bash
npm install -g pnpm
```

Verify the installation by checking the version:

```bash
pnpm --version
```

---

## Step 3: Set Up MySQL Database

Now you'll create a new database for the dynamicDNA Academy application using MySQL Workbench.

### Create a New Database

Open MySQL Workbench and connect to your MySQL server. Once connected, create a new database by running this SQL command in a query tab:

```sql
CREATE DATABASE dynamicdna_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

This creates a database named `dynamicdna_academy` with proper character encoding to support all types of text content including emojis and special characters.

### Create a Database User (Optional but Recommended)

For better security, it's recommended to create a dedicated user for this application instead of using the root user. Run these commands in MySQL Workbench:

```sql
CREATE USER 'dynamicdna_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';
GRANT ALL PRIVILEGES ON dynamicdna_academy.* TO 'dynamicdna_user'@'localhost';
FLUSH PRIVILEGES;
```

Replace `your_secure_password_here` with a strong password of your choice. Remember this password as you'll need it in the next step.

### Note Your Database Connection Details

Write down these details as you'll need them shortly:

- **Host:** Usually `localhost` or `127.0.0.1`
- **Port:** Usually `3306` (MySQL default)
- **Database Name:** `dynamicdna_academy`
- **Username:** `dynamicdna_user` (or `root` if you skipped user creation)
- **Password:** The password you set above

---

## Step 4: Configure Environment Variables

The application uses environment variables to store sensitive configuration like database credentials. You need to create a `.env` file in the root of your project folder.

### Create the .env File

Navigate to your project folder (where you extracted the files) and create a new file named exactly `.env` (note the dot at the beginning). Open this file in a text editor like Notepad, VS Code, or any code editor.

### Add Required Configuration

Copy and paste the following configuration into your `.env` file, then replace the placeholder values with your actual database credentials:

```env
# Database Configuration
DATABASE_URL="mysql://dynamicdna_user:your_secure_password_here@localhost:3306/dynamicdna_academy"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-to-random-string"

# OAuth Configuration (for admin login)
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://api.manus.im/oauth/portal"

# Owner Configuration (your admin account)
OWNER_OPEN_ID="your-open-id-from-manus"
OWNER_NAME="Your Name"

# Storage Configuration (for image uploads)
BUILT_IN_FORGE_API_URL="https://api.manus.im"
BUILT_IN_FORGE_API_KEY="your-forge-api-key-from-manus"
VITE_FRONTEND_FORGE_API_URL="https://api.manus.im"
VITE_FRONTEND_FORGE_API_KEY="your-frontend-forge-api-key"

# App Configuration
VITE_APP_TITLE="dynamicDNA Academy"
VITE_APP_LOGO="/logo.svg"
VITE_APP_ID="your-app-id"
```

### Important: Update These Values

**Database URL:** Replace the username, password, host, port, and database name with your actual MySQL credentials. The format is:
```
mysql://username:password@host:port/database_name
```

**JWT_SECRET:** Generate a random string for security. You can use an online generator or just type a long random string of letters, numbers, and symbols.

**OAuth and Storage:** If you want admin login and image uploads to work, you'll need to keep the Manus API keys from your deployed version. You can find these in the Management UI under Settings → Secrets.

---

## Step 5: Install Project Dependencies

Open a terminal or command prompt, navigate to your project folder, and run the following command to install all required packages:

```bash
cd path/to/your/dynamicdna-academy
pnpm install
```

This will download and install all the necessary dependencies for both the frontend and backend. It may take a few minutes depending on your internet connection.

---

## Step 6: Set Up Database Tables

Now you need to create all the database tables required by the application. The project uses Drizzle ORM which can automatically create tables based on the schema.

Run this command in your terminal:

```bash
pnpm db:push
```

This command will read the database schema from `drizzle/schema.ts` and create all necessary tables in your MySQL database. You should see output indicating that tables were created successfully.

### Verify Tables Were Created

Open MySQL Workbench, refresh the SCHEMAS sidebar (click the refresh icon), expand `dynamicdna_academy` → `Tables`, and you should see the following tables:

- `users` - Stores admin user accounts
- `news` - Stores news articles
- `learner_applications` - Stores learner application submissions
- `client_applications` - Stores client application submissions
- `student_stories` - Stores student success stories

---

## Step 7: Create Your Admin Account

To access the admin dashboard, you need to create an admin user account in the database. Open MySQL Workbench and run this SQL command in a query tab:

```sql
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
VALUES (
  'local-admin-001',
  'Your Full Name',
  'your.email@example.com',
  'admin',
  'local',
  NOW(),
  NOW(),
  NOW()
);
```

Replace `'Your Full Name'` and `'your.email@example.com'` with your actual name and email address. This creates a local admin account that you can use to access the admin dashboard.

---

## Step 8: Start the Development Server

Now you're ready to run the application! In your terminal, run:

```bash
pnpm dev
```

This command starts both the frontend and backend development servers. You should see output indicating that the server is running, typically on `http://localhost:3000`.

### What This Command Does

The development server includes hot module replacement, which means any changes you make to the code will automatically refresh in your browser without needing to restart the server. The frontend runs on Vite (fast build tool) and the backend runs on Express with tRPC for API communication.

---

## Step 9: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the dynamicDNA Academy homepage with the orange gradient design.

### Access the Admin Dashboard

To manage content, navigate to:

```
http://localhost:3000/admin
```

Since you're running locally with a local admin account, the OAuth login won't work as expected. You have two options:

**Option A: Modify the Admin Authentication (Recommended for Local Development)**

For local development, you can temporarily bypass the OAuth check. This requires a small code modification which I can help you with if needed.

**Option B: Use the Database Directly**

You can manage content directly through SQL Studio by inserting, updating, and deleting records in the `news` and `student_stories` tables.

---

## Step 10: Test the Application

Now that everything is running, test the key features:

### Test Public Pages

Navigate through the public pages to ensure they load correctly:
- Homepage: `http://localhost:3000/`
- News: `http://localhost:3000/news`
- Student Hub: `http://localhost:3000/student-hub`
- Become a Learner: `http://localhost:3000/become-learner`
- Become a Client: `http://localhost:3000/become-client`

### Test Application Forms

Fill out the "Become a Learner" or "Become a Client" forms and submit them. Then check your database in MySQL Workbench to verify the submissions were saved in the `learner_applications` or `client_applications` tables.

### Add Sample Content

Using MySQL Workbench, add some sample news articles and student stories to see them appear on the public pages. Make sure `dynamicdna_academy` is selected in the SCHEMAS sidebar, then run these queries:

```sql
-- Add a sample news article
INSERT INTO news (title, slug, excerpt, content, category, published, publishedAt, createdAt, updatedAt)
VALUES (
  'Welcome to dynamicDNA Academy',
  'welcome-to-dynamicdna-academy',
  'We are excited to announce the launch of our new digital skills training platform.',
  'Full article content goes here. You can write multiple paragraphs describing your news article.',
  'General',
  1,
  NOW(),
  NOW(),
  NOW()
);

-- Add a sample student story
INSERT INTO student_stories (studentName, program, graduationYear, story, published, createdAt, updatedAt)
VALUES (
  'John Doe',
  'Software Development',
  2024,
  'After completing the Software Development program, I landed my dream job as a full-stack developer at a leading tech company.',
  1,
  NOW(),
  NOW()
);
```

After adding these records, refresh the News and Student Hub pages to see your content displayed.

---

## Common Issues and Solutions

### Issue: "Cannot connect to database"

**Solution:** Double-check your `DATABASE_URL` in the `.env` file. Ensure MySQL is running and the credentials are correct. Test your connection in MySQL Workbench first.

### Issue: "Port 3000 is already in use"

**Solution:** Another application is using port 3000. Either stop that application or change the `PORT` value in your `.env` file to a different number like `3001`, then access the app at `http://localhost:3001`.

### Issue: "pnpm: command not found"

**Solution:** pnpm is not installed or not in your system PATH. Run `npm install -g pnpm` to install it globally.

### Issue: Tables are not created after running db:push

**Solution:** Check that your `DATABASE_URL` is correct and that you have proper permissions on the database. Try running the command again with verbose output: `pnpm db:push --verbose`.

### Issue: Images are not uploading

**Solution:** Image uploads require the Manus storage API keys. If you want to use local image storage instead, you'll need to modify the upload configuration. Alternatively, keep using the Manus storage service by ensuring the `BUILT_IN_FORGE_API_KEY` is set correctly in your `.env` file.

---

## Development Workflow

Once your local environment is set up, here's the typical development workflow:

### Making Code Changes

Edit any files in the `client/src` folder for frontend changes or `server` folder for backend changes. The development server will automatically reload your changes in the browser.

### Updating the Database Schema

If you modify the database schema in `drizzle/schema.ts`, run `pnpm db:push` again to apply the changes to your MySQL database.

### Running Tests

To ensure your changes don't break existing functionality, run the test suite:

```bash
pnpm test
```

This will run all unit tests and show you which tests pass or fail.

### Building for Production

When you're ready to deploy your changes, build the production version:

```bash
pnpm build
```

This creates optimized production files in the `dist` folder.

---

## Next Steps

Now that you have the project running locally, you can:

**Customize the Design:** Modify colors, fonts, and layouts in `client/src/index.css` and component files to match your brand identity.

**Add New Features:** Extend the application with additional functionality like course management, student dashboards, or payment integration.

**Populate Content:** Add real news articles, student stories, and other content through the admin dashboard or directly in the database.

**Deploy to Production:** When ready, you can deploy your local changes back to the Manus platform or to your own hosting provider.

---

## Getting Help

If you encounter any issues during setup or development, you can:

- Check the error messages in your terminal for specific details about what went wrong
- Review the database logs in SQL Studio to debug database-related issues
- Examine the browser console (F12 in most browsers) for frontend errors
- Refer back to this guide for configuration and setup steps

---

**Author:** Manus AI  
**Last Updated:** November 19, 2025

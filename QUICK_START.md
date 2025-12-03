# Quick Start Guide - dynamicDNA Academy Local Setup

This is a condensed version of the setup process. For detailed explanations, see `LOCAL_SETUP_GUIDE.md`.

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] MySQL 8+ installed and running
- [ ] MySQL Workbench installed

---

## 5-Minute Setup

### 1. Download Project Files

Download the project from the Manus Management UI (Code panel → Download All Files) and extract to your desired location.

### 2. Create Database

Open MySQL Workbench and run these commands in a query tab:

```sql
CREATE DATABASE dynamicdna_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dynamicdna_user'@'localhost' IDENTIFIED BY 'YourPassword123';
GRANT ALL PRIVILEGES ON dynamicdna_academy.* TO 'dynamicdna_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://dynamicdna_user:YourPassword123@localhost:3306/dynamicdna_academy"
JWT_SECRET="your-random-32-char-secret-key-here"
PORT=3000
NODE_ENV=development
```

Generate JWT_SECRET:
```bash
openssl rand -base64 32
```

### 4. Install Dependencies

```bash
cd path/to/dynamicdna-academy
pnpm install
```

### 5. Setup Database Tables

```bash
pnpm db:push
```

### 6. Create Admin User

In MySQL Workbench (make sure `dynamicdna_academy` is selected in SCHEMAS sidebar):

```sql
USE dynamicdna_academy;

INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
VALUES ('local-admin-001', 'Your Name', 'your.email@example.com', 'admin', 'local', NOW(), NOW(), NOW());
```

### 7. Start Development Server

```bash
pnpm dev
```

### 8. Access Application

Open browser to: `http://localhost:3000`

---

## Add Sample Content

To see the website with content, run this in MySQL Workbench:

```sql
USE dynamicdna_academy;

-- Add sample news
INSERT INTO news (title, slug, excerpt, content, category, published, publishedAt, createdAt, updatedAt)
VALUES (
  'Welcome to dynamicDNA Academy',
  'welcome-to-dynamicdna-academy',
  'Launch of our new digital skills training platform.',
  'Full article content here...',
  'General',
  1,
  NOW(),
  NOW(),
  NOW()
);

-- Add sample student story
INSERT INTO student_stories (studentName, program, graduationYear, story, published, createdAt, updatedAt)
VALUES (
  'John Doe',
  'Software Development',
  2024,
  'Success story content here...',
  1,
  NOW(),
  NOW()
);
```

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot connect to database" | Check DATABASE_URL in .env file |
| "Port 3000 in use" | Change PORT in .env to 3001 |
| "pnpm not found" | Run `npm install -g pnpm` |
| Tables not created | Run `pnpm db:push` again |

---

## Useful Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Push database schema changes
pnpm db:push

# Build for production
pnpm build

# Check TypeScript errors
pnpm tsc --noEmit
```

---

## Project Structure

```
dynamicdna-academy/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── lib/        # Utilities
│   └── public/         # Static assets
├── server/             # Backend (Express + tRPC)
│   ├── routers.ts     # API routes
│   ├── db.ts          # Database functions
│   └── _core/         # Core server setup
├── drizzle/           # Database schema
│   └── schema.ts      # Table definitions
└── .env               # Environment variables (create this)
```

---

## Next Steps

1. **Customize Design:** Edit `client/src/index.css` for colors and fonts
2. **Add Content:** Use SQL Studio to add news and stories
3. **Modify Features:** Edit files in `client/src/pages/` and `server/`
4. **Deploy:** Push changes back to Manus or deploy to your own server

---

For detailed explanations and troubleshooting, see:
- `LOCAL_SETUP_GUIDE.md` - Complete setup guide
- `ENV_CONFIGURATION.md` - Environment variables reference
- `database-setup.sql` - Database setup script with sample data

# MySQL Workbench Quick Reference Guide

This guide provides step-by-step instructions for using MySQL Workbench to set up and manage the dynamicDNA Academy database.

---

## Installing MySQL Workbench

MySQL Workbench is the official MySQL database management tool. It's free and available for Windows, Mac, and Linux.

### Download and Install

Visit the official MySQL website at [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/) and download the installer for your operating system. Run the installer and follow the installation wizard. You don't need to create an Oracle account - click "No thanks, just start my download" at the bottom of the page.

---

## Connecting to Your Local MySQL Server

### Step 1: Open MySQL Workbench

Launch MySQL Workbench from your applications menu or start menu.

### Step 2: Create a New Connection

On the home screen, you'll see a section called "MySQL Connections". Click the **+** button next to it to create a new connection.

### Step 3: Configure Connection Settings

Fill in the connection details:

| Field | Value | Notes |
|-------|-------|-------|
| **Connection Name** | Local MySQL Server | Or any name you prefer |
| **Hostname** | localhost | Or 127.0.0.1 |
| **Port** | 3306 | Default MySQL port |
| **Username** | root | Or your MySQL username |
| **Password** | (click "Store in Vault") | Enter your MySQL password |

Click "Store in Vault..." next to Password and enter your MySQL root password (the one you set during MySQL installation).

### Step 4: Test the Connection

Click the **Test Connection** button at the bottom of the dialog. If successful, you'll see a message saying "Successfully made the MySQL connection". Click **OK** to save the connection.

### Step 5: Connect to the Server

Double-click on your newly created connection to connect to the MySQL server. You should now see the main MySQL Workbench interface with a query editor and database navigator.

---

## Creating the dynamicDNA Academy Database

### Step 1: Open a New Query Tab

If a query tab isn't already open, click the **SQL** icon (looks like a document with a lightning bolt) in the toolbar, or press **Ctrl+T** (Windows/Linux) or **Cmd+T** (Mac).

### Step 2: Create the Database

Copy and paste this SQL command into the query editor:

```sql
CREATE DATABASE dynamicdna_academy 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

### Step 3: Execute the Query

Click the lightning bolt icon in the toolbar (or press **Ctrl+Enter** / **Cmd+Enter**) to execute the query. You should see a message in the output panel saying "1 row(s) affected".

### Step 4: Refresh the Schema List

In the left sidebar under "SCHEMAS", click the refresh icon (circular arrows). You should now see `dynamicdna_academy` in the list of databases.

---

## Creating a Database User (Optional but Recommended)

### Step 1: Create the User

In a new query tab, run these commands one at a time:

```sql
CREATE USER 'dynamicdna_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123';
```

Replace `YourSecurePassword123` with a strong password of your choice. **Remember this password** - you'll need it for your `.env` file.

### Step 2: Grant Permissions

```sql
GRANT ALL PRIVILEGES ON dynamicdna_academy.* TO 'dynamicdna_user'@'localhost';
```

### Step 3: Apply the Changes

```sql
FLUSH PRIVILEGES;
```

Execute each command by clicking the lightning bolt icon.

---

## Using the Database

### Step 1: Select the Database

Before running any queries, you need to tell MySQL which database to use. Either:

**Option A:** Double-click on `dynamicdna_academy` in the SCHEMAS sidebar (it will become bold)

**Option B:** Run this command:

```sql
USE dynamicdna_academy;
```

### Step 2: Verify Selection

The selected database name will appear in bold in the SCHEMAS sidebar and in the toolbar at the top of the query editor.

---

## Creating Tables with Drizzle

Instead of manually creating tables, you should use the Drizzle ORM tool that comes with the project. This ensures your database schema matches exactly what the application expects.

### Step 1: Configure Your .env File

Make sure your `.env` file has the correct database connection string:

```env
DATABASE_URL="mysql://dynamicdna_user:YourSecurePassword123@localhost:3306/dynamicdna_academy"
```

Replace `dynamicdna_user` and `YourSecurePassword123` with your actual username and password.

### Step 2: Run the Schema Push Command

Open a terminal in your project folder and run:

```bash
pnpm db:push
```

This will automatically create all the required tables in your database.

### Step 3: Verify Tables Were Created

In MySQL Workbench, refresh the SCHEMAS sidebar (click the refresh icon). Expand `dynamicdna_academy` → `Tables`. You should see these tables:

- `users`
- `news`
- `learner_applications`
- `client_applications`
- `student_stories`

---

## Creating an Admin User

### Step 1: Select the Database

Make sure `dynamicdna_academy` is selected (bold in the SCHEMAS sidebar).

### Step 2: Run the Insert Command

Copy and paste this SQL into a query tab:

```sql
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
VALUES (
  'local-admin-001',
  'Your Full Name',
  'admin@dynamicdna.co.za',
  'admin',
  'local',
  NOW(),
  NOW(),
  NOW()
);
```

**Important:** Replace these values:
- `'Your Full Name'` - Your actual name
- `'admin@dynamicdna.co.za'` - Your email address (you'll use this to log in)

### Step 3: Execute the Query

Click the lightning bolt icon to execute. You should see "1 row(s) affected" in the output.

### Step 4: Verify the User Was Created

Run this query to see your new admin user:

```sql
SELECT * FROM users WHERE role = 'admin';
```

You should see your user record displayed in the results grid.

---

## Adding Sample Data

### Adding a News Article

```sql
INSERT INTO news (title, slug, excerpt, content, category, published, publishedAt, createdAt, updatedAt)
VALUES (
  'Welcome to dynamicDNA Academy',
  'welcome-to-dynamicdna-academy',
  'We are excited to announce the launch of our new digital skills training platform.',
  'Full article content goes here. You can write multiple paragraphs describing your news article. This content will be displayed on the news page of your website.',
  'General',
  1,
  NOW(),
  NOW(),
  NOW()
);
```

### Adding a Student Story

```sql
INSERT INTO student_stories (studentName, program, graduationYear, story, published, createdAt, updatedAt)
VALUES (
  'Thabo Molefe',
  'Software Development',
  2024,
  'After completing the Software Development program at dynamicDNA Academy, I was able to secure my dream job as a software developer. The hands-on training and industry-relevant curriculum prepared me perfectly for the workplace.',
  1,
  NOW(),
  NOW()
);
```

Execute each query separately by clicking the lightning bolt icon.

---

## Viewing Data

### View All Records in a Table

**Option A:** Right-click on a table name in the SCHEMAS sidebar and select "Select Rows - Limit 1000"

**Option B:** Run a SELECT query:

```sql
SELECT * FROM news;
SELECT * FROM users;
SELECT * FROM student_stories;
SELECT * FROM learner_applications;
SELECT * FROM client_applications;
```

### View Only Published Content

```sql
SELECT * FROM news WHERE published = 1;
SELECT * FROM student_stories WHERE published = 1;
```

### View Recent Applications

```sql
SELECT * FROM learner_applications ORDER BY createdAt DESC LIMIT 10;
SELECT * FROM client_applications ORDER BY createdAt DESC LIMIT 10;
```

---

## Editing Data

### Using the Results Grid

After running a SELECT query, you can edit data directly in the results grid:

**Step 1:** Run a SELECT query to display the data you want to edit

**Step 2:** Double-click on a cell in the results grid to edit it

**Step 3:** Make your changes

**Step 4:** Click the **Apply** button at the bottom of the results grid

**Step 5:** Review the SQL that will be executed in the popup dialog

**Step 6:** Click **Apply** to save the changes

### Using UPDATE Queries

You can also update data using SQL commands:

```sql
-- Update a user's role to admin
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';

-- Publish a news article
UPDATE news SET published = 1, publishedAt = NOW() WHERE id = 1;

-- Change application status
UPDATE learner_applications SET status = 'approved' WHERE id = 1;
```

---

## Deleting Data

### Delete a Specific Record

```sql
DELETE FROM news WHERE id = 1;
DELETE FROM student_stories WHERE id = 1;
DELETE FROM learner_applications WHERE id = 1;
```

### Delete All Records from a Table (Be Careful!)

```sql
DELETE FROM learner_applications;
DELETE FROM client_applications;
```

**Warning:** This deletes ALL records from the table. There's no undo!

### Delete Test Data

If you want to start fresh with empty tables:

```sql
-- Delete all applications
DELETE FROM learner_applications;
DELETE FROM client_applications;

-- Delete all content
DELETE FROM news;
DELETE FROM student_stories;

-- Keep admin users, delete regular users
DELETE FROM users WHERE role != 'admin';
```

---

## Useful MySQL Workbench Features

### Multiple Query Tabs

You can have multiple query tabs open at once. Press **Ctrl+T** (Windows/Linux) or **Cmd+T** (Mac) to open a new tab. This is useful for keeping different queries organized.

### Query History

MySQL Workbench keeps a history of all queries you've executed. Click the **History** tab at the bottom of the window to see previous queries. Double-click any query to load it into the editor.

### Export Data

To export data from a table:

**Step 1:** Right-click on a table in the SCHEMAS sidebar

**Step 2:** Select **Table Data Export Wizard**

**Step 3:** Choose export format (CSV, JSON, SQL, etc.)

**Step 4:** Follow the wizard to export the data

### Import Data

To import data from a CSV or SQL file:

**Step 1:** Right-click on a table in the SCHEMAS sidebar

**Step 2:** Select **Table Data Import Wizard**

**Step 3:** Choose your file and follow the wizard

### SQL Formatting

To format your SQL code nicely:

**Step 1:** Select the SQL code you want to format

**Step 2:** Right-click and select **Beautify Query** (or press **Ctrl+B** / **Cmd+B**)

---

## Common Tasks Reference

| Task | SQL Command |
|------|-------------|
| **Show all databases** | `SHOW DATABASES;` |
| **Use a database** | `USE dynamicdna_academy;` |
| **Show all tables** | `SHOW TABLES;` |
| **Describe table structure** | `DESCRIBE users;` |
| **Count records** | `SELECT COUNT(*) FROM news;` |
| **View recent records** | `SELECT * FROM news ORDER BY createdAt DESC LIMIT 10;` |
| **Search by email** | `SELECT * FROM users WHERE email LIKE '%@example.com';` |
| **Check admin users** | `SELECT * FROM users WHERE role = 'admin';` |

---

## Troubleshooting

### Can't Connect to MySQL Server

**Check if MySQL is running:**
- Windows: Open Services and look for "MySQL80" (or similar)
- Mac: Open System Preferences → MySQL
- Linux: Run `sudo systemctl status mysql`

**Verify connection details:**
- Hostname should be `localhost` or `127.0.0.1`
- Port should be `3306` (default)
- Username and password must be correct

### "Access Denied" Error

Make sure you're using the correct username and password. If you forgot your root password, you may need to reset it (search online for "reset MySQL root password" for your operating system).

### Database Not Showing Up

Click the refresh icon in the SCHEMAS sidebar. If it still doesn't appear, make sure you executed the CREATE DATABASE command successfully.

### Tables Not Created After db:push

Check your `.env` file to make sure the `DATABASE_URL` is correct. Also check the terminal output for error messages when running `pnpm db:push`.

### Can't Edit Data in Results Grid

Some queries return read-only results. Try using an UPDATE query instead, or make sure your SELECT query includes a primary key column.

---

## Best Practices

**Always Use Transactions for Important Changes:** When making multiple related changes, wrap them in a transaction so you can roll back if something goes wrong.

**Back Up Your Database Regularly:** Use MySQL Workbench's export feature to create backups before making major changes.

**Use Descriptive Names:** When creating test data, use descriptive names and values so you can easily identify test vs. real data.

**Keep Queries Organized:** Save frequently-used queries in separate files or use MySQL Workbench's snippets feature.

**Test Queries on Sample Data First:** Before running UPDATE or DELETE queries on production data, test them on a copy or with a WHERE clause that limits the scope.

---

**Author:** Manus AI  
**Last Updated:** November 19, 2025

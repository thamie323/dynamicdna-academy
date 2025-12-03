# Environment Configuration Reference

This document explains all environment variables needed for running dynamicDNA Academy locally.

---

## Required Environment Variables

When running the project locally, you need to create a `.env` file in the root directory with the following configuration:

### Database Configuration

```env
DATABASE_URL="mysql://username:password@host:port/database_name"
```

**Description:** MySQL database connection string  
**Example:** `mysql://dynamicdna_user:mypassword123@localhost:3306/dynamicdna_academy`  
**Required:** Yes  
**Format:** `mysql://[username]:[password]@[host]:[port]/[database]`

Replace the placeholders:
- `username` - Your MySQL username (e.g., `dynamicdna_user` or `root`)
- `password` - Your MySQL password
- `host` - Database server address (usually `localhost` or `127.0.0.1`)
- `port` - MySQL port (usually `3306`)
- `database` - Database name (e.g., `dynamicdna_academy`)

### Server Configuration

```env
PORT=3000
NODE_ENV=development
```

**PORT:** The port number for the development server (default: 3000)  
**NODE_ENV:** Environment mode (`development` or `production`)

### Security Configuration

```env
JWT_SECRET="your-random-secret-key-here"
```

**Description:** Secret key for JWT token generation and validation  
**Required:** Yes  
**How to generate:** Run `openssl rand -base64 32` in terminal, or use any random string (minimum 32 characters)  
**Example:** `JWT_SECRET="8f7d6e5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7"`

---

## Optional Environment Variables

These variables are needed for specific features. The application will work without them, but some features will be limited.

### OAuth Configuration (for Admin Login)

```env
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://api.manus.im/oauth/portal"
OWNER_OPEN_ID="your-open-id"
OWNER_NAME="Your Name"
```

**Purpose:** Enable OAuth-based admin authentication  
**Note:** For local development, you can skip this and access the database directly or modify the auth check

### Storage Configuration (for Image Uploads)

```env
BUILT_IN_FORGE_API_URL="https://api.manus.im"
BUILT_IN_FORGE_API_KEY="your-api-key"
VITE_FRONTEND_FORGE_API_URL="https://api.manus.im"
VITE_FRONTEND_FORGE_API_KEY="your-frontend-api-key"
```

**Purpose:** Enable S3 image uploads through Manus storage service  
**Note:** Without these keys, image uploads won't work. You can still add images by inserting URLs directly in the database

### Application Configuration

```env
VITE_APP_TITLE="dynamicDNA Academy"
VITE_APP_LOGO="/logo.svg"
VITE_APP_ID="your-app-id"
```

**Purpose:** Customize application branding  
**Note:** These are optional and have default values

---

## Creating Your .env File

### Step 1: Create the File

In your project root directory, create a new file named `.env` (note the dot at the beginning).

### Step 2: Add Minimum Required Configuration

For basic local development, you only need:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/dynamicdna_academy"
JWT_SECRET="generate-a-random-string-here-minimum-32-characters-long"
PORT=3000
NODE_ENV=development
```

### Step 3: Test the Configuration

After creating the `.env` file, run:

```bash
pnpm dev
```

If the server starts successfully, your configuration is correct.

---

## Troubleshooting

### Error: "Cannot connect to database"

Check your `DATABASE_URL`:
- Ensure MySQL is running
- Verify the username and password are correct
- Confirm the database exists (create it if not)
- Test the connection in SQL Studio first

### Error: "JWT_SECRET is required"

Add a `JWT_SECRET` to your `.env` file. Generate one using:

```bash
openssl rand -base64 32
```

Or use any random string with at least 32 characters.

### Error: "Port 3000 is already in use"

Change the `PORT` value in your `.env` file:

```env
PORT=3001
```

Then access the application at `http://localhost:3001`

---

## Security Best Practices

**Never commit .env files:** The `.env` file is already in `.gitignore` to prevent accidental commits. Never share your `.env` file publicly.

**Use strong secrets:** Generate random, complex strings for `JWT_SECRET` and other sensitive values.

**Different environments:** Use different `.env` files for development, staging, and production environments.

**Backup your configuration:** Keep a secure backup of your `.env` file, but never store it in version control.

---

## Example .env File for Local Development

Here's a complete example for local development:

```env
# Database
DATABASE_URL="mysql://dynamicdna_user:MySecurePass123@localhost:3306/dynamicdna_academy"

# Server
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET="8f7d6e5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7"

# App Configuration (optional)
VITE_APP_TITLE="dynamicDNA Academy"
VITE_APP_LOGO="/logo.svg"
```

This minimal configuration is sufficient to run the application locally with your own MySQL database.

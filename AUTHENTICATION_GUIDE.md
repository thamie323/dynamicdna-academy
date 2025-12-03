# Authentication Guide - dynamicDNA Academy

This guide explains how authentication works in the dynamicDNA Academy application and how to log in as an admin in different environments.

---

## Authentication Overview

The dynamicDNA Academy application uses two different authentication methods depending on the environment:

| Environment | Authentication Method | Login URL |
|-------------|----------------------|-----------|
| **Production (Manus Platform)** | OAuth 2.0 via Manus | Automatic via header button |
| **Local Development** | Email-based login | `http://localhost:3000/local-login` |

---

## Production Authentication (OAuth)

When the application is deployed on the Manus platform, it uses OAuth authentication through the Manus API. This provides secure, enterprise-grade authentication with support for multiple login providers (Google, GitHub, etc.).

### How It Works

When a user clicks the "Become a Client" button in the header (or any login trigger), they are redirected to the Manus OAuth portal. After successful authentication, they are redirected back to the application with a session token. The application checks if the user's role is "admin" in the database to grant access to the admin dashboard.

### Setting Up Admin Access in Production

After logging in for the first time on the production site, you need to manually set your role to "admin" in the database:

**Step 1:** Log in to the website using the "Become a Client" button in the header. This creates your user account in the database.

**Step 2:** Open the Management UI (right sidebar) and navigate to the **Database** panel.

**Step 3:** Find the `users` table and locate your user record (search by your email address).

**Step 4:** Edit your user record and change the `role` field from `user` to `admin`.

**Step 5:** Refresh the page and navigate to `/admin` to access the admin dashboard.

**Alternative:** You can also use MySQL Workbench to update your role:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your.email@example.com';
```

---

## Local Development Authentication

When running the application locally on your computer, OAuth authentication won't work because it requires the Manus platform infrastructure. Instead, you can use the local development login page.

### How to Log In Locally

**Step 1: Create an Admin User in Your Database**

Before you can log in, you need to have an admin user in your local MySQL database. Open MySQL Workbench and run this command in a query tab:

```sql
USE dynamicdna_academy;

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

Replace `'Your Full Name'` and `'admin@dynamicdna.co.za'` with your actual name and email address.

**Step 2: Start the Development Server**

Make sure your local development server is running:

```bash
pnpm dev
```

**Step 3: Navigate to the Local Login Page**

Open your browser and go to:

```
http://localhost:3000/local-login
```

**Step 4: Enter Your Email**

Enter the email address you used when creating the admin user in Step 1 (e.g., `admin@dynamicdna.co.za`).

**Step 5: Click Login**

Click the "Login" button. If the email exists in your database and the user has the "admin" role, you will be logged in and redirected to the admin dashboard.

**Step 6: Access the Admin Dashboard**

After successful login, you can navigate to:

```
http://localhost:3000/admin
```

You should now see the admin dashboard with options to manage news, applications, and student stories.

---

## Security Notes

### Local Login Security

The local login feature is **only available in development mode** (`NODE_ENV=development`). If you try to use it in production, you will receive a 403 Forbidden error. This is a security measure to prevent unauthorized access in production environments.

The local login endpoint checks:
- The environment is set to development
- The email exists in the database
- The user has the "admin" role
- The user account is active

### Production Security

In production, authentication is handled by the Manus OAuth system, which provides:
- Secure token-based authentication
- Support for multiple identity providers
- Automatic session management
- CSRF protection
- Secure cookie handling

---

## Troubleshooting

### Issue: "User not found" error when logging in locally

**Solution:** Make sure you have created an admin user in your local database. Run the SQL command from Step 1 above in MySQL Workbench, or check that the email you're entering matches exactly what's in the database.

### Issue: "Access denied. Only admin users can log in"

**Solution:** Your user exists but doesn't have the admin role. Update the user's role in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your.email@example.com';
```

### Issue: "Local login is only available in development mode"

**Solution:** Check your `.env` file and ensure `NODE_ENV=development` is set. If you're running in production mode locally, change it to development and restart the server.

### Issue: Can't access `/admin` even after logging in

**Solution:** Clear your browser cookies and log in again. The session cookie might be corrupted or expired.

### Issue: OAuth login doesn't work locally

**Solution:** OAuth requires the Manus platform infrastructure and won't work in local development. Use the local login page at `/local-login` instead.

---

## Authentication Flow Diagrams

### Production Authentication Flow

```
User clicks login button
  ↓
Redirected to Manus OAuth portal
  ↓
User logs in with Google/GitHub/etc.
  ↓
Manus validates credentials
  ↓
User redirected back to app with auth code
  ↓
App exchanges code for session token
  ↓
App creates/updates user in database
  ↓
Session cookie set
  ↓
User can access admin dashboard (if role = admin)
```

### Local Development Authentication Flow

```
User navigates to /local-login
  ↓
User enters email address
  ↓
App checks if email exists in database
  ↓
App verifies user has admin role
  ↓
App creates session token
  ↓
Session cookie set
  ↓
User redirected to /admin dashboard
```

---

## Managing Admin Users

### Adding New Admin Users

**In Production:**
1. Have the new admin log in once using OAuth (creates their user account)
2. Use the Database panel in Management UI to change their role to "admin"

**In Local Development:**
1. Insert a new user directly in MySQL Workbench with `role = 'admin'`
2. The new admin can then log in at `/local-login` with their email

```sql
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
VALUES ('local-admin-002', 'New Admin Name', 'newadmin@example.com', 'admin', 'local', NOW(), NOW(), NOW());
```

### Removing Admin Access

To revoke admin access, change the user's role in the database:

```sql
UPDATE users SET role = 'user' WHERE email = 'user.email@example.com';
```

### Checking Current Admin Users

To see all admin users in your database:

```sql
SELECT id, name, email, role, lastSignedIn FROM users WHERE role = 'admin';
```

---

## Best Practices

**Use Strong Passwords:** When creating database users, always use strong, unique passwords.

**Limit Admin Access:** Only grant admin role to users who absolutely need it. Regular users should have `role = 'user'`.

**Regular Security Audits:** Periodically review the list of admin users and remove access for users who no longer need it.

**Separate Environments:** Never use production database credentials in your local development environment.

**Session Management:** Sessions expire after one year by default. Users will need to log in again after expiration.

---

## Quick Reference

### Local Development Login

- **URL:** `http://localhost:3000/local-login`
- **Required:** Email address that exists in database with `role = 'admin'`
- **Environment:** Only works when `NODE_ENV=development`

### Production Login

- **URL:** Click "Become a Client" button in header
- **Required:** Manus account (Google, GitHub, etc.)
- **Admin Setup:** Manually set `role = 'admin'` in Database panel after first login

### Admin Dashboard

- **URL:** `/admin`
- **Access:** Requires authentication + `role = 'admin'`
- **Features:** Manage news, applications, student stories

---

**Author:** Manus AI  
**Last Updated:** November 19, 2025

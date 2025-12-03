# dynamicDNA-Academy Website - Setup Instructions

This is a React 19 + Vite + TypeScript project with Tailwind CSS 4 and shadcn/ui components.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm
- **Visual Studio Code** (recommended) - [Download here](https://code.visualstudio.com/)

## Installation Steps

### 1. Extract the Project
Extract the `dynamicdna-academy.zip` file to your desired location.

### 2. Install pnpm (if not already installed)
Open your terminal/command prompt and run:
```bash
npm install -g pnpm
```

### 3. Install Dependencies
Navigate to the project directory and install dependencies:
```bash
cd dynamicdna-academy
pnpm install
```

### 4. Start the Development Server
Run the development server:
```bash
pnpm dev
```

The website will be available at: `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint to check code quality

## Project Structure

```
dynamicdna-academy/
├── client/                 # Frontend application
│   ├── public/            # Static assets (images, logo)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/        # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── Learnerships.tsx
│   │   │   ├── Corporate.tsx
│   │   │   ├── FourIRFourHer.tsx
│   │   │   ├── Newsletters.tsx
│   │   │   └── Contact.tsx
│   │   ├── App.tsx       # Main app component with routing
│   │   ├── index.css     # Global styles & theme
│   │   └── main.tsx      # Entry point
│   └── index.html        # HTML template
├── package.json          # Dependencies
└── vite.config.ts       # Vite configuration
```

## Customization

### Updating Logo
Replace `/client/public/logo.png` with your own logo file.

### Changing Colors
Edit the color variables in `/client/src/index.css` under the `:root` section.

### Modifying Content
- Edit page components in `/client/src/pages/`
- Update contact information in `/client/src/components/Header.tsx` and `/client/src/components/Footer.tsx`

## Building for Production

To create a production build:
```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment.

## Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
pnpm dev --port 3001
```

### Dependencies Issues
If you encounter dependency issues, try:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
Ensure you're using Node.js v18 or higher and restart your IDE.

## Support

For questions or issues, please contact:
- Email: enquiries@dynamicdna.co.za
- Phone: +27 (0) 11 759 5940

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Wouter** - Routing
- **Lucide React** - Icons

---

**Note:** This is a static frontend application. All forms currently show success messages without actual backend processing. To add backend functionality, you would need to implement API endpoints.

# Project Structure: NutriFlow (React Vite Landing Page with Admin Panel)

This document outlines the proposed project structure for NutriFlow, a web application consisting of a public-facing landing page and a secure admin panel. The project will leverage React with Vite for fast development, TypeScript for type safety, Next.js 15 for routing and server-side capabilities (if needed for the admin panel), NextAuth for authentication, Prisma ORM for database interaction, and Tailwind CSS for styling.

## 1. Overall Structure

The project will be organized into a monorepo-like structure within the `src` directory, separating the public-facing application (landing page) from the authenticated admin panel.

```
nutriflow-fe/
├── public/
│   └── ... (static assets like favicon, images)
├── src/
│   ├── api/                  # API service definitions (e.g., Axios instances, API calls)
│   ├── assets/               # Shared assets (images, icons, fonts)
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Generic components (buttons, modals, inputs)
│   │   ├── layout/           # Layout components (header, footer, sidebar)
│   │   └── ui/               # Tailwind UI components or custom styled components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions, helpers, constants
│   │   ├── auth/             # NextAuth configuration and helpers
│   │   ├── prisma/           # Prisma client setup (if client-side interaction is needed, otherwise backend)
│   │   └── utils/            # General utility functions
│   ├── pages/                # Top-level pages for routing
│   │   ├── admin/            # Admin panel pages
│   │   │   ├── dashboard/
│   │   │   │   └── index.tsx
│   │   │   ├── users/
│   │   │   │   └── index.tsx
│   │   │   ├── products/
│   │   │   │   └── index.tsx
│   │   │   └── ...
│   │   ├── auth/             # Authentication related pages (login, register)
│   │   │   ├── signin.tsx
│   │   │   └── signup.tsx
│   │   ├── landing/          # Landing page sections/components
│   │   │   ├── index.tsx     # Main landing page
│   │   │   ├── about.tsx
│   │   │   ├── features.tsx
│   │   │   └── contact.tsx
│   │   └── _app.tsx          # Custom App component (for Next.js)
│   │   └── _document.tsx     # Custom Document component (for Next.js)
│   ├── styles/               # Global styles, Tailwind CSS configuration
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── types/                # TypeScript type definitions
│   ├── App.tsx               # Main application component (for Vite)
│   ├── main.tsx              # Entry point for Vite application
│   └── vite-env.d.ts         # Vite environment types
├── .env                      # Environment variables
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore file
├── .prettierrc.js            # Prettier configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project README
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── yarn.lock / package-lock.json # Dependency lock file
```

## 2. Key Areas and Technologies

### 2.1. Landing Page (`src/pages/landing`)
- **Purpose:** Publicly accessible, marketing-focused content.
- **Technologies:** React, TypeScript, Tailwind CSS.
- **Components:**
    - `HeroSection.tsx`
    - `FeaturesSection.tsx`
    - `AboutSection.tsx`
    - `TestimonialsSection.tsx`
    - `ContactSection.tsx`
    - `Footer.tsx`
    - `Navbar.tsx`
- **Routing:** Client-side routing using `react-router-dom` or similar, if multiple landing pages are needed. For a single-page landing, internal anchor links will suffice.

### 2.2. Admin Panel (`src/pages/admin`)
- **Purpose:** Secure, authenticated interface for managing application data.
- **Technologies:** React, TypeScript, Tailwind CSS, Next.js 15 (for routing, API routes, and server-side rendering/static generation), NextAuth.js, Prisma ORM (backend integration).
- **Components:**
    - `Sidebar.tsx`
    - `AdminHeader.tsx`
    - `DashboardWidgets.tsx`
    - `Table.tsx` (reusable for data display)
    - `Form.tsx` (reusable for data input)
- **Routing:** Next.js file-system based routing.
- **Authentication:** NextAuth.js for secure user authentication (providers, sessions, callbacks).
- **State Management:** React Context API or a lightweight library like Zustand/Jotai for local state. For global state, consider Redux Toolkit if complexity grows.
- **API Integration:** Fetch data from a backend API (e.g., using `fetch` or `axios`). Next.js API routes can serve as the backend for the admin panel.

### 2.3. Shared Components (`src/components`)
- **Purpose:** Reusable UI elements across both landing page and admin panel.
- **Examples:** `Button.tsx`, `Input.tsx`, `Modal.tsx`, `LoadingSpinner.tsx`, `Card.tsx`.

### 2.4. Utilities and Hooks (`src/lib`, `src/hooks`)
- **`src/lib/utils`:** Helper functions (e.g., date formatting, validation).
- **`src/lib/auth`:** NextAuth configuration, session management helpers.
- **`src/hooks`:** Custom React hooks for common logic (e.g., `useAuth`, `useForm`, `useDebounce`).

### 2.5. Styling (`src/styles`)
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **`globals.css`:** Base styles, custom CSS variables, and Tailwind directives.
- **`tailwind.config.js`:** Customizing Tailwind's default theme (colors, fonts, spacing).

## 3. Development Workflow

1.  **Setup:** Install dependencies (`npm install` or `yarn install`).
2.  **Development Server:** `npm run dev` (Vite for landing page, Next.js for admin panel if separate).
3.  **Build:** `npm run build`.
4.  **Linting/Formatting:** ESLint and Prettier for code quality and consistency.

## 4. Future Considerations

-   **Database:** Prisma ORM will be used for database interactions on the backend.
-   **Deployment:** Vercel for Next.js (admin panel) and Netlify/Vercel for the static landing page.
-   **Testing:** Jest/React Testing Library for unit and integration tests.
-   **CI/CD:** GitHub Actions for automated testing and deployment.

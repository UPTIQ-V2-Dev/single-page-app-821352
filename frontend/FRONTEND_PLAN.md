# Single Page Application Implementation Plan
## React 19 + Vite + Shadcn + Tailwind v4

### Technology Stack
- **React 19** with new features (concurrent rendering, server components ready)
- **Vite** for fast development and build
- **Shadcn/ui** component library (already configured)
- **Tailwind CSS v4** for styling
- **TypeScript** for type safety
- **React Query** for state management and API calls
- **React Hook Form** with Zod validation

---

## Single Page Implementation Structure

### 1. Main Application Layout
**Files to implement:**
- `src/App.tsx` (main container)
- `src/components/layout/AppLayout.tsx` (header, main content area)
- `src/components/layout/Header.tsx` (navigation, branding)
- `src/components/layout/Footer.tsx` (footer content)

**Features:**
- Responsive layout with header/main/footer structure
- Theme toggle (light/dark mode using next-themes)
- Navigation menu for different sections

### 2. Authentication System
**Files to implement:**
- `src/pages/LoginPage.tsx` (login form with email/password)
- `src/pages/SignupPage.tsx` (registration form)
- `src/hooks/useAuth.ts` (authentication state management)
- `src/components/auth/ProtectedRoute.tsx` (route protection)

**Features:**
- Email/password login with validation
- User registration
- JWT token management with refresh
- Protected routes for authenticated content
- Automatic redirect on token expiry

### 3. Core Application Sections
Since this is a single page app, implement as sections within the same page:

#### Section Components
- `src/components/sections/HeroSection.tsx` (landing/intro)
- `src/components/sections/FeaturesSection.tsx` (key features)
- `src/components/sections/AboutSection.tsx` (about content)
- `src/components/sections/ContactSection.tsx` (contact form)

### 4. Reusable Components
**UI Components** (using existing shadcn components):
- `src/components/common/LoadingSpinner.tsx`
- `src/components/common/ErrorBoundary.tsx` 
- `src/components/common/Toast.tsx` (using sonner)

**Form Components:**
- `src/components/forms/ContactForm.tsx` (with react-hook-form + zod)
- `src/components/forms/NewsletterForm.tsx`

### 5. Data Layer
**API Integration:**
- `src/lib/api.ts` (extend existing - contact form submission)
- `src/hooks/useContactForm.ts` (React Query mutation)
- `src/hooks/useNewsletter.ts` (subscription handling)

**Types:**
- `src/types/contact.ts` (contact form data)
- `src/types/app.ts` (general app types)

### 6. Utilities & Configuration
**Utilities:**
- `src/lib/validations.ts` (Zod schemas for forms)
- `src/lib/animations.ts` (Tailwind animation utilities)
- `src/hooks/useScrollToSection.ts` (smooth scroll navigation)
- `src/hooks/useIntersectionObserver.ts` (scroll animations)

### 7. Styling & Assets
**Styles:**
- `src/styles/animations.css` (custom animations)
- Update `src/styles/index.css` (global styles)

**Assets:**
- `public/images/` (hero images, feature icons)
- `public/icons/` (custom icons if needed)

### 8. State Management
**Context/Providers:**
- `src/providers/AppProviders.tsx` (wraps React Query, Theme)
- `src/context/AppContext.tsx` (global app state if needed)

### 9. Testing
**Test Files:**
- `src/test/components/sections/HeroSection.test.tsx`
- `src/test/components/forms/ContactForm.test.tsx`
- `src/test/hooks/useContactForm.test.tsx`

---

## API Endpoints Required

### Authentication API
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh-tokens` - Refresh access token
- `POST /auth/logout` - User logout

### Contact Form API
- `POST /api/contact` - Submit contact form
- Response: `{ success: boolean, message: string }`

### Newsletter API  
- `POST /api/newsletter` - Subscribe to newsletter
- Response: `{ success: boolean, message: string }`

---

## Implementation Phases

### Phase 1: Layout & Structure
1. Update App.tsx with main layout
2. Create Header with navigation
3. Implement section-based routing/scrolling
4. Add theme toggle functionality

### Phase 2: Content Sections
1. Hero section with CTA
2. Features section with cards
3. About section with content
4. Contact section with form

### Phase 3: Forms & Interactions
1. Contact form with validation
2. Newsletter subscription
3. API integration with React Query
4. Error handling and loading states

### Phase 4: Polish & Animations
1. Smooth scroll navigation
2. Intersection observer animations  
3. Loading states and transitions
4. Mobile responsiveness optimization

### Phase 5: Testing & Optimization
1. Unit tests for components
2. Integration tests for forms
3. Performance optimization
4. Accessibility improvements

---

## Key React 19 Features to Utilize
- **Concurrent rendering** for smooth animations
- **Automatic batching** for better performance
- **New hooks** (useId, useDeferredValue for search)
- **Suspense boundaries** for loading states
- **Server Component patterns** (preparation for future SSR)

---

## Folder Structure Overview
```
src/
├── components/
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections  
│   ├── forms/          # Form components
│   ├── common/         # Reusable components
│   └── ui/            # Shadcn components (existing)
├── hooks/              # Custom hooks
├── lib/               # Utilities & API
├── providers/         # Context providers
├── styles/           # CSS files
├── types/            # TypeScript types
└── test/             # Test files
```

This plan creates a modern, performant single page application leveraging React 19's latest features while maintaining clean architecture and excellent user experience.
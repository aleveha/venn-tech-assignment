# Venn Take-Home Assignment – Onboarding Form

A production-ready React TypeScript onboarding form with comprehensive validation, API integration, and test coverage.

## Preview

https://venn-tech-assignment.vercel.app/

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests with coverage
pnpm test:coverage
```

**Available Scripts**: `dev`, `build`, `preview`, `lint`, `format`, `test`, `test:run`, `test:ui`, `test:coverage`

---

## 📋 What's Implemented

### Features

- **Form Fields**: First name, last name, phone (Canadian format), corporation number
- **Validation**: Real-time on blur, synchronous (Valibot) + asynchronous (API)
- **API Integration**: Corporation validation with caching, form submission
- **User Feedback**: Toast notifications for success/error states
- **Testing**: 92% coverage with integration tests (31 tests)
- **Accessibility**: ARIA attributes, proper labels, keyboard navigation
- **Type Safety**: Full TypeScript strict mode

### Tech Stack Choices

| Technology     | Choice             | Why?                                          | Alternative Considered                         |
| -------------- | ------------------ | --------------------------------------------- | ---------------------------------------------- |
| **Validation** | Valibot            | Smaller budle size, faster in production      | Zod (too heavy, slower)                        |
| **Forms**      | React Hook Form    | Minimal re-renders, proven ecosystem          | TanStack Form (less mature)                    |
| **HTTP**       | Native Fetch       | Zero dependencies, sufficient for 2 endpoints | Axios, TanStack Query (overkill for this task) |
| **UI**         | ShadCN + Tailwind  | Full ownership, customizable                  | MUI (less flexible) or Headless UI             |
| **Testing**    | Vitest + RTL + MSW | Vite-native, integration-focused              | Jest (slower)                                  |

### Architecture: Feature-Sliced Design (FSD)

```
src/
├── app/            # Application setup
├── pages/          # Page components
├── widgets/        # Complex UI blocks (OnboardingForm)
├── features/       # User interactions (validate-corporation, submit-onboarding)
├── entities/       # Business entities (onboarding-user, corporation-validation)
├── shared/         # Reusable utilities (ui, api, lib)
└── test/           # Test infrastructure (MSW setup)
```

**Why FSD?** Scalability, maintainability, clear boundaries, team-friendly structure.

---

## 🏭 What Would Be Different in a Real Production App

### 1. State Management & Data Fetching

**Current**: Local state, native fetch with simple Map cache

**Production**:

- **TanStack Query** for server state (automatic caching, refetching, optimistic updates)
- **Zustand** for global client state
- Persistent cache with `localStorage` or `IndexedDB`

### 2. Routing & Navigation

**Current**: Single page

**Production**:

- **TanStack Router** with code splitting
- Protected routes with authentication guards
- Deep linking support
- Route-level analytics tracking

### 3. Authentication & Authorization

**Current**: None

**Production**:

- **JWT or OAuth 2.0**
- Role-based access control (RBAC)
- Refresh token rotation
- Multi-factor authentication (MFA)
- Session management

### 4. API Architecture

**Current**: Direct fetch calls

**Production** (partially implemented by TanStack Query):

- **Centralized API client** with interceptors
- Automatic retry logic with exponential backoff
- Request deduplication
- Response transformation layer
- Rate limiting and throttling
- Request cancellation on component unmount

### 5. Error Handling & Monitoring

**Current**: Console errors, toast notifications

**Production**:

- **Sentry** or **Datadog** for error tracking
- Custom error boundaries with fallback UI

### 6. Testing Strategy

**Current**: Integration tests (92% coverage)

**Production**:

- **E2E tests**
- **Visual regression tests**
- **Accessibility tests**
- **Performance tests**
- **Contract tests**
- **Load testing**
- Test reports published to dashboard

### 7. CI/CD Pipeline

**Current**: Manual build

**Production**:

- **GitHub Actions** pipeline
- Automated tests on every PR
- Code quality gates (coverage thresholds, bundle size)
- Preview deployments for PRs
- Staging → Production deployment strategy
- Automated rollback on failure
- Deployment notifications (Slack, email)

### 8. User Experience Enhancements

**Current**: Basic form with validation

**Production**:

- **Autosave drafts** to prevent data loss
- Progress indicators for multi-step forms
- Field-level undo/redo
- Form analytics (field completion time, drop-off points)
- Inline help and tooltips

### 9. Internationalization (if needed)

**Current**: English only

**Production**:

- Multi-language support
- Date/time/number formatting per locale
- RTL support for Arabic/Hebrew
- Dynamic locale switching

### 10. Observability

**Current**: None

**Production**:

- **Real User Monitoring (RUM)** - track actual user performance
- Core Web Vitals tracking (LCP, FID, CLS)
- Custom business metrics (form completion rate)
- Feature flag analytics
- A/B testing infrastructure

### 11. Developer Experience

**Current**: Basic setup with Prettier and ESLint

**Production**:

- **Husky** for git hooks (pre-commit, pre-push)
- **Commitlint** for conventional commits
- **Changesets** for versioning and changelogs
- **Renovate** for automated dependency updates
- **Storybook** for component documentation

---

## 📊 Test Coverage

```
Overall: 92.17% coverage
├── Statements:   92.17%
├── Branches:     88.23%
└── Lines:        92.17%

31 tests across 3 files
├── onboarding-form.test.tsx (20 tests)
├── validate-corporation.test.ts (6 tests)
└── submit-onboarding.test.ts (5 tests)
```

---

## 🎯 Key Trade-offs Made

### For This Assignment

**Optimized for**:

- Simplicity and readability
- Fast development time
- Small bundle size
- Core functionality demonstration

⚠️ **Intentionally omitted** (but would include in production):

- Enterprise-scale infrastructure (partially done by using FSD)
- Advanced monitoring and observability
- More complex deployment strategies

---

## 📝 Architecture Highlights

### Why These Choices?

**Feature-Sliced Design**: Provides scalability and clear boundaries without over-engineering for a single form.

**Minimal Dependencies**: Every dependency adds maintenance burden. Only included essentials (React Hook Form, Valibot, ShadCN).

**Integration Tests Over Unit Tests**: Tests user behavior, not implementation details. More resilient to refactoring.

**Native Fetch Over Libraries**: For 2 API endpoints, a full HTTP client is overkill. Added custom caching where needed.

**TypeScript Strict Mode**: Catch errors at compile time, not runtime. Worth the extra type annotations.

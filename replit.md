# Overview

This is a full-stack web application for "Wick Studio," a professional Discord services and digital design studio. The application features a modern, Arabic-language interface with a rating system for customer feedback. It's built as a single-page application with server-side API endpoints for data management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Styling**: Right-to-left (RTL) layout support for Arabic content with custom CSS variables for theming

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for rating submission and retrieval
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Processing**: JSON and URL-encoded body parsing with request logging

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Connection**: Environment-based database URL configuration

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: PostgreSQL session store configured (connect-pg-simple) but not actively used
- **Security**: Basic request validation through Zod schemas

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **Development**: TSX for TypeScript execution, Replit-specific plugins

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS, class-variance-authority for component variants
- **Icons**: Lucide React icons, Font Awesome (via CDN)
- **Fonts**: Google Fonts (Cairo) for Arabic typography

### Database and Validation
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Client**: Neon Database serverless driver
- **Validation**: Zod for schema validation and type inference
- **Migrations**: Drizzle Kit for database schema management

### Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Class Management**: clsx and tailwind-merge for conditional styling
- **Carousel**: Embla Carousel for interactive components
- **Unique IDs**: nanoid for generating unique identifiers

### Development and Deployment
- **Environment**: Replit-optimized with specific plugins for development
- **Error Handling**: Runtime error overlay for development debugging
- **Build Process**: Vite for frontend bundling, ESBuild for backend compilation
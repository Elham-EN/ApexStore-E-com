# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

APex Store is a full-stack e-commerce platform specialized in anime and manga merchandise, built with .NET 9 Web API backend and React 18 TypeScript frontend.

## Architecture

### Backend (.NET 9 Web API)
- **Entry Point**: `/API/Program.cs` - Main configuration and service registration
- **Database**: Entity Framework Core with SQL Server, using Identity for authentication
- **Controllers**: RESTful API controllers in `/API/Controllers/`
- **Models**: Domain entities in `/API/Models/` with Order Aggregate pattern
- **Services**: Business logic in `/API/Services/` (PaymentsService, ImageService)
- **Data**: DbContext and migrations in `/API/Data/`
- **Authentication**: ASP.NET Core Identity with cookie-based auth
- **File Upload**: Cloudinary integration for image management
- **Payments**: Stripe integration

### Frontend (React TypeScript SPA)
- **Entry Point**: `/client/src/main.tsx`
- **App Structure**: `/client/src/app/` contains layout, components, routes
- **Features**: Feature-based organization in `/client/src/features/`
- **State Management**: Redux Toolkit (RTK) with RTK Query for API calls
- **UI Framework**: Material-UI (MUI) with custom theming
- **Routing**: React Router v7
- **Forms**: React Hook Form with Zod validation
- **Build Output**: Vite builds directly to `/API/wwwroot` for single deployment

### Key Architectural Patterns
- **Domain-Driven Design**: Order aggregate pattern in backend
- **Feature Modules**: Frontend organized by business domains
- **Repository Pattern**: EF Core DbContext as repository
- **API Integration**: RTK Query for efficient data fetching with caching
- **Responsive Design**: Material-UI grid system and responsive components

## Development Commands

### Backend (API)
```bash
cd API
dotnet restore                    # Install dependencies
dotnet run                       # Start development server (https://localhost:5001)
dotnet watch run                 # Start with hot reload
dotnet build                     # Build project
dotnet test                      # Run tests
```

### Database Management
```bash
cd API
dotnet ef migrations add <MigrationName>    # Create new migration
dotnet ef database update                   # Apply migrations
dotnet ef database drop                     # Drop database
```

### Frontend (Client)
```bash
cd client
npm install                      # Install dependencies
npm run dev                      # Start development server (localhost:3000)
npm run build                    # Build for production (outputs to ../API/wwwroot)
npm run lint                     # Run ESLint
npm run preview                  # Preview production build
```

## Project Structure

### Backend Key Directories
- `/API/Controllers/` - API endpoints (Products, Basket, Orders, Account, Payments)
- `/API/Models/` - Domain entities and value objects
- `/API/Models/OrderAggregate/` - Order domain aggregate
- `/API/Data/` - DbContext, migrations, and data initialization
- `/API/Services/` - Business services (Payments, Image upload)
- `/API/DTOs/` - Data transfer objects for API responses
- `/API/Extensions/` - Extension methods and utilities
- `/API/RequestHelpers/` - Pagination, filtering, mapping profiles
- `/API/Middleware/` - Custom middleware (Exception handling)

### Frontend Key Directories
- `/client/src/app/` - Core application structure
  - `/components/` - Reusable UI components
  - `/layout/` - App layout components (Navbar, Footer)
  - `/routes/` - Route configuration and guards
  - `/errors/` - Error boundary components
- `/client/src/features/` - Feature modules
  - `/catalog/` - Product browsing and search
  - `/basket/` - Shopping cart functionality
  - `/checkout/` - Order placement and payment
  - `/account/` - User authentication and profile
  - `/orders/` - Order history and details
  - `/admin/` - Administrative functions
  - `/home/` - Landing page and carousel

## Configuration

### Environment Variables
- **Backend**: Configure in `appsettings.Development.json`
  - Database connection string
  - Cloudinary settings for image upload
  - Stripe keys for payments
  - JWT settings for authentication
  - AutoMapper license key

- **Frontend**: Configure in `.env.local`
  - `VITE_API_URL` - Backend API URL
  - `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe public key

### Key Configuration Files
- `/API/appsettings.json` - Production settings
- `/API/appsettings.Development.json` - Development overrides
- `/client/.env.local` - Frontend environment variables
- `/client/vite.config.ts` - Build configuration (outputs to API/wwwroot)

## State Management

### Backend State
- Entity Framework Core manages database state
- Identity system handles user authentication state
- Services are scoped to HTTP requests

### Frontend State
- Redux Toolkit store configuration in `/client/src/app/store/`
- RTK Query API slices for server state management
- Local component state for UI-only state
- React Router state for navigation

## Authentication & Authorization

### Backend
- ASP.NET Core Identity with cookie authentication
- Role-based authorization (Member, Admin)
- Identity API endpoints mapped at `/api` route
- Secure cookie configuration with HTTPS and SameSite

### Frontend
- User state managed via RTK Query
- Route guards in `/client/src/app/routes/`
- Authentication status checked via API calls

## API Structure

All API endpoints are prefixed with `/api`:
- `/api/products` - Product catalog operations
- `/api/basket` - Shopping cart management
- `/api/orders` - Order placement and history
- `/api/payments` - Stripe payment processing
- `/api/account` - User account management (via Identity API)

## Development Workflow

1. **Backend Changes**: Make changes in `/API/`, run `dotnet watch run`
2. **Frontend Changes**: Make changes in `/client/src/`, run `npm run dev`
3. **Database Changes**: Create migration with `dotnet ef migrations add`, then `dotnet ef database update`
4. **Full Build**: Run `npm run build` in client, then `dotnet build` in API
5. **Production Deploy**: Both frontend and backend deploy together since Vite builds to API/wwwroot

## Testing Strategy

### Backend Testing
- Unit tests should be placed in a separate test project
- Use `dotnet test` to run tests
- Focus on service layer and controller logic

### Frontend Testing
- Component tests using React Testing Library
- Run with `npm test`
- Focus on user interactions and component behavior

## Build & Deployment

The application is designed for single-server deployment:
1. Frontend builds into `/API/wwwroot` via Vite
2. Backend serves static files and API endpoints
3. Single deployment artifact contains both frontend and backend
4. Fallback controller serves React app for client-side routing
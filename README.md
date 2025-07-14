# 🌟 APex Store - Anime & Manga E-Commerce Platform

**A modern, full-stack e-commerce platform specialized in anime and manga merchandise**

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-Core-512BD4)](https://docs.microsoft.com/en-us/ef/)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

APex Store is a proof-of-concept e-commerce platform designed specifically for anime and manga enthusiasts. Built with modern web technologies, it provides a seamless shopping experience for customers looking to purchase their favorite anime merchandise, manga volumes, collectibles, and accessories.

### 🎨 What Makes APex Store Special

- **Specialized Catalog**: Curated collection of anime and manga merchandise
- **Modern UX/UI**: Clean, responsive design with Material Design principles
- **Secure Payments**: Integrated Stripe payment processing
- **Real-time Updates**: Live inventory and order status updates
- **Advanced Search**: Powerful filtering by series, genre, price, and more
- **Mobile-First**: Optimized for all devices and screen sizes

## 🛠️ Tech Stack

### Backend (.NET 9 Web API)
- **Framework**: ASP.NET Core 9.0 Web API
- **Language**: C# 12
- **CLI Tool**: .NET CLI for project management
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: .NET Identity for user management
- **API Documentation**: Swagger UI with OpenAPI
- **Payment Processing**: Stripe API integration

### Frontend (React SPA)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Material-UI (MUI) with Material Design
- **State Management**: Redux Toolkit (RTK)
- **API Client**: RTK Query for efficient data fetching
- **Styling**: CSS-in-JS with emotion/styled

### Development Tools
- **IDE**: Visual Studio Code
- **Package Manager**: npm/yarn
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library

## ✨ Features

### 🛒 **E-Commerce Core**
- **Product Catalog**: Browse extensive anime/manga merchandise
- **Shopping Cart**: Add, remove, and modify items
- **Secure Checkout**: Complete purchase flow with Stripe
- **Order Management**: Track order status and history
- **User Accounts**: Registration, login, and profile management

### 🔍 **Advanced Product Discovery**
- **Smart Search**: Find products by name, series, or category
- **Dynamic Filtering**: Filter by price, genre, rating, availability
- **Sorting Options**: Sort by price, popularity, release date, rating
- **Pagination**: Efficient loading of large product catalogs
- **Product Details**: Rich product pages with images and descriptions

### 💳 **Payment & Orders**
- **Stripe Integration**: Secure credit card processing
- **Multiple Payment Methods**: Cards, digital wallets
- **Order Confirmation**: Instant email confirmations
- **Order Tracking**: Real-time status updates
- **Invoice Generation**: Digital receipts and invoices

### 👨‍💼 **Admin Features**
- **Product Management**: Add, edit, delete products
- **Inventory Control**: Stock level management
- **Order Processing**: Fulfill and track orders
- **User Management**: Customer account administration
- **Analytics Dashboard**: Sales and performance metrics

### 🎯 **User Experience**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Fast Loading**: Optimized performance with Vite
- **Offline Support**: Progressive Web App capabilities
- **Accessibility**: WCAG compliant for all users
- **Internationalization**: Multi-language support ready

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **.NET 9 SDK**
- **SQL Server** (LocalDB or Express)
- **Visual Studio Code**
- **Git**

### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/apex-store.git
cd apex-store
```

2. **Setup Backend (API)**
```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
```

3. **Setup Frontend (Client)**
```bash
cd client
npm install
npm run dev
```

4. **Configure Environment Variables**

Create `appsettings.Development.json` in API folder:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ApexStore;Trusted_Connection=true"
  },
  "Stripe": {
    "PublishableKey": "pk_test_your_publishable_key",
    "SecretKey": "sk_test_your_secret_key",
    "WebhookSecret": "whsec_your_webhook_secret"
  },
  "JwtSettings": {
    "TokenKey": "your-super-secret-key-here",
    "Issuer": "APexStore",
    "Audience": "APexStore"
  }
}
```

Create `.env.local` in client folder:
```env
VITE_API_URL=https://localhost:5001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### 🗄️ Database Setup

1. **Create and seed the database**
```bash
cd API
dotnet ef migrations add InitialCreate
dotnet ef database update
```

2. **Seed sample data**
```bash
dotnet run --seed-data
```

## 📚 API Documentation

### Base URL
- **Development**: `https://localhost:5001/api`
- **Production**: `https://your-domain.com/api`

### Authentication
APex Store uses JWT Bearer tokens for authentication.

```http
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### Products
```http
GET    /api/products              # Get all products (paginated)
GET    /api/products/{id}         # Get product by ID
POST   /api/products              # Create product (Admin)
PUT    /api/products/{id}         # Update product (Admin)
DELETE /api/products/{id}         # Delete product (Admin)
GET    /api/products/search       # Search products
```

#### Shopping Cart
```http
GET    /api/cart                  # Get user's cart
POST   /api/cart/items            # Add item to cart
PUT    /api/cart/items/{id}       # Update cart item
DELETE /api/cart/items/{id}       # Remove item from cart
DELETE /api/cart                  # Clear cart
```

#### Orders
```http
GET    /api/orders                # Get user's orders
GET    /api/orders/{id}           # Get order details
POST   /api/orders                # Create order
PUT    /api/orders/{id}/status    # Update order status (Admin)
```

#### Payments
```http
POST   /api/payments/create-intent    # Create Stripe payment intent
POST   /api/payments/webhook          # Stripe webhook endpoint
GET    /api/payments/{id}/status      # Get payment status
```

#### Authentication
```http
POST   /api/account/register      # Register new user
POST   /api/account/login         # User login
POST   /api/account/refresh       # Refresh JWT token
GET    /api/account/profile       # Get user profile
PUT    /api/account/profile       # Update user profile
```

### Swagger UI
Access interactive API documentation at:
- **Development**: `https://localhost:5001/swagger`

## 🛠️ Development

### Backend Development

1. **Run with hot reload**
```bash
cd API
dotnet watch run
```

2. **Create new migration**
```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

3. **Run tests**
```bash
dotnet test
```

### Frontend Development

1. **Start development server**
```bash
cd client
npm run dev
```

2. **Build for production**
```bash
npm run build
```

3. **Run tests**
```bash
npm test
```

4. **Lint code**
```bash
npm run lint
```

### 🔧 Development Tools

- **API Testing**: Use Swagger UI or Postman
- **Database Management**: SQL Server Management Studio or Azure Data Studio
- **Code Formatting**: Prettier and ESLint configured
- **Git Hooks**: Pre-commit hooks for code quality

## 🚀 Deployment

### Production Build

1. **Build Backend**
```bash
cd API
dotnet publish -c Release -o ./publish
```

2. **Build Frontend**
```bash
cd client
npm run build
```

### Environment Configuration

Update production settings in `appsettings.Production.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-production-connection-string"
  },
  "Stripe": {
    "PublishableKey": "pk_live_your_live_publishable_key",
    "SecretKey": "sk_live_your_live_secret_key",
    "WebhookSecret": "whsec_your_live_webhook_secret"
  }
}
```

## 🧪 Testing

### Backend Tests
```bash
cd API
dotnet test --collect:"XPlat Code Coverage"
```

### Frontend Tests
```bash
cd client
npm test -- --coverage
```

## 📊 Performance Features

- **Server-side Pagination**: Efficient handling of large product catalogs
- **Image Optimization**: Compressed and responsive images
- **Caching Strategy**: Redis caching for frequently accessed data
- **CDN Integration**: Static asset delivery optimization
- **Database Indexing**: Optimized queries for fast search and filtering

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTPS Enforcement**: All communications encrypted
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content security policies
- **CORS Configuration**: Secure cross-origin requests

## 🤝 Contributing

We welcome contributions to APex Store! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Style Guidelines

- **Backend**: Follow C# naming conventions and .NET best practices
- **Frontend**: Use TypeScript strict mode and React best practices
- **Comments**: Write clear, concise comments for complex logic
- **Testing**: Maintain test coverage above 80%

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anime/Manga Community**: For inspiration and feedback
- **Open Source Libraries**: Thanks to all the amazing open-source projects
- **Material Design**: For beautiful UI components
- **Stripe**: For secure payment processing
- **Microsoft**: For excellent .NET documentation

---

**Built with ❤️ for the anime and manga community**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)
[![GitHub watchers](https://img.shields.io/github/watchers/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)
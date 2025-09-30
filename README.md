# 🌟 APex Store - Anime Collectibles E-Commerce Platform

**A modern, full-stack e-commerce platform specialized in premium anime character figures and collectibles**

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-Core-512BD4)](https://docs.microsoft.com/en-us/ef/)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

APex Store is a full-stack e-commerce platform designed specifically for anime enthusiasts and collectors. Built with modern web technologies and cloud infrastructure, it provides a seamless shopping experience for customers looking to purchase premium anime character figures from popular series including Dragon Ball, Naruto, and One Piece. The platform features secure payment processing, user authentication, shopping cart management, and an intuitive admin dashboard for inventory management.

## 🛠️ Tech Stack

### Backend (.NET 9 Web API)

- **Framework**: ASP.NET Core 9.0 Web API
- **Language**: C# 12
- **CLI Tool**: .NET CLI for project management
- **Database**: Azure SQL Server with Entity Framework Core
- **ORM**: Entity Framework Core 9.0 (Code-First approach)
- **Authentication**: ASP.NET Core Identity with cookie-based authentication
- **Authorization**: Role-based access control (Member, Admin)
- **API Documentation**: Swagger UI with OpenAPI specification
- **Payment Processing**: Stripe API integration
- **Image Storage**: Cloudinary for product image management
- **Deployment**: Azure App Service

### Frontend (React SPA)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.0 for fast development and optimized builds
- **UI Framework**: Material-UI (MUI) with Material Design
- **State Management**: Redux Toolkit (RTK) with slice pattern
- **API Client**: RTK Query for efficient data fetching and caching
- **Routing**: React Router v7
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: CSS-in-JS with emotion/styled
- **Payment UI**: Stripe Elements for secure checkout

### Cloud Infrastructure

- **Hosting**: Azure App Service (Backend + Frontend)
- **Database**: Azure SQL Server Database
- **Image CDN**: Cloudinary for product images
- **Payment Gateway**: Stripe

### Development Tools

- **IDE**: Visual Studio Code
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **API Testing**: Swagger UI, Postman
- **Database Tools**: Azure Data Studio, SQL Server Management Studio

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **.NET 9 SDK**
- **SQL Server** (LocalDB, Express, or Azure SQL Server)
- **Azure Account** (for cloud deployment)
- **Stripe Account** (for payment processing)
- **Cloudinary Account** (for image management)
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
  "Cloudinary": {
    "CloudName": "your_cloud_name",
    "ApiKey": "your_api_key",
    "ApiSecret": "your_api_secret"
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
VITE_API_URL=https://localhost:7214
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### 🗄️ Database Setup

1. **Create and seed the database**

```bash
cd API
dotnet ef database update
```

The database will be automatically seeded with sample data on first run, including:
- 18 anime character figures (Dragon Ball, Naruto, One Piece)
- 2 test users (bob@test.com and admin@test.com)
- Default password for test accounts: `Pa$$w0rd`

2. **Reset database (if needed)**

```bash
dotnet ef database drop
dotnet ef database update
```

## 📚 API Documentation

### Base URL

- **Development**: `https://localhost:7214/api`
- **Production**: `https://your-domain.com/api`

### Authentication

APex Store uses cookie-based authentication with ASP.NET Core Identity.

### Swagger UI

Access interactive API documentation at:

- **Development**: `https://localhost:7214/swagger`

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

### Azure App Service Deployment

1. **Create Azure Resources**

```bash
# Create Resource Group
az group create --name ApexStore-RG --location eastus

# Create Azure SQL Server
az sql server create --name apexstore-sql --resource-group ApexStore-RG --location eastus --admin-user sqladmin --admin-password YourPassword123!

# Create Azure SQL Database
az sql db create --resource-group ApexStore-RG --server apexstore-sql --name ApexStoreDB --service-objective S0

# Create App Service Plan
az appservice plan create --name ApexStore-Plan --resource-group ApexStore-RG --sku B1 --is-linux

# Create Web App
az webapp create --resource-group ApexStore-RG --plan ApexStore-Plan --name apexstore --runtime "DOTNET|9.0"
```

2. **Build and Deploy**

```bash
# Build Frontend
cd client
npm run build

# Publish Backend (includes frontend from wwwroot)
cd ../API
dotnet publish -c Release -o ./publish

# Deploy to Azure App Service (via Azure CLI or VS Code)
az webapp deployment source config-zip --resource-group ApexStore-RG --name apexstore --src ./publish.zip
```

3. **Configure Production Settings**

Update `appsettings.Production.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:apexstore-sql.database.windows.net,1433;Initial Catalog=ApexStoreDB;Persist Security Info=False;User ID=sqladmin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  },
  "Cloudinary": {
    "CloudName": "your_production_cloud_name",
    "ApiKey": "your_production_api_key",
    "ApiSecret": "your_production_api_secret"
  },
  "Stripe": {
    "PublishableKey": "pk_live_your_live_publishable_key",
    "SecretKey": "sk_live_your_live_secret_key",
    "WebhookSecret": "whsec_your_live_webhook_secret"
  }
}
```

4. **Configure App Service Settings**

```bash
# Set environment variables in Azure App Service
az webapp config appsettings set --resource-group ApexStore-RG --name apexstore --settings ASPNETCORE_ENVIRONMENT="Production"
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

- **Anime Community**: For inspiration and feedback
- **Open Source Libraries**: Thanks to all the amazing open-source projects
- **Material-UI**: For beautiful React UI components
- **Stripe**: For secure payment processing
- **Cloudinary**: For reliable image hosting and management
- **Microsoft Azure**: For robust cloud infrastructure
- **Microsoft**: For excellent .NET and Entity Framework documentation

---

**Built with ❤️ for anime collectors and enthusiasts**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)
[![GitHub watchers](https://img.shields.io/github/watchers/yourusername/apex-store?style=social)](https://github.com/yourusername/apex-store)

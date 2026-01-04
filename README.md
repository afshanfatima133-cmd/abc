# 🛍️ SwapNShare - Modern E-Commerce Marketplace Platform

<div align="center">

![SwapNShare](https://img.shields.io/badge/SwapNShare-Marketplace-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A full-stack e-commerce marketplace platform with an advanced admin dashboard for managing products, orders, vendors, and customer interactions.**

[Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
- [Running The Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Admin Dashboard](#-admin-dashboard)
- [Default Credentials](#-default-credentials)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

**SwapNShare** is a comprehensive, production-ready e-commerce marketplace platform built with modern technologies. It consists of two main components:

1. **Backend API** - A robust RESTful API built with Node.js and Express
2. **Admin Dashboard** - A sophisticated management interface built with Next.js and TypeScript

The platform enables businesses to manage their entire e-commerce operations including product catalogs, order processing, vendor applications, customer support requests, and comprehensive analytics.

### 🎨 What Makes It Special?

- **Production-Ready**: Built with enterprise-grade architecture and best practices
- **Secure**: JWT-based authentication, bcrypt password hashing, and secure API endpoints
- **Scalable**: Modular architecture that can handle growth
- **Modern UI**: Responsive design with Tailwind CSS
- **Full CRUD**: Complete Create, Read, Update, Delete operations for all entities
- **Real-time**: Live updates and dynamic data management
- **Demo Data**: Pre-populated database for testing and demonstration

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication system
- Password hashing with bcrypt
- Role-based access control (Admin, Vendor, Customer)
- Protected routes and API endpoints
- Persistent login sessions

### 📦 Product Management
- Complete product catalog management
- Product categories and subcategories
- Product variants (size, color, etc.)
- Inventory tracking
- Product status management (Active, Inactive, Out of Stock, Discontinued)
- Bulk product operations
- Image upload and management

### 🏷️ Category Management
- Hierarchical category structure
- Category and subcategory creation
- Category-based product filtering
- Dynamic category assignment

### 📋 Order Management
- Complete order lifecycle tracking
- Order status updates (Pending, Processing, Shipped, Delivered, Cancelled)
- Shipping address management
- Order history and details
- Payment tracking
- Order analytics

### 👥 User Management
- Customer account management
- Vendor registration and approval
- User roles and permissions
- Profile management
- Activity tracking

### 🤝 Vendor System
- Vendor application requests
- Vendor approval workflow
- Vendor-specific business information
- Business license tracking
- CNIC verification

### 📞 Customer Support
- Contact request management
- Customer inquiry handling
- Support ticket system
- Communication history

### 📊 Analytics & Reporting
- Sales analytics
- Product performance metrics
- Order statistics
- User activity reports
- Revenue tracking

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | v18+ |
| **Express.js** | Web Framework | v4.18+ |
| **MongoDB** | Database | v6.0+ |
| **Mongoose** | ODM (Object Data Modeling) | v7.0+ |
| **JWT** | Authentication | v9.0+ |
| **bcryptjs** | Password Hashing | v2.4+ |
| **dotenv** | Environment Variables | v16.0+ |
| **cors** | Cross-Origin Resource Sharing | v2.8+ |
| **nodemon** | Development Auto-restart | v2.0+ |

### Frontend (Admin Dashboard)
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | v14+ |
| **React** | UI Library | v18+ |
| **TypeScript** | Type Safety | v5+ |
| **Tailwind CSS** | Styling Framework | v3.3+ |
| **Axios** | HTTP Client | v1.4+ |
| **React Hook Form** | Form Management | Latest |
| **js-cookie** | Cookie Management | v3.0+ |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

---

## 🏗️ Project Architecture

```
SwapNShare/
│
├── swapNShare-backend-main/          # Backend API Server
│   ├── src/
│   │   └── api/
│   │       └── v1/
│   │           ├── controller/       # Request handlers
│   │           │   ├── AdminController.js
│   │           │   ├── OrderController.js
│   │           │   └── ProductController.js
│   │           ├── model/            # Database schemas
│   │           │   ├── Users.js
│   │           │   ├── Product.js
│   │           │   ├── Order.js
│   │           │   ├── Category.js
│   │           │   ├── VendorRequest.js
│   │           │   └── ContactRequest.js
│   │           ├── services/         # Business logic
│   │           │   ├── admin.service.js
│   │           │   ├── user.service.js
│   │           │   ├── product.service.js
│   │           │   └── order.service.js
│   │           ├── routes/           # API routes
│   │           │   ├── admin.js
│   │           │   ├── user.js
│   │           │   ├── product.js
│   │           │   └── order.js
│   │           ├── middleware/       # Custom middleware
│   │           │   └── authMiddleware.js
│   │           └── utils/            # Helper functions
│   │               └── addDashboardUser.js
│   ├── app.js                        # Express app configuration
│   ├── server.js                     # Server entry point
│   ├── seedData.js                   # Database seeding script
│   ├── .env                          # Environment variables
│   └── package.json                  # Dependencies
│
└── swapNShare-dashboard-main/        # Admin Dashboard
    ├── src/
    │   ├── app/                      # Next.js app directory
    │   │   ├── (auth)/              # Authentication pages
    │   │   │   └── login/
    │   │   └── (main)/              # Main app pages
    │   │       ├── dashboard/       # Dashboard home
    │   │       ├── manage-products/ # Product management
    │   │       ├── manage-categories/ # Category management
    │   │       ├── manage-orders/   # Order management
    │   │       ├── vendor-requests/ # Vendor applications
    │   │       ├── contact-requests/ # Support tickets
    │   │       └── manage-users/    # User management
    │   ├── api/                      # API integration
    │   │   └── api.ts               # Axios configuration
    │   ├── components/               # Reusable components
    │   │   ├── dashboard/           # Dashboard components
    │   │   └── ui/                  # UI components
    │   └── lib/                      # Utilities
    ├── public/                       # Static assets
    ├── .env.local                    # Environment variables
    ├── next.config.js                # Next.js configuration
    ├── tailwind.config.js            # Tailwind configuration
    └── package.json                  # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
  ```bash
  node --version
  ```

- **npm** (v9.0 or higher)
  ```bash
  npm --version
  ```

- **MongoDB** (v6.0 or higher)
  ```bash
  mongod --version
  ```

- **Git**
  ```bash
  git --version
  ```

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/afshanfatima133-cmd/abc.git
cd abc
```

#### Step 2: Install Backend Dependencies

```bash
cd swapNShare-backend-main
npm install
```

#### Step 3: Install Frontend Dependencies

```bash
cd ../swapNShare-dashboard-main
npm install
```

### Environment Configuration

#### Backend Environment (.env)

Create a `.env` file in the `swapNShare-backend-main` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DEV_DATABASE=mongodb://localhost:27017/swapnshare
PROD_DATABASE=your_production_mongodb_uri

# JWT Secret (Change this in production!)
JWT_SECRET=supersecretjwtkey

# JWT Expiry
JWT_EXPIRES_IN=30d

# Other Configurations
API_VERSION=v1
```

**Important Environment Variables Explained:**

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5001` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `DEV_DATABASE` | Local MongoDB URI | `mongodb://localhost:27017/swapnshare` |
| `PROD_DATABASE` | Production MongoDB URI | Your MongoDB Atlas URI |
| `JWT_SECRET` | Secret key for JWT tokens | Strong random string |
| `JWT_EXPIRES_IN` | Token expiration time | `30d`, `7d`, `24h` |

#### Frontend Environment (.env.local)

Create a `.env.local` file in the `swapNShare-dashboard-main` directory:

```env
# API Configuration
NEXT_PUBLIC_URL=http://localhost:5001/api/v1/
NEXT_PUBLIC_URL_IMAGE=http://localhost:5001/

# Environment
NODE_ENV=development
```

**Frontend Environment Variables Explained:**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_URL` | Backend API base URL | `http://localhost:5001/api/v1/` |
| `NEXT_PUBLIC_URL_IMAGE` | Image server URL | `http://localhost:5001/` |

### Database Setup

#### Step 1: Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### Step 2: Verify MongoDB Connection

```bash
mongosh
# You should see MongoDB shell prompt
```

#### Step 3: Seed Demo Data (Optional but Recommended)

```bash
cd swapNShare-backend-main
node seedData.js
```

This will populate your database with:
- **10 Users** (2 Admins, 3 Vendors, 5 Customers)
- **20 Products** (across various categories)
- **15 Orders** (with different statuses)
- **10 Categories** (with subcategories)
- **5 Vendor Requests**
- **8 Contact Requests**

---

## 🎮 Running The Project

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Backend Server
```bash
cd swapNShare-backend-main
npm run dev
```
**Expected Output:**
```
🚀 Server running on port 5001
✅ MongoDB connected successfully
📦 Database: swapnshare
```

#### Terminal 2 - Frontend Dashboard
```bash
cd swapNShare-dashboard-main
npm run dev
```
**Expected Output:**
```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Ready in 2.3s
```

### Option 2: Background Process (Advanced)

```bash
# Start Backend
cd swapNShare-backend-main && npm run dev &

# Start Frontend
cd swapNShare-dashboard-main && npm run dev &
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Admin Dashboard** | http://localhost:3000 | Main admin interface |
| **Backend API** | http://localhost:5001 | REST API endpoints |
| **API Documentation** | http://localhost:5001/api/v1 | API base path |

---

## 🔑 Default Credentials

### Admin Account
```
Email: admin@admin.com
Password: admin123
Role: Admin
```

### Test Vendor Account
```
Email: vendor1@example.com
Password: vendor123
Role: Vendor
```

### Test Customer Account
```
Email: customer1@example.com
Password: customer123
Role: Customer
```

**⚠️ Security Note:** Change these credentials in production!

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api/v1
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### 🔐 Authentication & Admin Routes

**POST /admin/login**
- Description: Admin login
- Body: `{ email, password }`
- Response: `{ success, token, data: { user } }`

**GET /admin/get-all-users**
- Description: Get all users (Admin only)
- Auth: Required
- Response: `{ success, users }`

**DELETE /admin/delete-user/:id**
- Description: Delete a user (Admin only)
- Auth: Required
- Response: `{ success, message }`

#### 👤 User Routes

**POST /users/register**
- Description: Register new user
- Body: `{ firstName, lastName, email, password, role }`
- Response: `{ success, message }`

**POST /users/login**
- Description: User login
- Body: `{ email, password }`
- Response: `{ success, token, data }`

**GET /users/profile**
- Description: Get user profile
- Auth: Required
- Response: `{ success, user }`

**PUT /users/profile**
- Description: Update user profile
- Auth: Required
- Body: User fields to update
- Response: `{ success, user }`

**POST /users/vendor-request**
- Description: Submit vendor application
- Body: `{ name, email, phoneNumber, cnic }`
- Response: `{ success, message }`

**GET /users/vendor-requests**
- Description: Get all vendor requests
- Auth: Required (Admin)
- Response: `{ success, requests }`

**POST /users/contact-request**
- Description: Submit contact/support request
- Body: `{ name, subject, message }`
- Response: `{ success, message }`

**GET /users/contact-requests**
- Description: Get all contact requests
- Auth: Required (Admin)
- Response: `{ success, requests }`

#### 📦 Product Routes

**POST /product/create-product**
- Description: Create new product
- Auth: Required
- Body:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "category_id",
  "subcategory": "subcategory_id",
  "stock": 100,
  "images": ["url1", "url2"],
  "status": "Active"
}
```
- Response: `{ success, data: product }`

**GET /product**
- Description: Get all products
- Query params: `?page=1&limit=10&category=id&status=Active`
- Response: `{ success, data: products, pagination }`

**GET /product/:id**
- Description: Get single product
- Response: `{ success, data: product }`

**PUT /product/:id**
- Description: Update product
- Auth: Required
- Body: Fields to update
- Response: `{ success, data: product }`

**DELETE /product/:id**
- Description: Delete product
- Auth: Required
- Response: `{ success, message }`

#### 🏷️ Category Routes

**POST /product/create-category**
- Description: Create new category
- Auth: Required
- Body:
```json
{
  "name": "Category Name",
  "description": "Description",
  "parentCategory": "optional_parent_id"
}
```
- Response: `{ success, data: category }`

**GET /product/categories**
- Description: Get all categories
- Response: `{ success, data: categories }`

**GET /product/categories/:id**
- Description: Get category with subcategories
- Response: `{ success, data: category }`

**PUT /product/categories/:id**
- Description: Update category
- Auth: Required
- Body: Fields to update
- Response: `{ success, data: category }`

**DELETE /product/categories/:id**
- Description: Delete category
- Auth: Required
- Response: `{ success, message }`

#### 📋 Order Routes

**POST /order/create-order**
- Description: Create new order
- Auth: Required
- Body:
```json
{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "addressLine1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Card",
  "subtotal": 199.98,
  "shippingFee": 10,
  "tax": 15,
  "total": 224.98
}
```
- Response: `{ success, data: order }`

**GET /order/orders**
- Description: Get all orders
- Auth: Required
- Query params: `?status=Pending&user=user_id`
- Response: `{ success, data: orders }`

**GET /order/orders/:id**
- Description: Get single order
- Auth: Required
- Response: `{ success, data: order }`

**PUT /order/orders/:id**
- Description: Update order status
- Auth: Required
- Body: `{ status: "Processing" }`
- Response: `{ success, data: order }`

**DELETE /order/orders/:id**
- Description: Cancel/Delete order
- Auth: Required
- Response: `{ success, message }`

### Response Format

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["Customer", "Vendor", "Admin"]),
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  // Vendor-specific fields
  businessName: String (required if Vendor),
  businessEmail: String (unique if Vendor),
  businessLicense: String (required if Vendor),
  cnic: String (required if Vendor),
  taxId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  category: ObjectId (ref: 'Category'),
  subcategory: ObjectId (ref: 'Category'),
  stock: Number (default: 0),
  images: [String],
  status: String (enum: ["Active", "Inactive", "Out of Stock", "Discontinued"]),
  vendor: ObjectId (ref: 'User'),
  specifications: {
    size: String,
    color: String,
    weight: String,
    dimensions: String
  },
  ratings: {
    average: Number,
    count: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  parentCategory: ObjectId (ref: 'Category'),
  level: Number (0 for main, 1 for sub),
  image: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number (required),
    price: Number (required)
  }],
  subtotal: Number (required),
  shippingFee: Number (default: 0),
  tax: Number (default: 0),
  total: Number (required),
  shippingAddress: {
    fullName: String (required),
    phoneNumber: String (required),
    addressLine1: String (required),
    addressLine2: String,
    city: String (required),
    state: String (required),
    postalCode: String (required),
    country: String (required)
  },
  paymentMethod: String (enum: ["Cash", "Card", "Bank Transfer"]),
  paymentStatus: String (enum: ["Pending", "Paid", "Failed"]),
  orderStatus: String (enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### VendorRequests Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phoneNumber: String (required),
  cnic: String (required),
  status: String (enum: ["Pending", "Approved", "Rejected"], default: "Pending"),
  createdAt: Date,
  updatedAt: Date
}
```

### ContactRequests Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  subject: String (required),
  message: String (required),
  status: String (enum: ["Pending", "In Progress", "Resolved"], default: "Pending"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Admin Dashboard

### Dashboard Features

#### 📊 Dashboard Home
- **Overview Statistics**
  - Total sales revenue
  - Number of orders
  - Total products
  - Active users
  - Pending vendor requests
  - Unresolved support tickets

- **Recent Activity**
  - Latest orders
  - New user registrations
  - Recent product additions
  - Support ticket updates

- **Charts & Graphs**
  - Sales trends
  - Product performance
  - Order status distribution

#### 📦 Product Management
- View all products in a data table
- Search and filter products
- Add new products with image upload
- Edit product details
- Update product status
- Delete products
- Bulk operations
- Export product data

#### 🏷️ Category Management
- View category hierarchy
- Create main categories
- Create subcategories
- Edit category information
- Delete categories (with warnings)
- Drag-and-drop reordering

#### 📋 Order Management
- View all orders with filters
- Order status tracking
- Update order status
- View order details
- Print invoices
- Shipping management
- Order analytics

#### 👥 User Management
- View all users (Admin, Vendor, Customer)
- Filter by role
- View user details
- Update user information
- Deactivate/Delete users
- Export user data

#### 🤝 Vendor Requests
- View pending vendor applications
- Review vendor information
- Approve vendor requests
- Reject with reason
- Contact vendors

#### 📞 Contact Requests
- View customer inquiries
- Filter by status
- Respond to requests
- Mark as resolved
- Priority management

### Dashboard Navigation

```
SwapNShare Dashboard
├── Dashboard (Home)
├── Products
│   ├── All Products
│   ├── Add Product
│   └── Categories
├── Orders
│   ├── All Orders
│   └── Order Details
├── Users
│   ├── All Users
│   ├── Customers
│   ├── Vendors
│   └── Admins
├── Requests
│   ├── Vendor Applications
│   └── Contact Requests
└── Settings
    ├── Profile
    └── Logout
```

---

## 📁 Project Structure

### Backend Structure Details

```
swapNShare-backend-main/
│
├── src/
│   └── api/
│       └── v1/
│           ├── controller/           # HTTP request handlers
│           │   ├── AdminController.js        # Admin operations
│           │   ├── OrderController.js        # Order management
│           │   └── ProductController.js      # Product & category management
│           │
│           ├── model/                # Mongoose schemas
│           │   ├── Users.js                  # User model with roles
│           │   ├── Product.js                # Product model
│           │   ├── Order.js                  # Order model
│           │   ├── Category.js               # Category model
│           │   ├── VendorRequest.js          # Vendor application model
│           │   └── ContactRequest.js         # Support request model
│           │
│           ├── services/             # Business logic layer
│           │   ├── admin.service.js          # Admin business logic
│           │   ├── user.service.js           # User business logic
│           │   ├── product.service.js        # Product business logic
│           │   └── order.service.js          # Order business logic
│           │
│           ├── routes/               # API route definitions
│           │   ├── admin.js                  # Admin routes
│           │   ├── user.js                   # User routes
│           │   ├── product.js                # Product routes
│           │   └── order.js                  # Order routes
│           │
│           ├── middleware/           # Custom middleware
│           │   └── authMiddleware.js         # JWT authentication
│           │
│           └── utils/                # Helper functions
│               └── addDashboardUser.js       # Default admin creator
│
├── app.js                    # Express application setup
├── server.js                 # Server entry point
├── seedData.js              # Database seeding script
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies and scripts
```

### Frontend Structure Details

```
swapNShare-dashboard-main/
│
├── src/
│   ├── app/                         # Next.js 14 App Router
│   │   ├── (auth)/                 # Auth layout group
│   │   │   ├── login/              # Login page
│   │   │   │   ├── page.tsx
│   │   │   │   └── Login.tsx
│   │   │   └── layout.tsx          # Auth layout
│   │   │
│   │   ├── (main)/                 # Main app layout group
│   │   │   ├── dashboard/          # Dashboard home
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── manage-products/    # Product management
│   │   │   │   ├── page.tsx
│   │   │   │   └── AddProductModel.tsx
│   │   │   │
│   │   │   ├── manage-categories/  # Category management
│   │   │   │   ├── page.tsx
│   │   │   │   └── AddCategoryModel.tsx
│   │   │   │
│   │   │   ├── manage-orders/      # Order management
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── vendor-requests/    # Vendor applications
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── contact-requests/   # Support tickets
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── manage-users/       # User management
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── layout.tsx          # Main layout with sidebar
│   │   │
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   │
│   ├── api/                        # API integration
│   │   └── api.ts                  # Axios configuration & API calls
│   │
│   ├── components/                 # Reusable components
│   │   ├── dashboard/              # Dashboard-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── ActivityCard.tsx
│   │   │
│   │   └── ui/                     # Generic UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Table.tsx
│   │
│   └── lib/                        # Utilities
│       └── utils.ts                # Helper functions
│
├── public/                         # Static assets
│   ├── images/
│   └── icons/
│
├── .env.local                      # Environment variables (not in repo)
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── postcss.config.js               # PostCSS configuration
├── .gitignore                      # Git ignore rules
└── package.json                    # Dependencies and scripts
```

---

## 🧪 Testing

### Backend Testing

```bash
cd swapNShare-backend-main

# Test API endpoints
npm test

# Test with demo data
node seedData.js
```

### Frontend Testing

```bash
cd swapNShare-dashboard-main

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔒 Security Best Practices

### Implemented Security Measures

1. **Password Security**
   - Passwords hashed with bcrypt (10 rounds)
   - No plain text passwords stored

2. **JWT Authentication**
   - Secure token generation
   - Token expiration (30 days default)
   - Protected routes

3. **API Security**
   - CORS enabled with origin validation
   - Rate limiting (recommended for production)
   - Input validation and sanitization

4. **Environment Variables**
   - Sensitive data in `.env` files
   - `.env` files not committed to repository

5. **Database Security**
   - Mongoose schema validation
   - Unique constraints on critical fields
   - Index optimization

### Recommended Production Enhancements

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// Compression
const compression = require('compression');
app.use(compression());
```

---

## 🚀 Deployment

### Backend Deployment (Node.js)

#### Option 1: Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean / AWS / Azure

1. Set up a VPS or cloud instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set up PM2 for process management
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name swapnshare-backend

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### Frontend Deployment (Next.js)

#### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd swapNShare-dashboard-main
vercel

# Set environment variables in Vercel dashboard
# NEXT_PUBLIC_URL
# NEXT_PUBLIC_URL_IMAGE
```

#### Option 2: Netlify

```bash
# Build the project
npm run build

# Deploy build folder
netlify deploy --prod --dir=.next
```

### Database Deployment

#### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Set up database user
4. Whitelist IP addresses
5. Get connection string
6. Update `PROD_DATABASE` in `.env`

```
PROD_DATABASE=mongodb+srv://username:password@cluster.mongodb.net/swapnshare?retryWrites=true&w=majority
```

---

## 📊 Performance Optimization

### Backend Optimizations

```javascript
// Database indexing
userSchema.index({ email: 1 });
productSchema.index({ category: 1, status: 1 });
orderSchema.index({ user: 1, createdAt: -1 });

// Pagination for large datasets
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const products = await Product.find()
  .skip(skip)
  .limit(limit)
  .populate('category');

// Caching (Redis recommended)
const redis = require('redis');
const client = redis.createClient();

// Cache product data
app.get('/api/products', async (req, res) => {
  const cacheKey = 'products:all';
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const products = await Product.find();
  await client.setEx(cacheKey, 3600, JSON.stringify(products));
  res.json(products);
});
```

### Frontend Optimizations

```javascript
// Image optimization
import Image from 'next/image';

<Image
  src="/product.jpg"
  width={500}
  height={500}
  alt="Product"
  loading="lazy"
/>

// Code splitting
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// Memoization
import { memo } from 'react';

const ProductCard = memo(({ product }) => {
  return <div>{product.name}</div>;
});
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: MongoDB Connection Error

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

#### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solution:**
```bash
# Find process using port
lsof -ti:5001

# Kill the process
kill -9 $(lsof -ti:5001)

# Or change port in .env
PORT=5002
```

#### Issue 3: JWT Authentication Failed

**Error:**
```
401 Unauthorized - Invalid token
```

**Solution:**
- Check if token is being sent in Authorization header
- Verify JWT_SECRET matches in backend
- Check token expiration
- Clear browser cookies and login again

#### Issue 4: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```javascript
// In app.js, ensure CORS is configured
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### Issue 5: npm Install Fails

**Error:**
```
npm ERR! code EACCES
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📈 Future Enhancements

### Planned Features

- [ ] **Real-time Notifications** - WebSocket integration for live updates
- [ ] **Email Integration** - Order confirmations and password reset
- [ ] **SMS Notifications** - Order status updates via SMS
- [ ] **Advanced Analytics** - Detailed sales and performance reports
- [ ] **Multi-vendor Support** - Individual vendor dashboards
- [ ] **Review System** - Product ratings and reviews
- [ ] **Wishlist** - Save products for later
- [ ] **Discount Codes** - Coupon and promotion system
- [ ] **Inventory Alerts** - Low stock notifications
- [ ] **Shipping Integration** - Real-time shipping rates
- [ ] **Payment Gateway** - Stripe, PayPal integration
- [ ] **Mobile App** - React Native mobile application
- [ ] **Multi-language Support** - i18n implementation
- [ ] **Dark Mode** - Theme switching
- [ ] **Export Reports** - PDF/Excel reports

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/afshanfatima133-cmd/abc.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues

### Code Style Guidelines

- Use meaningful variable names
- Add comments for complex logic
- Follow ESLint rules
- Write descriptive commit messages

---

## 📞 Support

Need help? Here are your options:

- **Email**: support@swapnshare.com
- **Issues**: [GitHub Issues](https://github.com/afshanfatima133-cmd/abc/issues)
- **Documentation**: This README
- **Discord**: [Join our community](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SwapNShare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Express.js** - Fast, unopinionated web framework
- **Next.js** - The React Framework for Production
- **MongoDB** - NoSQL database
- **Tailwind CSS** - Utility-first CSS framework
- **JWT** - Secure authentication
- **All Contributors** - Thank you for your contributions!

---

## 📸 Screenshots

### Login Page
Professional authentication interface with form validation

### Dashboard Home
Comprehensive overview with statistics and charts

### Product Management
Easy-to-use product catalog management with search and filters

### Order Management
Complete order tracking and status management

### Category Management
Hierarchical category structure with drag-and-drop

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

<div align="center">

**Made with ❤️ by SwapNShare Team**

[Report Bug](https://github.com/afshanfatima133-cmd/abc/issues) · [Request Feature](https://github.com/afshanfatima133-cmd/abc/issues) · [Documentation](#)

</div>


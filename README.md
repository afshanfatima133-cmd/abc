# SwapNShare - E-Commerce Dashboard Platform

A full-stack e-commerce management system with a Next.js dashboard and Node.js/Express backend.

## 🚀 Project Structure

```
abc/
├── swapNShare-dashboard-main/  # Frontend (Next.js)
└── swapNShare-backend-main/    # Backend (Node.js/Express)
```

## 📋 Features

### Admin Dashboard
- ✅ User Management (Admin, Vendor, Customer)
- ✅ Vendor Application Management
- ✅ Contact Request Management
- ✅ Product Categories & Subcategories
- ✅ Product Management (CRUD)
- ✅ Order Management & Tracking
- ✅ Image Upload & Management
- ✅ JWT Authentication

### Backend APIs
- User authentication and authorization
- Vendor request processing
- Contact form management
- Category and subcategory management
- Product CRUD operations
- Order management
- File upload (AWS S3 integration ready)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Authentication**: JWT (stored in cookies)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcrypt
- **File Upload**: Multer (AWS S3 ready)
- **Email**: Nodemailer

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd swapNShare-backend-main
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (see `.env.example`):
```env
PORT=5001
DEV_DATABASE=mongodb://localhost:27017/swapnshare
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
EMAIL_TRANSPORT_HOST=smtp.mailtrap.io
EMAIL_TRANSPORT_PORT=2525
EMAIL_TRANSPORT_HOST_USER=your_mailtrap_username
EMAIL_TRANSPORT_HOST_PASS=your_mailtrap_password
SENDER_EMAIL=sender@example.com
AWS_S3_ACCESS_KEY=your_aws_access_key
AWS_S3_KEY_SECRET=your_aws_secret_key
AWS_S3_REGION=your_aws_region
AWS_BUCKET_NAME=your_aws_bucket_name
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd swapNShare-dashboard-main
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_URL=http://localhost:5001/api/v1/
NEXT_PUBLIC_URL_IMAGE=http://localhost:5001/
```

4. Start the development server:
```bash
npm run dev
```

The dashboard will run on `http://localhost:3000`

## 🔐 Default Admin Credentials

After running the backend for the first time, a default admin user is created:

- **Email**: tanveerxray@gmail.com
- **Password**: QWnr12@YUd

⚠️ **Important**: Change these credentials immediately after first login!

## 📁 Project Structure

### Backend Structure
```
swapNShare-backend-main/
├── src/
│   └── api/
│       └── v1/
│           ├── controller/      # Request handlers
│           ├── model/           # Mongoose schemas
│           ├── routes/          # API routes
│           ├── services/        # Business logic
│           ├── middleware/      # Custom middleware
│           └── utils/           # Helper functions
├── app.js                       # Express app setup
├── server.js                    # Server entry point
└── .env                         # Environment variables
```

### Frontend Structure
```
swapNShare-dashboard-main/
├── src/
│   ├── api/                     # API integration
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Authentication pages
│   │   └── (main)/             # Dashboard pages
│   └── components/              # React components
├── public/                      # Static assets
└── .env.local                   # Environment variables
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout

### Users
- `GET /api/v1/users` - Get all users
- `PUT /api/v1/users/update-user/:id` - Update user
- `DELETE /api/v1/users/delete-user/:id` - Delete user

### Vendors
- `GET /api/v1/users/vendor-requests` - Get vendor requests
- `POST /api/v1/users/accept-vendor/:id` - Accept vendor request

### Contact Requests
- `GET /api/v1/users/contact-requests` - Get contact requests
- `PUT /api/v1/users/resolve-contact/:id` - Resolve contact request

### Categories
- `GET /api/v1/product/categories` - Get all categories
- `GET /api/v1/product/all-sub-category/:id` - Get subcategories
- `POST /api/v1/product/create-category` - Create category
- `PUT /api/v1/product/category/:id` - Update category
- `DELETE /api/v1/product/category/:id` - Delete category

### Products
- `GET /api/v1/product` - Get all products
- `GET /api/v1/product/:id` - Get product by ID
- `POST /api/v1/product/create-product` - Create product
- `PUT /api/v1/product/:id` - Update product
- `DELETE /api/v1/product/:id` - Delete product

### Orders
- `GET /api/v1/order/orders` - Get all orders
- `GET /api/v1/order/orders-by-vendor` - Get vendor orders
- `PUT /api/v1/order/update-order-status` - Update order status

### File Upload
- `POST /api/v1/users/upload` - Upload images

## 🗄️ Database Models

### User
- name, email, password, role, clientStatus, status

### VendorRequest
- companyName, ownerFullName, businessEmail, contactNumber
- businessAddress, city, businessType, typesOfProducts
- taxRegistrationNumber, businessLicense, cnicNumber
- cnicFrontImage, cnicBackImage, status

### ContactRequest
- fullName, email, topic, query, status

### Category
- name, description, image, parentCategory, status

### Product
- name, description, images, category, subCategory
- price, stock, vendor, status, isFeatured
- ratingsAverage, ratingsQuantity

### Order
- user, products[], totalAmount, shippingAddress
- orderNumber, status, paymentStatus, paymentMethod
- orderedAt, deliveredAt

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd swapNShare-backend-main
heroku create your-app-name
git push heroku main
heroku config:set PORT=5001 DEV_DATABASE=your_mongodb_uri ...
```

### Frontend Deployment (Example: Vercel)
```bash
cd swapNShare-dashboard-main
vercel deploy
```

## 📝 Environment Variables

### Required Backend Variables
- `PORT` - Server port (default: 5001)
- `DEV_DATABASE` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRES_IN` - JWT expiration time

### Required Frontend Variables
- `NEXT_PUBLIC_URL` - Backend API URL
- `NEXT_PUBLIC_URL_IMAGE` - Backend image URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Development Team** - SwapNShare Platform

## 🐛 Issues

If you encounter any issues, please create an issue on GitHub.

## 📞 Support

For support, email support@swapnshare.com or join our Slack channel.

---

**GitHub Repository**: https://github.com/ctcw7k88zn-lab/abc

Made with ❤️ by the SwapNShare Team


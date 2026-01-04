# 🚀 Quick Setup Instructions

## ⚡ Fast Start (Development)

### 1. Backend Setup (Terminal 1)
```bash
cd swapNShare-backend-main
npm install
npm run dev
```
✅ Backend running on http://localhost:5001

### 2. Frontend Setup (Terminal 2)
```bash
cd swapNShare-dashboard-main
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

### 3. MongoDB
Make sure MongoDB is running locally on `mongodb://localhost:27017`

## 🔐 Default Login Credentials

- **Email**: `tanveerxray@gmail.com`
- **Password**: `QWnr12@YUd`

## 📝 Environment Files (Already Created)

### Backend: `swapNShare-backend-main/.env`
```env
PORT=5001
DEV_DATABASE=mongodb://localhost:27017/swapnshare
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend: `swapNShare-dashboard-main/.env.local`
```env
NEXT_PUBLIC_URL=http://localhost:5001/api/v1/
NEXT_PUBLIC_URL_IMAGE=http://localhost:5001/
```

## ✅ What's Already Working

- ✅ User Authentication & Authorization
- ✅ User Management (CRUD)
- ✅ Vendor Application System
- ✅ Contact Request Management
- ✅ Category & Subcategory Management
- ✅ Product Management (CRUD)
- ✅ Order Management
- ✅ Image Upload System
- ✅ JWT Token Management
- ✅ Password Hashing (bcrypt)

## 🌐 Access Points

- **Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5001/api/v1/
- **GitHub**: https://github.com/ctcw7k88zn-lab/abc

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
brew services list | grep mongodb

# Start MongoDB if not running
brew services start mongodb-community

# Check if port 5001 is available
lsof -ti:5001 | xargs kill -9  # Kill process on port 5001
```

### Frontend build issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Database connection issues
```bash
# Test MongoDB connection
mongosh mongodb://localhost:27017/swapnshare
```

## 📦 NPM Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔄 Syncing with GitHub

### Pull latest changes
```bash
cd /Users/mohsin/Documents/abc
git pull origin main
```

### Push your changes
```bash
cd /Users/mohsin/Documents/abc
git add .
git commit -m "Your commit message"
git push origin main
```

## 📞 Need Help?

1. Check the main README.md for detailed documentation
2. Review the API endpoints in README.md
3. Check backend logs for errors
4. Check browser console for frontend errors

---

**Last Updated**: January 4, 2026
**Status**: ✅ All systems operational


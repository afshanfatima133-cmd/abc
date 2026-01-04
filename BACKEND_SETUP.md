# SwapNShare Backend - Login Setup

## What Was Done

### 1. Added Dashboard User Creation Script
Created `/src/api/v1/utils/addDashboardUser.js` to automatically add the dashboard admin user:
- **Email**: `tanveerxray@gmail.com`
- **Password**: `QWnr12@YUd`
- **Role**: Admin

### 2. Updated Server.js
Modified `server.js` to automatically create the dashboard user when the backend starts up.

### 3. Created .env File
Created `.env` file with necessary environment variables (PORT, JWT_SECRET, DATABASE URL, etc.)

### 4. Installed Dependencies
Installed all backend npm dependencies.

## What's Needed to Run the Backend

### Option 1: Install MongoDB Locally
```bash
# On macOS using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Then start the backend
cd swapNShare-backend-main
npm run dev
```

### Option 2: Use MongoDB Atlas (Cloud Database)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file:
   ```
   DEV_DATABASE=mongodb+srv://username:password@cluster.mongodb.net/swapnshare
   ```

## Starting the Backend Server

Once MongoDB is set up:

```bash
cd swapNShare-backend-main
npm run dev
```

The backend will:
1. Connect to MongoDB
2. Automatically create the default admin (admin@crm.com / admin@123) if no users exist
3. Automatically create the dashboard user (tanveerxray@gmail.com / QWnr12@YUd)
4. Start on port 5000

## API Endpoint for Login

**POST** `http://localhost:5000/api/v1/user/login`

Request Body:
```json
{
  "email": "tanveerxray@gmail.com",
  "password": "QWnr12@YUd"
}
```

Response:
```json
{
  "message": "Login successful.",
  "success": true,
  "data": {
    "id": "user_id",
    "name": "Tanveer Ray",
    "email": "tanveerxray@gmail.com",
    "role": "Admin",
    "token": "jwt_token_here"
  }
}
```

## Files Modified/Created

1. ✅ `src/api/v1/utils/addDashboardUser.js` - Created
2. ✅ `server.js` - Updated to call addDashboardUser()
3. ✅ `.env` - Created with configuration
4. ✅ `.npmrc` - Created for npm cache configuration
5. ✅ `node_modules/` - Dependencies installed

## Current Status

- ✅ Frontend: Running on http://localhost:3000
- ⏳ Backend: Ready to start (needs MongoDB connection)

## Next Steps

1. Set up MongoDB (local or Atlas)
2. Update `.env` with the correct MongoDB connection string
3. Start the backend: `npm run dev`
4. The login credentials will be automatically saved in the database


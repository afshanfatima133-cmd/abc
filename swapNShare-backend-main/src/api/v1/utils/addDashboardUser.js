const User = require("../model/Users");
const bcrypt = require("bcrypt");

/**
 * Add a dashboard admin user to the database
 * Email: tanveerxray@gmail.com
 * Password: QWnr12@YUd
 */
const addDashboardUser = async () => {
  try {
    console.log("Checking if dashboard user exists...");
    
    const email = "tanveerxray@gmail.com";
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log("Dashboard user already exists. Skipping creation.");
      return {
        success: true,
        message: "User already exists",
        user: existingUser
      };
    }

    console.log("Creating dashboard admin user...");

    // Hash the password
    const hashedPassword = await bcrypt.hash("QWnr12@YUd", 12);

    // Create the dashboard admin user
    const newUser = await User.create({
      email: "tanveerxray@gmail.com",
      password: hashedPassword,
      role: "Admin",
      name: "Tanveer Ray",
      clientStatus: "Approved",
      status: "Active",
    });

    console.log("✅ Dashboard admin user created successfully.");
    console.log("   Email: tanveerxray@gmail.com");
    console.log("   Password: QWnr12@YUd");
    
    return {
      success: true,
      message: "Dashboard user created successfully",
      user: newUser
    };
  } catch (error) {
    console.error("❌ Error during dashboard user creation:", error);
    throw error;
  }
};

module.exports = addDashboardUser;


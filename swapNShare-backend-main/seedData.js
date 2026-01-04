const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/api/v1/model/Users");
const Category = require("./src/api/v1/model/Category");
const Product = require("./src/api/v1/model/Product");
const Order = require("./src/api/v1/model/Order");
const VendorRequest = require("./src/api/v1/model/VendorRequest");
const ContactRequest = require("./src/api/v1/model/ContactRequest");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.DEV_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const seedData = async () => {
  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await VendorRequest.deleteMany({});
    await ContactRequest.deleteMany({});

    // Create Users
    console.log("👥 Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const admin = await User.create({
      name: "Tanveer Ray",
      email: "tanveerxray@gmail.com",
      password: await bcrypt.hash("QWnr12@YUd", 10),
      role: "Admin",
      clientStatus: "Approved",
      status: "Active",
      phoneNumber: "+92-300-1234567",
    });

    const vendor1 = await User.create({
      name: "Ahmed Electronics",
      email: "ahmed@electronics.com",
      password: hashedPassword,
      role: "Vendor",
      clientStatus: "Approved",
      status: "Active",
      phoneNumber: "+92-321-9876543",
      companyName: "Ahmed Electronics Store",
      businessEmail: "business@ahmedelectronics.com",
      businessAddress: "Shop 23, Saddar Market, Karachi",
      businessType: "Retail",
      typesOfProducts: "Electronics, Gadgets, Accessories",
      taxRegistrationNumber: "TAX-VEN-001-2024",
      businessLicense: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
      cnic: "42101-1234567-1",
      cnicFrontImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
      cnicBackImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
      vendorStatus: "Approved",
    });

    const vendor2 = await User.create({
      name: "Fashion Hub",
      email: "contact@fashionhub.com",
      password: hashedPassword,
      role: "Vendor",
      clientStatus: "Approved",
      status: "Active",
      phoneNumber: "+92-333-4567890",
      companyName: "Fashion Hub Boutique",
      businessEmail: "info@fashionhub.com",
      businessAddress: "Mall Road, Lahore",
      businessType: "Retail",
      typesOfProducts: "Clothing, Fashion Accessories, Shoes",
      taxRegistrationNumber: "TAX-VEN-002-2024",
      businessLicense: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
      cnic: "35202-9876543-1",
      cnicFrontImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
      cnicBackImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
      vendorStatus: "Approved",
    });

    const customers = await User.insertMany([
      {
        name: "Sarah Khan",
        email: "sarah.khan@email.com",
        password: hashedPassword,
        role: "Client",
        clientStatus: "Approved",
        status: "Active",
        phoneNumber: "+92-300-1111111",
      },
      {
        name: "Ali Raza",
        email: "ali.raza@email.com",
        password: hashedPassword,
        role: "Client",
        clientStatus: "Approved",
        status: "Active",
        phoneNumber: "+92-321-2222222",
      },
      {
        name: "Fatima Ahmed",
        email: "fatima@email.com",
        password: hashedPassword,
        role: "Client",
        clientStatus: "Approved",
        status: "Active",
        phoneNumber: "+92-333-3333333",
      },
    ]);

    console.log(`✅ Created ${customers.length + 3} users`);

    // Create Categories
    console.log("🏷️  Creating categories...");
    const electronics = await Category.create({
      name: "Electronics",
      description: "Electronic devices and gadgets",
      status: "Active",
    });

    const fashion = await Category.create({
      name: "Fashion",
      description: "Clothing and accessories",
      status: "Active",
    });

    const home = await Category.create({
      name: "Home & Living",
      description: "Home decor and furniture",
      status: "Active",
    });

    // Create Subcategories
    const smartphones = await Category.create({
      name: "Smartphones",
      description: "Latest smartphones and accessories",
      parentCategory: electronics._id,
      status: "Active",
    });

    const laptops = await Category.create({
      name: "Laptops",
      description: "Laptops and computing devices",
      parentCategory: electronics._id,
      status: "Active",
    });

    const mensClothing = await Category.create({
      name: "Men's Clothing",
      description: "Fashion for men",
      parentCategory: fashion._id,
      status: "Active",
    });

    const womensClothing = await Category.create({
      name: "Women's Clothing",
      description: "Fashion for women",
      parentCategory: fashion._id,
      status: "Active",
    });

    console.log("✅ Created 7 categories");

    // Create Products
    console.log("📦 Creating products...");
    const products = await Product.insertMany([
      {
        name: "iPhone 15 Pro Max",
        description: "Latest iPhone with A17 Pro chip, 256GB storage, Titanium design",
        images: ["https://images.unsplash.com/photo-1696446702052-1b828c19db4f?w=500"],
        category: electronics._id,
        subCategory: smartphones._id,
        price: 1299.99,
        stock: 25,
        vendor: vendor1._id,
        status: "Active",
        isFeatured: true,
        ratingsAverage: 4.8,
        ratingsQuantity: 127,
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description: "Flagship Android phone with S Pen, 512GB, amazing camera",
        images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500"],
        category: electronics._id,
        subCategory: smartphones._id,
        price: 1199.99,
        stock: 18,
        vendor: vendor1._id,
        status: "Active",
        isFeatured: true,
        ratingsAverage: 4.7,
        ratingsQuantity: 98,
      },
      {
        name: "MacBook Pro 16 M3 Max",
        description: "Professional laptop with M3 Max chip, 32GB RAM, 1TB SSD",
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"],
        category: electronics._id,
        subCategory: laptops._id,
        price: 2999.99,
        stock: 12,
        vendor: vendor1._id,
        status: "Active",
        isFeatured: true,
        ratingsAverage: 4.9,
        ratingsQuantity: 156,
      },
      {
        name: "Dell XPS 15",
        description: "High-performance laptop, Intel i9, 32GB RAM, OLED display",
        images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500"],
        category: electronics._id,
        subCategory: laptops._id,
        price: 1899.99,
        stock: 20,
        vendor: vendor1._id,
        status: "Active",
        isFeatured: false,
        ratingsAverage: 4.6,
        ratingsQuantity: 89,
      },
      {
        name: "Men's Leather Jacket",
        description: "Premium genuine leather jacket, stylish and durable",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        category: fashion._id,
        subCategory: mensClothing._id,
        price: 199.99,
        stock: 30,
        vendor: vendor2._id,
        status: "Active",
        isFeatured: true,
        ratingsAverage: 4.5,
        ratingsQuantity: 67,
      },
      {
        name: "Men's Casual Shirt",
        description: "Comfortable cotton shirt, perfect for daily wear",
        images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"],
        category: fashion._id,
        subCategory: mensClothing._id,
        price: 39.99,
        stock: 50,
        vendor: vendor2._id,
        status: "Active",
        isFeatured: false,
        ratingsAverage: 4.3,
        ratingsQuantity: 45,
      },
      {
        name: "Women's Summer Dress",
        description: "Elegant floral summer dress, lightweight and comfortable",
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
        category: fashion._id,
        subCategory: womensClothing._id,
        price: 79.99,
        stock: 40,
        vendor: vendor2._id,
        status: "Active",
        isFeatured: true,
        ratingsAverage: 4.7,
        ratingsQuantity: 112,
      },
      {
        name: "Wireless Earbuds Pro",
        description: "Active noise cancellation, 30-hour battery life",
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"],
        category: electronics._id,
        subCategory: smartphones._id,
        price: 149.99,
        stock: 60,
        vendor: vendor1._id,
        status: "Active",
        isFeatured: false,
        ratingsAverage: 4.4,
        ratingsQuantity: 234,
      },
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create Orders
    console.log("🛒 Creating orders...");
    const orderData = [
      {
        user: customers[0]._id,
        products: [
          {
            product: products[0]._id,
            quantity: 1,
            price: products[0].price,
            total: products[0].price,
          },
        ],
        subtotal: products[0].price,
        shippingCharges: 10,
        tax: products[0].price * 0.05,
        total: products[0].price + 10 + products[0].price * 0.05,
        shippingAddress: {
          fullName: "Sarah Khan",
          phoneNumber: "+92-300-1111111",
          addressLine1: "123 Main Street, Block 15",
          addressLine2: "Gulshan-e-Iqbal",
          city: "Karachi",
          state: "Sindh",
          postalCode: "75300",
          country: "Pakistan",
        },
        orderNumber: `ORD-${Date.now()}-1001`,
        status: "Delivered",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        orderedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        deliveredAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        user: customers[1]._id,
        products: [
          {
            product: products[2]._id,
            quantity: 1,
            price: products[2].price,
            total: products[2].price,
          },
          {
            product: products[7]._id,
            quantity: 2,
            price: products[7].price,
            total: products[7].price * 2,
          },
        ],
        subtotal: products[2].price + products[7].price * 2,
        shippingCharges: 15,
        tax: (products[2].price + products[7].price * 2) * 0.05,
        total: products[2].price + products[7].price * 2 + 15 + (products[2].price + products[7].price * 2) * 0.05,
        shippingAddress: {
          fullName: "Ali Raza",
          phoneNumber: "+92-321-2222222",
          addressLine1: "456 Park Avenue",
          addressLine2: "DHA Phase 5",
          city: "Lahore",
          state: "Punjab",
          postalCode: "54000",
          country: "Pakistan",
        },
        orderNumber: `ORD-${Date.now()}-1002`,
        status: "Shipped",
        paymentStatus: "Paid",
        paymentMethod: "PayPal",
        orderedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        user: customers[2]._id,
        products: [
          {
            product: products[6]._id,
            quantity: 2,
            price: products[6].price,
            total: products[6].price * 2,
          },
        ],
        subtotal: products[6].price * 2,
        shippingCharges: 10,
        tax: products[6].price * 2 * 0.05,
        total: products[6].price * 2 + 10 + products[6].price * 2 * 0.05,
        shippingAddress: {
          fullName: "Fatima Ahmed",
          phoneNumber: "+92-333-3333333",
          addressLine1: "789 Garden Road",
          addressLine2: "F-7 Sector",
          city: "Islamabad",
          state: "ICT",
          postalCode: "44000",
          country: "Pakistan",
        },
        orderNumber: `ORD-${Date.now()}-1003`,
        status: "Processing",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        orderedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: customers[0]._id,
        products: [
          {
            product: products[4]._id,
            quantity: 1,
            price: products[4].price,
            total: products[4].price,
          },
        ],
        subtotal: products[4].price,
        shippingCharges: 10,
        tax: products[4].price * 0.05,
        total: products[4].price + 10 + products[4].price * 0.05,
        shippingAddress: {
          fullName: "Sarah Khan",
          phoneNumber: "+92-300-1111111",
          addressLine1: "123 Main Street, Block 15",
          addressLine2: "Gulshan-e-Iqbal",
          city: "Karachi",
          state: "Sindh",
          postalCode: "75300",
          country: "Pakistan",
        },
        orderNumber: `ORD-${Date.now()}-1004`,
        status: "Pending",
        paymentStatus: "Pending",
        paymentMethod: "Cash on Delivery",
        orderedAt: new Date(),
      },
    ];
    
    await Order.insertMany(orderData);

    console.log("✅ Created 4 orders");

    // Create Vendor Requests
    console.log("🏪 Creating vendor requests...");
    await VendorRequest.insertMany([
      {
        name: "Muhammad Hassan",
        email: "hassan@techsolutions.com",
        phoneNumber: "+92-300-7777777",
        cnic: "42101-1234567-8",
        cnicFrontImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
        cnicBackImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
        companyName: "Tech Solutions Pro",
        businessEmail: "info@techsolutionspro.com",
        contactNumber: "+92-300-7777777",
        businessAddress: "Plot 45, I.I. Chundrigar Road",
        city: "Karachi",
        businessType: "Retail",
        typesOfProducts: "Electronics, Computer Hardware, Accessories",
        taxRegistrationNumber: "TAX-2024-00123",
        businessLicense: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
        cnicNumber: "42101-1234567-8",
        status: "Pending",
      },
      {
        name: "Ayesha Malik",
        email: "ayesha@styleavenue.com",
        phoneNumber: "+92-321-8888888",
        cnic: "35202-9876543-2",
        cnicFrontImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
        cnicBackImage: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500",
        companyName: "Style Avenue",
        businessEmail: "business@styleavenue.com",
        contactNumber: "+92-321-8888888",
        businessAddress: "Shop 12, MM Alam Road",
        city: "Lahore",
        businessType: "Retail",
        typesOfProducts: "Fashion, Clothing, Accessories",
        taxRegistrationNumber: "TAX-2024-00456",
        businessLicense: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
        cnicNumber: "35202-9876543-2",
        status: "Pending",
      },
    ]);

    console.log("✅ Created 2 vendor requests");

    // Create Contact Requests
    console.log("📧 Creating contact requests...");
    await ContactRequest.insertMany([
      {
        name: "Usman Ahmed",
        email: "usman@email.com",
        phoneNumber: "+92-300-9999999",
        subject: "Product Inquiry",
        message: "I would like to know more about the warranty on laptops. Do you offer extended warranty options?",
        status: "Pending",
      },
      {
        name: "Zainab Ali",
        email: "zainab@email.com",
        phoneNumber: "+92-321-8888888",
        subject: "Order Issue",
        message: "My order #ORD-123456 hasn't arrived yet. Can you please check the status?",
        status: "Pending",
      },
      {
        name: "Bilal Khan",
        email: "bilal@email.com",
        phoneNumber: "+92-333-7777777",
        subject: "Partnership",
        message: "I'm interested in becoming a vendor on your platform. What are the requirements?",
        status: "Resolved",
      },
    ]);

    console.log("✅ Created 3 contact requests");

    console.log("\n🎉 SEED DATA CREATED SUCCESSFULLY!");
    console.log("\n📊 Summary:");
    console.log(`   - Users: ${customers.length + 3} (1 Admin, 2 Vendors, ${customers.length} Customers)`);
    console.log("   - Categories: 7 (3 main + 4 subcategories)");
    console.log("   - Products: 8");
    console.log("   - Orders: 4");
    console.log("   - Vendor Requests: 2");
    console.log("   - Contact Requests: 3");
    console.log("\n✅ SwapNShare database is now populated with realistic data!");
    console.log("\n🔐 Admin Login:");
    console.log("   Email: tanveerxray@gmail.com");
    console.log("   Password: QWnr12@YUd");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: {
          type: String,
          trim: true,
        },
        total: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      addressLine1: { type: String, required: true, trim: true },
      addressLine2: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    billingAddress: {
      fullName: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      addressLine1: { type: String, trim: true },
      addressLine2: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Debit Card", "PayPal", "Stripe", "Bank Transfer"],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Pending",
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    shippedAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ vendor: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;


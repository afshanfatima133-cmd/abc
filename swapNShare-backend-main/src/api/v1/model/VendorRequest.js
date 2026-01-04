const mongoose = require("mongoose");

const vendorRequestSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    cnic: {
      type: String,
      trim: true,
      required: [true, "CNIC is required"],
    },
    cnicFrontImage: {
      type: String,
    },
    cnicBackImage: {
      type: String,
    },

    // Company Information
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    businessEmail: {
      type: String,
      required: [true, "Business email is required"],
      trim: true,
    },
    businessAddress: {
      type: String,
      required: [true, "Business address is required"],
      trim: true,
    },
    businessType: {
      type: String,
      required: [true, "Business type is required"],
    },
    typesOfProducts: {
      type: String,
      required: [true, "Types of products is required"],
      trim: true,
    },
    taxRegistrationNumber: {
      type: String,
      trim: true,
    },
    businessLicense: {
      type: String,
    },

    // Request Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
vendorRequestSchema.index({ status: 1 });
vendorRequestSchema.index({ email: 1 });
vendorRequestSchema.index({ createdAt: -1 });

const VendorRequest = mongoose.model("VendorRequest", vendorRequestSchema);
module.exports = VendorRequest;


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    costPrice: {
      type: Number,
      min: 0,
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    barcode: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor is required"],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive", "Out of Stock", "Discontinued"],
      default: "Active",
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
      default: "New",
    },
    brand: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
productSchema.index({ name: 1 });
productSchema.index({ status: 1 });
productSchema.index({ category: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;


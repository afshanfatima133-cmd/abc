const Product = require("../model/Product");
const Category = require("../model/Category");
const AppError = require("../utils/AppError");
const HttpStatusCodes = require("../enums/httpStatusCode");

class ProductService {
  /**
   * Create a new product
   */
  static async createProduct(data) {
    const {
      name,
      description,
      shortDescription,
      price,
      comparePrice,
      costPrice,
      sku,
      barcode,
      quantity,
      category,
      subCategory,
      vendor,
      images,
      status,
      condition,
      brand,
      weight,
      dimensions,
      tags,
      featured,
    } = data;

    // Validate required fields
    if (!name || !price || !category || !vendor) {
      throw new AppError(
        "Name, price, category, and vendor are required.",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new AppError("Category not found.", HttpStatusCodes.NOT_FOUND);
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      shortDescription,
      price,
      comparePrice,
      costPrice,
      sku,
      barcode,
      quantity,
      category,
      subCategory,
      vendor,
      images,
      status,
      condition,
      brand,
      weight,
      dimensions,
      tags,
      featured,
    });

    await newProduct.save();

    return {
      success: true,
      message: "Product created successfully.",
      data: newProduct,
    };
  }

  /**
   * Get all products
   */
  static async getAllProducts(filters = {}) {
    const {
      category,
      vendor,
      status,
      minPrice,
      maxPrice,
      featured,
      search,
      page = 1,
      limit = 20,
    } = filters;

    const query = {};

    if (category) query.category = category;
    if (vendor) query.vendor = vendor;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("vendor", "name email companyName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    return {
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get product by ID
   */
  static async getProductById(productId) {
    const product = await Product.findById(productId)
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("vendor", "name email companyName phoneNumber");

    if (!product) {
      throw new AppError("Product not found.", HttpStatusCodes.NOT_FOUND);
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    return {
      success: true,
      data: product,
    };
  }

  /**
   * Update product
   */
  static async updateProduct(productId, updateData) {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new AppError("Product not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      message: "Product updated successfully.",
      data: product,
    };
  }

  /**
   * Delete product
   */
  static async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new AppError("Product not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  }

  /**
   * Create a new category
   */
  static async createCategory(data) {
    const { name, description, image, status, parentCategory, order } = data;

    if (!name) {
      throw new AppError("Category name is required.", HttpStatusCodes.BAD_REQUEST);
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new AppError("Category already exists.", HttpStatusCodes.BAD_REQUEST);
    }

    const newCategory = new Category({
      name,
      description,
      image,
      status,
      parentCategory,
      order,
    });

    await newCategory.save();

    return {
      success: true,
      message: "Category created successfully.",
      data: newCategory,
    };
  }

  /**
   * Get all categories
   */
  static async getAllCategories() {
    const categories = await Category.find({ parentCategory: null })
      .populate("subcategories")
      .sort({ order: 1, name: 1 });

    return {
      success: true,
      data: categories,
    };
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(categoryId) {
    const category = await Category.findById(categoryId).populate("subcategories");

    if (!category) {
      throw new AppError("Category not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      data: category,
    };
  }

  /**
   * Get all subcategories of a category
   */
  static async getSubCategories(parentCategoryId) {
    const subCategories = await Category.find({ parentCategory: parentCategoryId }).sort({
      order: 1,
      name: 1,
    });

    return {
      success: true,
      data: subCategories,
    };
  }

  /**
   * Update category
   */
  static async updateCategory(categoryId, updateData) {
    const category = await Category.findByIdAndUpdate(categoryId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      throw new AppError("Category not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      message: "Category updated successfully.",
      data: category,
    };
  }

  /**
   * Delete category
   */
  static async deleteCategory(categoryId) {
    // Check if category has products
    const productsCount = await Product.countDocuments({ category: categoryId });
    if (productsCount > 0) {
      throw new AppError(
        "Cannot delete category with existing products.",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Check if category has subcategories
    const subCategoriesCount = await Category.countDocuments({ parentCategory: categoryId });
    if (subCategoriesCount > 0) {
      throw new AppError(
        "Cannot delete category with existing subcategories.",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      throw new AppError("Category not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      message: "Category deleted successfully.",
    };
  }
}

module.exports = ProductService;


const ProductService = require("../services/product.service");
const catchAsyncHandler = require("../utils/catchAsyncHandler");

class ProductController {
  /**
   * Create a new product
   */
  static createProduct = catchAsyncHandler(async (req, res) => {
    const result = await ProductService.createProduct(req.body);
    return res.status(201).json(result);
  });

  /**
   * Get all products
   */
  static getAllProducts = catchAsyncHandler(async (req, res) => {
    const result = await ProductService.getAllProducts(req.query);
    return res.status(200).json(result);
  });

  /**
   * Get product by ID
   */
  static getProductById = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    return res.status(200).json(result);
  });

  /**
   * Update product
   */
  static updateProduct = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.updateProduct(id, req.body);
    return res.status(200).json(result);
  });

  /**
   * Delete product
   */
  static deleteProduct = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);
    return res.status(200).json(result);
  });

  /**
   * Create a new category
   */
  static createCategory = catchAsyncHandler(async (req, res) => {
    const result = await ProductService.createCategory(req.body);
    return res.status(201).json(result);
  });

  /**
   * Get all categories
   */
  static getAllCategories = catchAsyncHandler(async (req, res) => {
    const result = await ProductService.getAllCategories();
    return res.status(200).json(result);
  });

  /**
   * Get category by ID
   */
  static getCategoryById = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.getCategoryById(id);
    return res.status(200).json(result);
  });

  /**
   * Get subcategories
   */
  static getSubCategories = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.getSubCategories(id);
    return res.status(200).json(result);
  });

  /**
   * Update category
   */
  static updateCategory = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.updateCategory(id, req.body);
    return res.status(200).json(result);
  });

  /**
   * Delete category
   */
  static deleteCategory = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.deleteCategory(id);
    return res.status(200).json(result);
  });
}

module.exports = ProductController;


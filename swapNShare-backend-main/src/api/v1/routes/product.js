const express = require("express");
const ProductController = require("../controller/ProductController");
const {
  isAuthenticated,
  restrictTo,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Category routes (must come before /:id routes)
router.post(
  "/create-category",
  isAuthenticated,
  restrictTo("Admin"),
  ProductController.createCategory
);

router.get("/categories", ProductController.getAllCategories);

router.get("/all-sub-category/:id", ProductController.getSubCategories);

router.get("/category/:id", ProductController.getCategoryById);

router.patch(
  "/category/:id",
  isAuthenticated,
  restrictTo("Admin"),
  ProductController.updateCategory
);

router.delete(
  "/category/:id",
  isAuthenticated,
  restrictTo("Admin"),
  ProductController.deleteCategory
);

// Product routes
router.post(
  "/create-product",
  isAuthenticated,
  restrictTo("Admin", "Vendor"),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.patch(
  "/:id",
  isAuthenticated,
  restrictTo("Admin", "Vendor"),
  ProductController.updateProduct
);

router.delete(
  "/:id",
  isAuthenticated,
  restrictTo("Admin", "Vendor"),
  ProductController.deleteProduct
);

module.exports = router;


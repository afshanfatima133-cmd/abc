const express = require("express");
const OrderController = require("../controller/OrderController");
const {
  isAuthenticated,
  restrictTo,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Order routes
router.post(
  "/create-order",
  isAuthenticated,
  OrderController.createOrder
);

router.get(
  "/orders",
  isAuthenticated,
  OrderController.getAllOrders
);

router.get(
  "/orders-by-vendor",
  isAuthenticated,
  restrictTo("Admin", "Vendor"),
  OrderController.getOrdersByVendor
);

router.get(
  "/order/:id",
  isAuthenticated,
  OrderController.getOrderById
);

router.patch(
  "/update-order-status",
  isAuthenticated,
  restrictTo("Admin", "Vendor"),
  OrderController.updateOrderStatus
);

router.delete(
  "/order/:id",
  isAuthenticated,
  restrictTo("Admin"),
  OrderController.deleteOrder
);

module.exports = router;


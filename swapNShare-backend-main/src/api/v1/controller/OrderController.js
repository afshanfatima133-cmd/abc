const OrderService = require("../services/order.service");
const catchAsyncHandler = require("../utils/catchAsyncHandler");

class OrderController {
  /**
   * Create a new order
   */
  static createOrder = catchAsyncHandler(async (req, res) => {
    const result = await OrderService.createOrder(req.body);
    return res.status(201).json(result);
  });

  /**
   * Get all orders
   */
  static getAllOrders = catchAsyncHandler(async (req, res) => {
    const result = await OrderService.getAllOrders(req.query);
    return res.status(200).json(result);
  });

  /**
   * Get orders by vendor
   */
  static getOrdersByVendor = catchAsyncHandler(async (req, res) => {
    const { vendorId } = req.params;
    const result = await OrderService.getOrdersByVendor(vendorId, req.query);
    return res.status(200).json(result);
  });

  /**
   * Get order by ID
   */
  static getOrderById = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await OrderService.getOrderById(id);
    return res.status(200).json(result);
  });

  /**
   * Update order status
   */
  static updateOrderStatus = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await OrderService.updateOrderStatus(id, req.body);
    return res.status(200).json(result);
  });

  /**
   * Delete order
   */
  static deleteOrder = catchAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await OrderService.deleteOrder(id);
    return res.status(200).json(result);
  });
}

module.exports = OrderController;


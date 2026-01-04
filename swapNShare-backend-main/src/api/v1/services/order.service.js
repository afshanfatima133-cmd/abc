const Order = require("../model/Order");
const Product = require("../model/Product");
const AppError = require("../utils/AppError");
const HttpStatusCodes = require("../enums/httpStatusCode");

class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(data) {
    const {
      user,
      vendor,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      discount,
      total,
      notes,
    } = data;

    // Validate required fields
    if (!user || !items || items.length === 0 || !shippingAddress || !total) {
      throw new AppError(
        "User, items, shipping address, and total are required.",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Validate stock availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(`Product ${item.product} not found.`, HttpStatusCodes.NOT_FOUND);
      }
      if (product.quantity < item.quantity) {
        throw new AppError(
          `Insufficient stock for product ${product.name}.`,
          HttpStatusCodes.BAD_REQUEST
        );
      }
    }

    // Create new order
    const newOrder = new Order({
      user,
      vendor,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      discount,
      total,
      notes,
    });

    await newOrder.save();

    // Update product quantities
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity, soldCount: item.quantity },
      });
    }

    return {
      success: true,
      message: "Order created successfully.",
      data: newOrder,
    };
  }

  /**
   * Get all orders
   */
  static async getAllOrders(filters = {}) {
    const {
      user,
      vendor,
      orderStatus,
      paymentStatus,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = filters;

    const query = {};

    if (user) query.user = user;
    if (vendor) query.vendor = vendor;
    if (orderStatus) query.orderStatus = orderStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("user", "name email phoneNumber")
      .populate("vendor", "name email companyName")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    return {
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get orders by vendor
   */
  static async getOrdersByVendor(vendorId, filters = {}) {
    const { orderStatus, paymentStatus, page = 1, limit = 20 } = filters;

    const query = { vendor: vendorId };

    if (orderStatus) query.orderStatus = orderStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("user", "name email phoneNumber")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    return {
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId) {
    const order = await Order.findById(orderId)
      .populate("user", "name email phoneNumber address")
      .populate("vendor", "name email companyName phoneNumber")
      .populate("items.product", "name images price");

    if (!order) {
      throw new AppError("Order not found.", HttpStatusCodes.NOT_FOUND);
    }

    return {
      success: true,
      data: order,
    };
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(orderId, data) {
    const { orderStatus, paymentStatus, trackingNumber, notes } = data;

    const updateData = {};
    if (orderStatus) {
      updateData.orderStatus = orderStatus;
      if (orderStatus === "Shipped") {
        updateData.shippedAt = new Date();
      } else if (orderStatus === "Delivered") {
        updateData.deliveredAt = new Date();
      } else if (orderStatus === "Cancelled") {
        updateData.cancelledAt = new Date();
        if (data.cancellationReason) {
          updateData.cancellationReason = data.cancellationReason;
        }
      }
    }
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (notes) updateData.notes = notes;

    const order = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      throw new AppError("Order not found.", HttpStatusCodes.NOT_FOUND);
    }

    // If order is cancelled, restore product quantities
    if (orderStatus === "Cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: item.quantity, soldCount: -item.quantity },
        });
      }
    }

    return {
      success: true,
      message: "Order updated successfully.",
      data: order,
    };
  }

  /**
   * Delete order (Admin only)
   */
  static async deleteOrder(orderId) {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      throw new AppError("Order not found.", HttpStatusCodes.NOT_FOUND);
    }

    // Restore product quantities if order wasn't delivered
    if (order.orderStatus !== "Delivered") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: item.quantity, soldCount: -item.quantity },
        });
      }
    }

    return {
      success: true,
      message: "Order deleted successfully.",
    };
  }
}

module.exports = OrderService;


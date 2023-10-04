const { Order } = require("../model/Order");
const { Product } = require("../model/Product");
const { User } = require("../model/User");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(4001).json(error);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  for (let item of order.items) {
    const product = await Product.findOne({ _id: item.product.id });
    product.$inc("stock", -1 * item.quantity );
    await product.save();
  }
  order.save()
    .then(async (data) => {
      const user = await User.findById(order.user);
      sendMail({
        to: user.email,
        html: invoiceTemplate(order),
        subject: "Thanks for Order",
      });
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    let cart = await Order.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({ deleted: { $ne: true } });
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  const totalDocs = await totalOrdersQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

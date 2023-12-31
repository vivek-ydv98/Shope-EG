const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(4001).json(error);
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.user;
  const carts = new Cart({ ...req.body, user: id });
  try {
    const doc = await carts.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    let cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    let result = await cart.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    let cart = await Cart.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

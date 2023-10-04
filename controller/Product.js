const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  // const productCreated = await Product.insertMany(req.body)
  const product = new Product(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  product
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.fetchProducts = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true }; //not equal to
  }

  let query = Product.find(condition);
  let totalProductQuery = Product.find(condition);
  if (req.query.category) {
    const categories = req.query.category.split(",");
    query = query.find({ category: { $in: categories } });
    totalProductQuery = totalProductQuery.find({
      category: { $in: categories },
    });
  }
  if (req.query.brand) {
    const brands = req.query.brand.split(",");
    query = query.find({ brand: { $in: brands } });
    totalProductQuery = totalProductQuery.find({ brand: { $in: brands } });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  const totalDocs = await totalProductQuery.count().exec();

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

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    const updateProduct = await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

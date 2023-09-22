const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(4001).json(error);
  }
};
exports.createCategory = async (req, res) => {
  // const productCreated = await Category.insertMany(req.body)
  const category = new Category(req.body);
  category.save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

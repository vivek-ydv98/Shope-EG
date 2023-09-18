const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(4001).json(error);
  }
};
exports.createBrand = async (req, res) => {
    // const productCreated = await Brand.insertMany(req.body)
    const brand = new Brand(req.body);
    brand.save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
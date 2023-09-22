const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((doc) => {
      res.status(201).json({ id: doc.id, role: doc.role });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      res.status(401).json({ message: "No Such User Found" });
    } else if (user.password === req.body.password) {
      res.status(201).json({ id: user.id, role: user.role });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

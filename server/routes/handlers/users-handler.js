const User = require("../../models/user");

const getUserById = (req, res) => {
  const foundUser = User.findOne({ email: req.body.email });

  if (foundUser) {
    res.status(200).json({
      status: 200,
      user: foundUser,
    });
  } else {
    res.status(404).json({
      status: 404,
      msg: "User not found!",
    });
  }
};

const updateUserCart = (req, res) => {
  const foundUser = User.findOne({ email: req.body.email });

  if (!foundUser) {
    return res.status(404).json({
      status: 404,
      msg: "User not found",
    });
  } else {
    if (foundUser.cart[req.body.cartItem.id]) {
      foundUser.cart[req.body.cartItem.id].quantity += 1;
    } else {
      foundUser.cart[req.body.cartItem.id] = {
        id: req.body.cartItem.id,
        name: req.body.cartItem.name,
        price: req.body.cartItem.price,
        imageSrc: req.body.cartItem.imageSrc,
        quantity: 1,
      };
    }
   
    return res.status(200).json({ status: 200, msg: "success" });
  }
};

const addUser = (req, res) => {
  const foundUser = User.findOne({ email: req.body.email });

  if (!foundUser) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isSignedIn: true,
    });
    user.save();

    res.status(200).json({
      status: 200,
      user: req.body,
    });
  } else {
    res.status(400).json({
      status: 400,
      msg: "User already exists!",
    });
  }
};

module.exports = {
  getUserById,
  updateUserCart,
  addUser,
};

const users = require("../../data/user.json");

const getUserById = (req, res) => {
  console.log(req.body);
  console.log(users);

  const foundUser = users.find((user) => user.email === req.body.email);

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
const foundUser = users.find((user)=> user.email === req.body.email);

if (!foundUser) {
  return res.status(404).json({
    status:404,
    msg: "User not found"
  })
} else {
  if (foundUser.cart[req.body.cartItem.id]) {
    foundUser.cart[req.body.cartItem.id].quantity += 1
  } else {
    foundUser.cart[req.body.cartItem.id] = {
      id: req.body.cartItem.id,
      name: req.body.cartItem.name,
      price: req.body.cartItem.price,
      imageSrc: req.body.cartItem.imageSrc,
      quantity: 1,
    }

  }
  console.log(foundUser);
  console.log(users);
  return res.status(200).json({status: 200, msg: "success"})
} 

};

module.exports = {
  getUserById,
  updateUserCart,
};

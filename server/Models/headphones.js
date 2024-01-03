const mong = require("mongoose");

const headphones = mong.model("headphones", {
  name: String,
  breifDesc: String,
  detailedDesc: { points: [String] },
  type: String,
  price: Number,
  prodimage: String,
  color: String,
  featured: Boolean,
});
const cartItems = mong.model("cartItems",{
  items:[mong.Schema.Types.ObjectId]
})

module.exports = {headphones,cartItems};

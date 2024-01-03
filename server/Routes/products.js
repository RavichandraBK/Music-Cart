const express = require("express");
const router = express.Router();
const { headphones, cartItems } = require("../Models/headphones");
// const verify = require("../Middleware/verifyauth");
router.post("/add-items", async (req, res) => {
  const { _id } = req.body;
  try {
    const cart = await cartItems.findOne({ items: { $in: _id } });
    // console.log(cart)
    if (!cart) {
      const newItem = await cartItems.updateOne({ $addToSet: { items: _id } });
      res.send({ message: "✅Successfully added the item to cart", newItem });
    } else {
      res.send({ message: "Item is already in cart" });
    }
  } catch (err) {
    console.log("Something went wrong couldnt fetch the products");
  }
});

router.get("/cart-items", async (req, res) => {
  try {
    const getCart = await cartItems.find({});
    // console.log(getCart[0].items);
    if (!getCart) {
      res.json({ message: "Item not found" });
    } else {
      const cartProd = await Promise.all(
        getCart[0].items.map(async (itemId) => {
          // console.log(itemId);
          return await headphones.findOne({ _id: itemId });
        })
      );
      res.json({ message: "Successful", cartProd });
    }
  } catch (err) {
    console.log(err, "Error while fetching the cart");
  }
});

router.post("/filters", async (req, res) => {
  try {
    const { brandName, brandtype, sorted, prodPrice, brandcolor } = req.body;

    const noFilters =
      !brandName && !brandtype && !sorted && !prodPrice && !brandcolor;
    const sortCriteria = {};
    console.log(!noFilters);
    let query = {};
    if (!noFilters) {
      console.log(brandName);
      if (brandName) {
        query.name = { $regex: brandName, $options: "i" };
      }
      if (brandtype) {
        query.type = { $regex: brandtype, $options: "i" };
      }
      if (prodPrice) {
        const cleanedRange = prodPrice.replace(/₹/g, "").split("-");
        const priceRange = cleanedRange.map((value) => parseInt(value, 10));
        query.price = { $gte: priceRange[0], $lte: priceRange[1] };
      }
      if (brandcolor) {
        query.color = { $regex: brandcolor, $options: "i" };
      }
      if (sorted) {
        const sortType = sorted.toLowerCase();
        if (sortType === "featured") {
          sortCriteria.featured = -1;
        } else if (sortType.startsWith("price")) {
          const order = sortType.split(":")[1] === "lowest" ? 1 : -1;
          console.log(sortType.split(":")[1]);
          sortCriteria.price = order;
          // console.log(sortCriteria)
        } else if (sortType.startsWith("name")) {
          const order = sortType.split(":")[1] === "(a-z)" ? 1 : -1;
          sortCriteria.name = order;
        }
      }
    }
    let prod;
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      prod = await headphones.find({}).sort(sortCriteria);
      console.log("Hari Hari");
    } else {
      console.log("Haribol");
      prod = await headphones.find(query).sort(sortCriteria);
    }

    if (prod && prod.length > 0) {
      res.send({ message: "Successful", prod });
    } else {
      res.send({ message: "!Currently there are no products to show" });
    }
  } catch (err) {
    console.log(err, "Something went wrong ,couldnt fetch the products");
  }
});
// router.post('/')

module.exports = router;

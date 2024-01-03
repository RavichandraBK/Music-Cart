import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const getProductsUrl = `${backendUrl}/api/products/filters`;
const getCartUrl = `${backendUrl}/api/products/cart-items`;
const addToCartUrl = `${backendUrl}/api/products/add-items`;
const delCartUrl = `${backendUrl}/api/products/delete-cart`;
const allProducts = async (filters) => {
  try {
   
    const response = await axios.post(getProductsUrl, filters);
    return response;
  } catch (err) {
    console.log(err, "Something went wrong while fetching products");
  }
};
const addItems = async (itemId) => {
  try {
    const response = await axios.post(addToCartUrl, itemId);
    return response;
  } catch (err) {
    console.log(err, "Couldnt add item to cart");
  }
};
const cartItems = async () => {
  try {
    const response = await axios(getCartUrl);
    return response;
  } catch (err) {
    console.log(err, "Couldnt get items from cart");
  }
};
const delCart = async () => {
  try {
    const response = await axios(delCartUrl);
    return response;
  } catch (err) {
    console.log(err, "Error while deleting the cart");
  }
};

export { allProducts, cartItems, addItems, delCart };

import React, { useEffect, useState, useContext } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BedCrums from "../../Components/BedCrums/BedCrums";
import styles from "./MyCart.module.css";
import bag from "../../assets/cartBag.png";
import { myContext } from "../../Contexts/myContext";
import { cartItems, delCart } from "../../apis/products";
import { useNavigate } from "react-router-dom";
const MyCart = () => {
  const [cartData, setCartData] = useState([]);
  const { login } = useContext(myContext);
  const Navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState([]);
  useEffect(() => {
    handleCart();
  }, []);
  const handleCart = async () => {
    const myCart = await cartItems();
   
    if (myCart.data.cartProd && myCart.data.cartProd.length > 0) {
      const prds = myCart.data.cartProd;
      const newArr = prds.map((item, indx) => ({
        prodQty: 1,
        prodPrice: item.price,
      }));
      setCartData(prds);
      setCartTotal(newArr);
    }
  };
  const handleCartTotal = (indx, e, itm) => {
    setCartTotal((prev) => {
      const updated = [...prev];
      updated[indx] = {
        prodQty: e.target.value,
        prodPrice: 1 * e.target.value * itm.price,
      };
      return updated;
    });
  };
  const handleOrder = async () => {
    if (login) {
      await delCart();
      Navigate("/Success");
    } else {
      Navigate("/Login");
    }
  };
  return (
    <>
      <Header />
      <div className={styles.myCartLogo}>
        <div>
          <BedCrums />
        </div>
      </div>
      <div className={styles.backBtn}>
        <button onClick={() => Navigate("/")}>Back to products</button>
      </div>
      <div className={styles.cartBag}>
        <img src={bag} alt="" />
        <p>My Cart</p>
      </div>
      {cartData && cartData.length > 0 ? (
        <div className={styles.cart}>
          <div className={styles.cartLeft}>
            <div className={styles.barType1}></div>
            <div className={styles.items}>
              {cartData.map((item, index) => {
                return (
                  <div className={styles.cartItems} key={index}>
                    <div className={styles.itemImage}>
                      <img src={item.prodimage} alt="" />
                    </div>
                    <div className={styles.itemBrand}>
                      <p>{item.name}</p>
                      <p>Colour : {item.color}</p>
                      <p>In Stock</p>
                    </div>
                    <div className={styles.itemPrice}>
                      <p>Price</p>
                      <p>{item.price}</p>
                    </div>
                    <div className={styles.itemQty}>
                      <p>Quantity</p>
                      <select
                        name=""
                        id=""
                        onChange={(e) => handleCartTotal(index, e, item)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <div className={styles.itemTotal}>
                      <p>Total</p>
                      <p>
                        {cartTotal[index]
                          ? cartTotal[index].prodPrice
                          : item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.barType3}></div>
            <div className={styles.itemCount}>
              <p>
                {cartData && cartData.length > 0
                  ? cartTotal.reduce((acc, itm) => {
                      return acc + Number(itm.prodQty);
                    }, 0)
                  : "0"}{" "}
                Item
              </p>
              <p>
                ₹
                {cartData && cartData.length > 0
                  ? cartTotal.reduce((acc, itm) => {
                      return acc + itm.prodPrice;
                    }, 0)
                  : "0"}
              </p>
            </div>
          </div>
          <div className={styles.barType2}></div>
          <div className={styles.cartRight}>
            <p>PRICE DETAILS</p>
            <div>
              <p>Total MRP</p>
              <p>
                ₹
                {cartTotal.reduce((acc, itm) => {
                  return acc + itm.prodPrice;
                }, 0)}
              </p>
            </div>
            <div>
              <p>Discount on MRP</p>
              <p>₹0</p>
            </div>
            <div>
              <p>Convenience Fee</p>
              <p>₹45</p>
            </div>
            <div className={styles.totalText}>
              <p>Total Amount</p>
              <p>
                ₹
                {cartTotal.reduce((acc, itm) => {
                  return acc + itm.prodPrice;
                }, 0) + 45}
              </p>
            </div>
            <button onClick={handleOrder}>
              {login ? "PLACE ORDER" : "Login"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.EmptyCart}>
            <p>😔Cart is empty</p>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default MyCart;

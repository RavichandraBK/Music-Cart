import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BedCrums from "../../Components/BedCrums/BedCrums";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Contexts/myContext";
const Checkout = () => {
  const prodDetails = JSON.parse(localStorage.getItem("itemDetails"));
  const { login } = useContext(myContext);
  const Navigate = useNavigate();
  const handleOrder = () => {
    if (login) {
      Navigate("/Success");
    } else {
      Navigate("/Login");
    }
  };
  return (
    <>
      <Header />
      <div className={styles.appLogo}>
        <div>
          <BedCrums />
        </div>
      </div>
      <div className={styles.backBtn}>
        <button onClick={() => Navigate("/Mycart")}>Back to Cart</button>
      </div>
      <p className={styles.checkOutText}>Checkout</p>
      <div className={styles.checkOut}>
        <div className={styles.checkOutLeft}>
          <div className={styles.delAdd}>
            <p>1. Delivery address</p>
            <p>Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025</p>
          </div>
          <div className={styles.lineBar}></div>
          <div className={styles.payment}>
            <p>2. Delivery address</p>
            <p>Pay on delivery ( Cash/Card)</p>
          </div>
          <div className={styles.lineBar}></div>
          <div className={styles.review}>
            <p>3. Review items and delivery</p>
            <div className={styles.itemPic}>
              <div>
                <div className={styles.itemImage}>
                  <img src={prodDetails.prodimage} alt="" />
                </div>
                <p>{prodDetails.name}</p>
                <p>Colour : {prodDetails.color}</p>
                <p>In Stock</p>
                <p>Estimated delivery : Monday — FREE Standard Delivery</p>
              </div>
            </div>
          </div>
          <div className={styles.lineBar}></div>
          <div className={styles.finalOrderOutline}>
            <button onClick={handleOrder}>
              {login ? "Place your order" : "Login"}
            </button>
            <div>
              <p>Order Total : ₹{prodDetails.price + 45}.00</p>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.checkOutRight}>
          <div>
            <div className={styles.sumBorder}>
              <button onClick={handleOrder}>
                {login ? "Place your order" : "Login"}
              </button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
              <div className={styles.sumLineBar}></div>
              <div className={styles.sumDetails}>
                <p>Order Summary</p>
                <div>
                  <p>Items : </p>
                  <p>₹{prodDetails.price}.00</p>
                </div>
                <div>
                  <p>Delivery : </p>
                  <p>₹45.00</p>
                </div>
              </div>
              <div className={styles.sumLineBar}></div>
              <div className={styles.sumTotal}>
                <p>Order Total : </p>
                <p>₹{prodDetails.price + 45}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

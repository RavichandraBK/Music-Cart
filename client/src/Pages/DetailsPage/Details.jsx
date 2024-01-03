import React, { useContext, useState } from "react";
import styles from "./Details.module.css";
import Header from "../../Components/Header/Header";
import BedCrums from "../../Components/BedCrums/BedCrums";
import cart from "../../assets/cartImage.svg";
import star from "../../assets/Star.svg";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext } from "../../Contexts/myContext";
import { useNavigate } from "react-router-dom";
import { addItems } from "../../apis/products";
const Details = () => {
  const prodDetails = JSON.parse(localStorage.getItem("itemDetails"));
  const { login } = useContext(myContext);
  const [cartMessage, setCartMessage] = useState("");
  const Navigate = useNavigate();
  const handleBuy = () => {
    if (login) {
      Navigate("/Checkout");
    } else {
      Navigate("/Login");
    }
  };
  const handleAddItem = async () => {
    const addCart = await addItems({ _id: prodDetails._id });
    if (addCart) {
      
      setCartMessage(addCart.data.message);
      showToast();
    }
  };
  const showToast = () => {
    toast(cartMessage, {
      position: toast.POSITION.BOTTOM_CENTER,
      className: "toast",
    });
  };

  return (
    <>
      <Header />
      <div className={styles.appLogo}>
        <div>
          <BedCrums />
        </div>
        <div className={styles.cartButton}>
          <button onClick={() => Navigate("/Mycart")}>
            <img src={cart} alt="" /> View Cart
          </button>
        </div>
      </div>
      <div className={styles.backBtn}>
        <button onClick={() => Navigate("/")}>Back to products</button>
      </div>
      <p className={styles.briefDesc}>{prodDetails.briefDescription}</p>
      <div className={styles.details}>
        <div className={styles.detailsLeft}>
          <div>
            <img src={prodDetails.prodimage} alt="" />
          </div>

          <div className={styles.detailedImages}>
            {prodDetails ? (
              prodDetails.detailedImages.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item} alt="" />
                  </div>
                );
              })
            ) : (
              <>
                <p>more images are not available</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.detailsRight}>
          <p className={styles.prodName}>{prodDetails.name}</p>
          <div className={styles.rating}>
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <p>((50 Customer reviews))</p>
          </div>
          <p className={styles.headPrice}>Price - ₹ {prodDetails.price}</p>
          <p className={styles.headType}>
            {prodDetails.color} | {prodDetails.type}
          </p>
          <div className={styles.desc}>
            <p>About this item</p>
            <ul>
              {prodDetails ? (
                prodDetails.detailedDesc.points.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <>
                  <p>No product information</p>
                </>
              )}
            </ul>
          </div>
          <p className={styles.avail}>
            Available <span>- In stock</span>
          </p>
          <p className={styles.brand}>
            Brand <span> - {prodDetails.brand}</span>
          </p>
          <div className={styles.buyBtns}>
            <button onClick={handleAddItem}>Add to cart</button>
            <button onClick={handleBuy}>{login ? "Buy Now" : "Login"}</button>
          </div>
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#ffd600", color: "#000" }}
      />
      <Footer />
    </>
  );
};

export default Details;

import React, { useContext, useEffect, useState } from "react";
// import tmp from "../../assets/tmpImage.jpg";
import styles from "./Headphone.module.css";
import addItem from "../../assets/addToCart.png";
// import { myContext } from "../../Contexts/myContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addItems } from "../../apis/products";
const Headphone = ({
  headName,
  headImg,
  headPrice,
  headType,
  headClr,
  headDesc,
  islistView,
  headItem,
  setCartMsg,
  handleToast,
}) => {
  // const {singleItem,setSingleItem} = useContext(myContext);
  const Navigate = useNavigate();

  const handleItem = () => {
    // setSingleItem({...singleItem,zprodDetails:headItem});
    localStorage.setItem("itemDetails", JSON.stringify(headItem));
    Navigate("/Details");
  };
  const handleAddItem = async () => {
    const addCart = await addItems({ _id: headItem._id });
    if (addCart) {
      // console.log(addCart.data.message);
      setCartMsg(addCart.data.message);
      handleToast();
    }
  };

  return (
    <>
      <div
        className={styles.product}
        style={{ display: islistView ? "flex" : "block" }}
      >
        <div className={styles.productPic}>
          <img src={headImg} alt="" onClick={handleItem} />
          <div className={styles.cart} onClick={handleAddItem}>
            <img src={addItem} alt="" />
          </div>
        </div>
        <div className={styles.productDetail}>
          {islistView ? (
            <>
              <p className={styles.flexTxt}>{headName}</p>
              <p className={styles.detailTxt2}>Price - ₹ {headPrice}</p>
              <p className={styles.detailTxt2}>
                {headClr} | {headType}
              </p>
              <p className={styles.detailTxt2}>{headDesc}</p>
              <button>Haribol</button>
            </>
          ) : (
            <>
              <p className={styles.blockTxt}>{headName}</p>
              <p className={styles.detailTxt1}>Price - ₹ {headPrice}</p>
              <p className={styles.detailTxt1}>
                {headClr} | {headType}
              </p>
            </>
          )}

          {/* <p className={styles.flexTxt}>{headName}</p>
          <p className={styles.detailTxt2}>Price - ₹ {headPrice}</p>
          <p className={styles.detailTxt2}>{headClr} | {headType}</p>
          <p className={styles.detailTxt2}>{headDesc}</p>
          <button>Haribol</button> */}
        </div>
      </div>
    </>
  );
};

export default Headphone;

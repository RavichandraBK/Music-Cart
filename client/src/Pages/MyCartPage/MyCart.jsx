import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BedCrums from "../../Components/BedCrums/BedCrums";
import cart from "../../assets/cartImage.svg";
import styles from "./MyCart.module.css";
import tmp from "../../assets/tmpImage.jpg";
import bag from "../../assets/cartBag.png";
import { cartItems } from "../../apis/products";
import { useNavigate } from "react-router-dom";
const MyCart = () => {
  const [cartData, setCartData] = useState([]);
  const Navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState({
    totalprodQty: '',
    prodPrice: '',
  });
  const [selectedQuantities, setSelectedQuantities] = useState([]);

  // Function to handle changes in the select option
  const handleSelectChange = (index, e) => {
    const newValues = [...selectedQuantities];
    newValues[index] = parseInt(e.target.value, 10);
    setSelectedQuantities(newValues);
  };

  // Calculate the total sum of all selected quantities
  const totalQuantity = selectedQuantities.reduce((acc, value) => acc + value, 0);
  useEffect(() => {
    handleCart();
  }, []);
  //   const totalPrds = useMemo(()=>{
  //     return Object.values(cartTotal).reduce((acc,item)=>
  //       acc + (item.prodQty?item.prodQty:1),0
  // )
  // },[cartTotal])
   const totalPrds = useMemo(()=>{
   return  Object.values(cartTotal).reduce((acc,item)=>{
      if(item && item.prodQty){
        return acc + parseInt(item.prodQty,10)
      }
      return acc;
    },0)
  },[cartTotal])
  // setCartTotal({...cartTotal,totalprodQty:totalPrds});
  // Object.values(cartTotal).map((item)=>console.log(item.prodQty));
  // const sumOfDigits = String(totalPrds)
  //   .split('')
  //   .map(Number)
  //   .reduce((acc, digit) => acc + digit, 1);
  const handleCart = async () => {
    const myCart = await cartItems();
    if (myCart.data.cartProd && myCart.data.cartProd.length > 0) {
      // console.log('setting cart')
      setCartData(myCart.data.cartProd);
    }
  };
  const handleCartTotal = (e, itm) => {
    console.log(itm);
    setCartTotal({
      ...cartTotal,
      [itm._id]: {
        ...cartTotal[itm._id],
        prodQty: e.target.value,
        prodPrice: 1 * e.target.value * itm.price,
      },
      totalprodQty: cartTotal.totalprodQty+e.target.value,
    });
  };
  const handleOrder = ()=>{
    Navigate('/Success')
  }
  return (
    <>
      <Header />
      <div className={styles.myCartLogo}>
        <div>
          <BedCrums />
        </div>
        {/* <div className={styles.cartButton}>
          <button>
            <img src={cart} alt="" /> View Cart
          </button>
        </div> */}
      </div>
      <div className={styles.backBtn}>
        <button onClick={()=>Navigate('/')}>Back to products</button>
      </div>
      <div className={styles.cartBag}>
        <img src={bag} alt="" />
        <p>My Cart</p>
      </div>
      <div className={styles.cart}>
        <div className={styles.cartLeft}>
          <div className={styles.barType1}></div>
          <div className={styles.items}>
            {cartData && cartData.length > 0 ? (
              cartData.map((item, index) => {
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
                        onChange={(e) => handleSelectChange(index, e)}
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
                        {cartTotal[item._id]
                          ? cartTotal[item._id].prodPrice
                          : item.price}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <p>Cart is Empty</p>
              </>
            )}

            {/* <div className={styles.cartItems}>
                <div className={styles.itemImage}>
                    <img src={tmp} alt="" />
                </div>
                <div className={styles.itemBrand}>
                    <p>Hare Krishna</p>
                    <p>Colour : Black</p>
                    <p>In Stock</p>
                </div>
                <div className={styles.itemPrice}>
                    <p>Price</p>
                    <p>Haribol</p>
                </div>
                <div className={styles.itemQty}>
                    <p>Quantity</p>
                    <select name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                    </select>
                </div>
                <div className={styles.itemTotal}>
                    <p>Total</p>
                    <p>Haribol</p>
                </div>
            </div> */}
          </div>
          <div className={styles.barType3}></div>
          <div className={styles.itemCount}>
            <p>{totalQuantity} Item</p>
            <p>₹3500</p>
          </div>
        </div>
        <div className={styles.barType2}></div>
        <div className={styles.cartRight}>
          <p>PRICE DETAILS</p>
          <div>
            <p>Total MRP</p>
            <p>₹3500</p>
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
            <p>₹3545</p>
          </div>
          <button onClick={handleOrder}>PLACE ORDER</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCart;

import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import styles from "./Home.module.css";
import Footer from "../../Components/Footer/Footer";
import BedCrums from "../../Components/BedCrums/BedCrums";
import cart from "../../assets/cartImage.svg";
import Image1 from "../../assets/homeImage1.png";
import Image2 from "../../assets/homeImage2.png";
import Image3 from "../../assets/homeImage3.png";
import Image4 from "../../assets/homeImage4.png";
import search from "../../assets/searchIcon.svg";
import Headphone from "../../Components/Headphone/Headphone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allProducts } from "../../apis/products";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const Navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 391 });
  const [filters, setFilters] = useState({
    brandName: "",
    brandtype: "",
    sorted: "",
    prodPrice: "",
    brandcolor: "",
  });
  const [allItems, setAllItems] = useState([]);
  const [listView, setListView] = useState(false);
  const [emptyProd, setEmptyProd] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  useEffect(() => {
    handleProducts();
  }, [filters]);
  const handleView = () => {
    setListView(!listView);
  };
  const headProds = {
    display: listView ? "block" : "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "5vmin",
  };
  const handleProducts = async () => {
    const getProd = await allProducts(filters);
    if (getProd.data.message === "There are no products to show") {
      setEmptyProd(true);
    }
    if (getProd && getProd.data) {
      
      setAllItems(getProd.data.prod);
      setEmptyProd(false);
    } else {
      console.log("Couldnt get products");
    }
  };
  const handleFilters = (e) => {
    const selFilter = e.target.value;
    if (selFilter !== "") {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
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
      <div>
        {!isMobile && (
          <>
            <Header />
            <div className={styles.homeBedCrump}>
              <div className={styles.bedCrumpLogo}>
                <BedCrums bedCrump={true} />
              </div>
              <div className={styles.homeCartButton}>
                <button onClick={() => Navigate("/Mycart")}>
                  <img src={cart} alt="" /> View Cart
                </button>
              </div>
            </div>
          </>
        )}
        <div className={styles.homePoster}>
          <img src={Image1} alt="" />
          <img src={Image2} alt="" />
          <img src={Image3} alt="" />
          <img src={Image4} alt="" />
        </div>
        {!isMobile && (
          <div className={styles.homeSearchBar}>
            <img src={search} alt="" />
            <input
              type="text"
              name="brandName"
              id=""
              placeholder="Search Product"
              onChange={handleFilters}
            />
          </div>
        )}
        <div className={styles.homeFilters}>
          {!isMobile && (
            <div className={styles.homeViews}>
              <div className={styles.homeGridView} onClick={handleView}>
                <div>
                  <div
                    className={styles.gridBox1}
                    style={{ backgroundColor: !listView && "#000" }}
                  ></div>
                  <div
                    className={styles.gridBox2}
                    style={{ backgroundColor: !listView && "#000" }}
                  ></div>
                </div>
                <div>
                  <div
                    className={styles.gridBox3}
                    style={{ backgroundColor: !listView && "#000" }}
                  ></div>
                  <div
                    className={styles.gridBox4}
                    style={{ backgroundColor: !listView && "#000" }}
                  ></div>
                </div>
              </div>
              <div className={styles.homeListView} onClick={handleView}>
                <div className={styles.listBox}>
                  <div
                    className={styles.listBox1}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                  <div
                    className={styles.listBox2}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                </div>
                <div className={styles.listBox}>
                  <div
                    className={styles.listBox1}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                  <div
                    className={styles.listBox2}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                </div>
                <div className={styles.listBox}>
                  <div
                    className={styles.listBox1}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                  <div
                    className={styles.listBox2}
                    style={{ backgroundColor: listView && "#000" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div className={styles.filters}>
            {isMobile && (
              <select
                name="sorted"
                id=""
                className={styles.sortFilter}
                onChange={handleFilters}
              >
                <option value="">Sort by:</option>
                <option value="Featured">Featured</option>
                <option value="Price:Lowest">Price:Lowest</option>
                <option value="Price:Highest">Price:Highest</option>
                <option value="Name:(A-Z)">Name:(A-Z)</option>
                <option value="Name:(Z-A)">Name:(Z-A)</option>
              </select>
            )}
            <select
              name="brandtype"
              id=""
              className={styles.filterType1}
              onChange={handleFilters}
            >
              <option value="">Headphone type</option>
              <option value="Featured">Featured</option>
              <option value="In-ear headphone">In-ear headphone</option>
              <option value="On-ear headphone">On-ear headphone</option>
              <option value="Over-ear headphone">Over-ear headphone</option>
            </select>
            <select
              name="brandName"
              id=""
              className={`${styles.filterType1} ${styles.arrow1}`}
              onChange={handleFilters}
            >
              <option value="">Company</option>
              <option value="Featured">Featured</option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Boat">Boat</option>
              <option value="Zebronics">Zebronics</option>
              <option value="Marshall">Marshall</option>
              <option value="Ptron">Ptron</option>
            </select>
            <select
              name="brandcolor"
              id=""
              className={`${styles.filterType1} ${styles.arrow2}`}
              onChange={handleFilters}
            >
              <option value="">Colour</option>
              <option value="Featured">Featured</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Green">Green</option>
            </select>
            <select
              name="prodPrice"
              id=""
              className={`${styles.filterType1} ${styles.arrow3}`}
              onChange={handleFilters}
            >
              <option value="">Price</option>
              <option value="Featured">Featured</option>
              <option value="₹0 - ₹1000">₹0 - ₹1000</option>
              <option value="₹1000 - ₹10000">₹1000 - ₹10000</option>
              <option value="₹10000 - ₹20000">₹10000 - ₹20000</option>
            </select>
            {!isMobile && (
              <select
                name="sorted"
                id=""
                className={styles.sortFilter}
                onChange={handleFilters}
              >
                <option value="">Sort by:</option>
                <option value="Featured">Featured</option>
                <option value="Price:Lowest">Price:Lowest</option>
                <option value="Price:Highest">Price:Highest</option>
                <option value="Name:(A-Z)">Name:(A-Z)</option>
                <option value="Name:(Z-A)">Name:(Z-A)</option>
              </select>
            )}
          </div>
        </div>
        <div style={headProds}>
          {!emptyProd && allItems && allItems.length > 0 ? (
            allItems.map((item, index) => {
              return (
                <div style={{ marginLeft: "6vmin" }} key={index}>
                  <Headphone
                    headName={item.name}
                    headImg={item.prodimage}
                    headPrice={item.price}
                    headType={item.type}
                    headClr={item.color}
                    headDesc={item.briefDescription}
                    islistView={listView}
                    headItem={item}
                    setCartMsg={setCartMessage}
                    handleToast={showToast}
                  />
                </div>
              );
            })
          ) : (
            <p className={styles.EmptyProd}>
              !Currently there are no products to show
            </p>
          )}
        </div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#ffd600", color: "#000" }}
        />
        <div style={{ marginBottom: "20vmin" }}></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

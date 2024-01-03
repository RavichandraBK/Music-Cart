// import React, { useState } from "react";
import styles from "./Header.module.css";
import phone from "../../assets/phone-call-light.svg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import { myContext } from "../../Contexts/myContext";
import BedCrums from "../BedCrums/BedCrums";
const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 391 });
  const Navigate = useNavigate();
  const { login, setLogin } = useContext(myContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    setLogin(false);
  };
  return (
    <>
      <div className={styles.header}>
        {isMobile ? (
          <>
            <div className={styles.logo}>
              <BedCrums
                logoHeight={"6vmin"}
                imgWidth={"7.38vmin"}
                imgHeight={"7.38vmin"}
                textSize={"5.99vmin"}
              />
            </div>
          </>
        ) : (
          <>
            <p>
              <img src={phone} alt="" /> &nbsp;&nbsp;912121131313
            </p>
            <p>
              Get 50% off on selected items&nbsp;&nbsp;|&nbsp;&nbsp;Shop Now
            </p>
            {login ? (
              <p onClick={handleLogout}>Logout</p>
            ) : (
              <div className={styles.logedOutTxt}>
                <p onClick={() => Navigate("/Login")}>Login &nbsp;|</p>
                <p onClick={() => Navigate("/Register")}> &nbsp; Signup</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;

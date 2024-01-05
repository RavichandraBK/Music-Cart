import React, { useContext, useState } from "react";
import styles from "./Register.module.css";
import BedCrums from "../../Components/BedCrums/BedCrums";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apis/auth";
import { useMediaQuery } from "react-responsive";
import Header from "../../Components/Header/Header";
import { myContext } from "../../Contexts/myContext";
const Register = () => {
  const [errors, setErrors] = useState("");
  const [userExists, setUserExists] = useState(false);
  const Navigate = useNavigate();
  const { setLogin } = useContext(myContext);
  const [newUser, setNewUser] = useState({
    emailId: "",
    mobilenumber: "",
    password: "",
    username: "",
  });
  const isMobile = useMediaQuery({ maxWidth: 391 });
  const handleRegister = async () => {
    const chkUser = await RegisterUser(newUser);

    if (chkUser && chkUser.data) {
      if (chkUser.data.message === "User already exists, kindly login") {
        setUserExists(true);
      } else if (Object.keys(chkUser.data).includes("errors")) {
        const parsed = {};
        chkUser.data.errors.forEach((curr) => {
          const [invalidError, message] = curr.split(":");
          if (invalidError && message) {
            parsed[invalidError.trim()] = message;
          }
        });
        setErrors(parsed);
      } else {
        localStorage.setItem("Username", chkUser.data.name);
        localStorage.setItem("token", chkUser.data.token);
        setNewUser({
          ...newUser,
          emailId: "",
          password: "",
          mobilenumber: "",
          username: "",
        });
        setLogin(true);
        Navigate("/");
      }
    } else {
      console.log("Something went wrong while registration");
    }
  };
  return (
    <>
      {!isMobile ? (
        <div className={styles.registerLogo}>
          <BedCrums
            logoHeight={"5vmin"}
            imgWidth={"4.58vmin"}
            imgHeight={"4.58vmin"}
            textSize={"2.99vmin"}
          />
        </div>
      ) : (
        <>
          <Header />
          <p className={styles.welComeTxt}>Welcome</p>
        </>
      )}
      <div className={styles.registerOutline}>
        <div className={styles.registerBoxBorder}>
          <div className={styles.registerBox}>
            <p className={styles.createAccText}>
              Create Account {isMobile && <span> Don’t have an account?</span>}
            </p>
            <div className={styles.registerText}>
              <label htmlFor="">Your name</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={(e) => {
                  setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    emailId: "",
                    mobilenumber: "",
                    username: "",
                    password: "",
                  });
                  setUserExists(false);
                }}
              />
            </div>
            {errors.username && (
              <span className={styles.invalid}>{errors.username}</span>
            )}
            <div className={styles.registerText}>
              <label htmlFor="">Mobile number</label>
              <input
                type="text"
                name="mobilenumber"
                maxLength={10}
                value={newUser.mobilenumber}
                onChange={(e) => {
                  setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    emailId: "",
                    mobilenumber: "",
                    username: "",
                    password: "",
                  });
                  setUserExists(false);
                }}
              />
            </div>
            {errors.mobilenumber && (
              <span className={styles.invalid}>{errors.mobilenumber}</span>
            )}
            <div className={styles.registerText}>
              <label htmlFor="">Email Id</label>
              <input
                type="text"
                name="emailId"
                value={newUser.emailId}
                onChange={(e) => {
                  setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    emailId: "",
                    mobilenumber: "",
                    username: "",
                    password: "",
                  });
                  setUserExists(false);
                }}
              />
            </div>
            {errors.emailId && (
              <span className={styles.invalid}>{errors.emailId}</span>
            )}
            <div className={styles.registerText}>
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                value={newUser.password}
                onChange={(e) => {
                  setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    emailId: "",
                    mobilenumber: "",
                    username: "",
                    password: "",
                  });
                  setUserExists(false);
                }}
              />
            </div>
            {errors.password && (
              <div className={styles.invalid}>
                <span>{errors.password}</span>
              </div>
            )}
            <p className={styles.registerDesc}>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </p>
            <button onClick={handleRegister}>Continue</button>
            <p className={styles.registerCond}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
        </div>
      </div>
      {userExists && (
        <span className={styles.invalid}>
          User already exists, kindly login
        </span>
      )}
      <p className={styles.signInText}>
        Already have an account?
        <span onClick={() => Navigate("/Login")}>Sign in</span>
      </p>
      {isMobile ? (
        <Footer />
      ) : (
        <Footer text={"3vmin"} height={"6vmin"} topDist={"94vmin"} />
      )}
    </>
  );
};

export default Register;

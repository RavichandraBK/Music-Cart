import React, { useContext, useState } from "react";
import BedCrums from "../../Components/BedCrums/BedCrums";
import styles from "./Login.module.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useMediaQuery } from "react-responsive";
import { LoginUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Contexts/myContext";
const Login = () => {
  const isMobile = useMediaQuery({maxWidth:391});
  const Navigate = useNavigate();
  const {setLogin} = useContext(myContext);
  const [invalid, setInvalid] = useState(false);
  const [userLogin, setUserLogin] = useState({
    emailId: "",
    password: "",
  });
  const handleLogin = async () => {
    const chkUser = await LoginUser(userLogin);
    if (chkUser && chkUser.data) {
      console.log(chkUser.data)
      if(chkUser.data.message==="User doesnt exists"){
        setInvalid(true);
      }else{

          localStorage.setItem("Username", chkUser.data.name);
          localStorage.setItem("token", chkUser.data.token);
          setUserLogin({ ...userLogin, emailId: "", password: "" });
          setLogin(true);
          Navigate("/");
      }
      }
     else {
      console.log("Something went wrong in Backend");
    }
  };
  return (
    <>
        {isMobile&&(<><Header/>
        <p className={styles.welComeTxt}>Welcome</p>
        </>)}
      {!isMobile&&<div className={styles.loginLogo}>
        <BedCrums
          logoHeight={"6vmin"}
          imgWidth={"5.38vmin"}
          imgHeight={"5.38vmin"}
          textSize={"3.99vmin"}
        />
      </div>}
      <div className={styles.loginOutline}>
        <div className={styles.loginBoxBorder}>
          <div className={styles.loginBox}>
            <p className={styles.signInLogo}>Sign in {isMobile&&<span>Haribol</span>}</p>
            <div className={styles.loginText1}>
              <label htmlFor="">Enter your email or mobile number</label>
              <input
                type="text"
                name="emailId"
                value={userLogin.emailId}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    [e.target.name]: e.target.value,
                  });
                  setInvalid(false);
                }}
              />
            </div>
            <div className={styles.loginText2}>
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id=""
                value={userLogin.password}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    [e.target.name]: e.target.value,
                  });
                  setInvalid(false);
                }}
              />
            </div>
            <button onClick={handleLogin}>Continue</button>
            <p className={styles.loginCond}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
        </div>
      </div>
      {invalid && <div className={styles.invalid}><p >Invalid Credentials</p></div>}
      <div className={styles.loginLine}>
        <div></div>
        <p>New to Musicart?</p>
        <div></div>
      </div>
      <div className={styles.loginNav}>
        <div onClick={() => Navigate("/Register")}>
          <p>Create your Musicart account</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

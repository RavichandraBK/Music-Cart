import "./App.css";
import HomePage from './Pages/HomePage/Home'
import LoginPage from "./Pages/LoginPage/Login";
import RegisterPage from "./Pages/RegisterPage/Register";
import MyCartPage from "./Pages/MyCartPage/MyCart";
import CheckoutPage from "./Pages/CheckOutPage/Checkout";
import DetailsPage from "./Pages/DetailsPage/Details";
import SuccessPage from "./Pages/SuccessPage/Success";
import {Routes,Route} from 'react-router-dom'
import { myContext } from "./Contexts/myContext";
import { useState } from "react";
function App() {
  const [login, setLogin] = useState(!!localStorage.getItem("token"));
  return (
    <div>
      <myContext.Provider value={{login,setLogin}}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterPage/>}/>
        <Route path="/Details" element={<DetailsPage/>}/>
        <Route path="/Mycart" element={<MyCartPage/>}/>
        <Route path="/Checkout" element={<CheckoutPage/>}/>
        <Route path="/Success" element={<SuccessPage/>}/>
      </Routes>
      </myContext.Provider>
    </div>
  );
}

export default App;

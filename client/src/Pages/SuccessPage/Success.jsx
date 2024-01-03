import React from 'react'
import styles from './Success.module.css'
import BedCrums from '../../Components/BedCrums/BedCrums'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import success from '../../assets/successImg.png'
import { useNavigate } from 'react-router-dom'
const Success = () => {
  const Navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className={styles.appLogo}>
        <div>
          <BedCrums />
        </div>
      </div>
      <div className={styles.orderPlaced}>

        <div className={styles.success}>
            <img src={success} alt="" />
            <div>
                <p>Order is placed successfully!</p>
                <p>You  will be receiving a confirmation email with order details</p>
            </div>
            <button onClick={()=>Navigate('/')}>Go back to Home page</button>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Success
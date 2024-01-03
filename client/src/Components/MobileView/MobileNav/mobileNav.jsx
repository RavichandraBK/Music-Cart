import React from 'react'
import styles from './mobileNav.module.css'
import home from '../../../assets/mobileHome.png'
import cart from '../../../assets/cartImage.svg'
import login from '../../../assets/mobileLogin.png'
import logout from '../../../assets/mobileLogout.png'
const mobileNav = () => {
  return (
    <>
    <div className={styles.mobileNav}>
        <div className={styles.home}>
            <div></div>
            <img className={styles.navImg} src={home} alt="" />
            <p></p>
        </div>
        <div className={styles.cart}>
            <div></div>
            <img className={styles.navImg} src={cart} alt="" />
            <p></p>
        </div>
        <div className={styles.login}>
            <div></div>
            <img className={styles.navImg} src={login} alt="" />
            <p></p>
        </div>
    </div>
    </>
  )
}

export default mobileNav
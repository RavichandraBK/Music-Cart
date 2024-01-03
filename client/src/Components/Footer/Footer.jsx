import React from "react";
import styles from "./Footer.module.css";
const Footer = ({ text, height, topDist }) => {
  return (
    <div className={styles.footer} style={{ height: height, top: topDist }}>
      <p style={{ fontSize: text }}>Musicart | All rights reserved</p>
    </div>
  );
};

export default Footer;

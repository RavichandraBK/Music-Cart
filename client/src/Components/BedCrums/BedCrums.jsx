import React from "react";
import musicLogo from "../../assets/webLogo.png";
import styles from "./bedCrums.module.css";
import { useNavigate } from "react-router-dom";
const BedCrums = ({ logoHeight, imgWidth, imgHeight, textSize ,bedCrump=false,bedCrumpNext=''}) => {
  const Navigate = useNavigate();
  return (
    <div className={styles.bedCrums} style={{ height: logoHeight }} onClick={()=>Navigate('/')}>
      <img
        src={musicLogo}
        style={{ width: imgWidth, height: imgHeight }}
        alt=""
      />
      <p className={styles.logoText} style={{ fontSize: textSize }}>
        Musicart
      </p>
      {bedCrump&&<p className={styles.bedCrumsText}>Home/{bedCrumpNext}</p>}
    </div>
  );
};

export default BedCrums;

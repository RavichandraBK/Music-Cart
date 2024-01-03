import React from "react";
import musicLogo from "../../assets/webLogo.png";
import styles from "./bedCrums.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
const BedCrums = ({
  logoHeight,
  imgWidth,
  imgHeight,
  textSize,
  bedCrump,
  bedCrumpNext = "",
}) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className={styles.bedCrums} style={{ height: logoHeight }}>
      <img
        onClick={() => Navigate("/")}
        src={musicLogo}
        style={{ width: imgWidth, height: imgHeight }}
        alt=""
      />
      <p
        className={styles.logoText}
        style={{ fontSize: textSize }}
        onClick={() => Navigate("/")}
      >
        Musicart
      </p>
      {pathnames.length > 0 && (
        <div className={styles.bedCrumsText}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {pathnames.map((name, index) => {
              return (
                <li key={index}>
                  <span>/</span>
                  <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BedCrums;

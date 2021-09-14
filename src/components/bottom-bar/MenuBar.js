import React from "react";
import MenuItem from "./MenuItem";
import EventsLogo from "./Icons/Events";
import FeaturedLogo from "./Icons/Featured";
import Search from "./Icons/Search";
import Slider from "./Icons/Slider";
import {
  CircleEdit24Regular,
  Alert28Regular,
  Bookmark28Regular,
  Star28Regular,
  Heart28Regular,
} from "@fluentui/react-icons";

import styles from "./MenuBar.module.scss";
import { Link } from "react-router-dom";

function MenuBar(props) {
  const { active, setActive } = props;

  return (
    <div className={styles.menuBar} id={"menu-bar-horizontal"}>
      <Link to="/recommendations">
        <MenuItem
          value={"Recommendations"}
          className={styles.item}
          logo={
            <Star28Regular
              width={10}
              height={10}
              fill={active === "Recommendations" ? "#3CAFEB" : "#9292B0"}
              primaryFill={active === "Recommendations" ? "#FFFFFF" : "#3CAFEB"}
              className={styles.icon}
            />
          }
          text={""}
          isActive={active === "Recommendations"}
          setActive={setActive}
          color={"#FFFFFF"}
          backgroundColor={"rgba(60, 175, 235, 1)"}
        />
      </Link>

      <Link to="/wishlist">
        <MenuItem
          value={"Wishlist"}
          className={styles.item}
          logo={
            <Heart28Regular
              width={10}
              height={10}
              fill={active === "Wishlist" ? "#3CAFEB" : "#9292B0"}
              primaryFill={active === "Wishlist" ? "#FFFFFF" : "#3CAFEB"}
              className={styles.icon}
            />
          }
          text={""}
          isActive={active === "Wishlist"}
          setActive={setActive}
          color={"#FFFFFF"}
          backgroundColor={"rgba(60, 175, 235, 1)"}
        />
      </Link>
      <Link to="/saved">
        <MenuItem
          value={"Saved"}
          className={styles.item}
          logo={
            <Bookmark28Regular
              width={10}
              height={10}
              fill={active === "Saved" ? "#3CAFEB" : "#9292B0"}
              primaryFill={active === "Saved" ? "#FFFFFF" : "#3CAFEB"}
              className={styles.icon}
            />
          }
          text={""}
          isActive={active === "Saved"}
          setActive={setActive}
          color={"#FFFFFF"}
          backgroundColor={"rgba(60, 175, 235, 1)"}
        />
      </Link>
      <Link to="/notifications">
        <MenuItem
          value={"Notifications"}
          className={styles.item}
          logo={
            <Alert28Regular
              width={10}
              height={10}
              fill={active === "Notifications" ? "#3CAFEB" : "#9292B0"}
              //className={"iconClass"}
              primaryFill={active === "Notifications" ? "#FFFFFF" : "#3CAFEB"}
              className={styles.icon}
            />
          }
          text={""}
          isActive={active === "Notifications"}
          setActive={setActive}
          color={"#FFFFFF"}
          backgroundColor={"rgba(60, 175, 235, 1)"}
        />
      </Link>
      <Link to="/recommendations/preferences/2">
        <MenuItem
          value={"Preferences"}
          className={styles.item}
          logo={
            <CircleEdit24Regular
              width={10}
              height={10}
              fill={active === "Preferences" ? "#3CAFEB" : "#9292B0"}
              primaryFill={active === "Preferences" ? "#FFFFFF" : "#3CAFEB"}
              className={styles.icon}
            />
          }
          text={""}
          isActive={active === "Preferences"}
          setActive={setActive}
          color={"#FFFFFF"}
          backgroundColor={"rgba(60, 175, 235, 1)"}
        />
      </Link>
    </div>
  );
}

export default MenuBar;

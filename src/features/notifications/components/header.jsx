import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./header.module.scss";
import { MdSettings } from "react-icons/md";
import { CircleEdit24Regular } from "@fluentui/react-icons";
import { ReactComponent as PulfyIcon } from "assets/pold.svg";
import { groupByMonths } from "../../../utils/date";
import useThemeState, {
  DARK_CLASS,
  LIGHT_CLASS,
  NO_PREF_CLASS,
} from "utils/hooks/use-theme-state";

import {useSelector} from "react-redux"

import { Capacitor } from "@capacitor/core";

import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Weekend Getaway",
  "June 4-5",
];

<svg width="0" height="0">
  <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#7a6ded" offset="0%" />
    <stop stopColor="#591885" offset="100%" />
  </linearGradient>
</svg>;

const Header = ({ availableDates, onSelect, activeDateIndex,headerName }) => {

 

  

  const availabilities   = useSelector(state => state.preferences.availabilities.availabilities)
  const selectedAvailability = useSelector(state =>  state.preferences.availabilities.selectedAvailability)

  const [appTheme] = useThemeState();
  const { months: availableMonths, dates } = useMemo(
    () => groupByMonths(availableDates),
    [availableDates]
  );
  const [activeMonth, setActiveMonth] = useState(dates[activeDateIndex].month);
  const handleActiveMonth = (e) => {
    const name = e.target.name;
    setActiveMonth(name);
  };

  const handleActiveWeek = (index) => () => {
    onSelect(index);
  };

  return (<>
  {console.log("header availabilities: ",availabilities)}
    <div
      className={
        Capacitor.getPlatform() === "ios"
          ? styles.navbarFixedIos
          : styles.navbarFixed
      }
    >
      <div className={styles.container}>
      
        
      <div className={styles.logo1}>
          <div className={styles.logoIcon1}>
            <img
              style={{ width: "100px" }}
              alt=""
            />
          </div>
          
        </div>
        
        <div className={styles.actions}>
        
          <div className={styles.calendarAndDate}>
        <Link
          to="/recommendations/preferences/1"
          className={styles.logoTextHolder}
        >
         
          

         
        </Link>
         
          <div className={styles.currentDates}> 
          
          {headerName}


          </div>
         
          
          </div>
          
          

         
        </div>
        
       
        
      </div>
    </div>
    </>
  );
 
};

Header.propTypes = {
  availableDates: PropTypes.array,
  activeDateIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Header;

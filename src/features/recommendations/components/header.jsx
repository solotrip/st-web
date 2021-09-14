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

import {useSelector,useDispatch} from "react-redux"
import { addToSaved,removeFromSaved  } from "../../saved/slice"

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

const Header = ({ availableDates, onSelect, activeDateIndex, recommendations,isSaved }) => {

  const [index, setIndex] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

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

  const handleSave = () => {


    const newSavedItem = { 
      "id": 1,
      "name": "Weekend Getaway",
 "dateString": "April 3 - April 5",
 recommendations: recommendations
    }
    

    if (isSaved) {
      dispatch(removeFromSaved(newSavedItem))

    } else {
      dispatch(addToSaved(newSavedItem))


    }
console.log('handle save pressed!')
  

  }

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
         
          <div
            className={styles.calendarEdit}
           
          />

         
        </Link>
          <Link  className={styles.currentDates}to="/recommendations/preferences/1">
          
          
          <TextTransition
        text={selectedAvailability !== null ?   selectedAvailability.value[index % selectedAvailability.value.length] :availabilities[0].value[index % availabilities[0].value.length] }
        springConfig={ presets.wobbly } inline={true} 
      />


          
         {/* <div className={styles.currentDates}> { selectedAvailability !== null ?  selectedAvailability.label : availabilities[0].label}</div>*/}
          </Link>
          </div>
          <div className={styles.filterSave}>
          <Link className={styles.interestIconButton} to="/notifications">
          <div
            className={styles.filterEdit}
            
          />
         
        </Link>
        <button
          className={styles.interestIconButton2}
          onClick={handleSave}
        >
          <div
            className={styles.savedEdit}
           
          />
      
        </button>
        </div>
          

          {/*<div className={styles.monthSelector}>
            {availableMonths.map((month) => (
              <button
                name={month}
                key={month}
                onClick={handleActiveMonth}
                className={cn(styles.month, {
                  [styles.activeMonth]: activeMonth === month,
                })}
              >
                {month}
              </button>
            ))}
          </div>
          <div className={styles.weekSelector}>
            {dates
              .filter((d) => d.month === activeMonth)
              .map((d) => (
                <button
                  className={cn(styles.week, {
                    [styles.activeWeek]: activeDateIndex === d.index,
                  })}
                  onClick={handleActiveWeek(d.index)}
                  key={d.index}
                >
                  {d.startDay}
                  {d.duration > 1 && ` - ${d.endDay}`}
                </button>
              ))}
                </div>*/}
        </div>
        <Link
          className={cn(styles.interestButton, "glow-on-hover")}
          to="/recommendations/preferences/2"
        >
          Preferences
        </Link>
       
        
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

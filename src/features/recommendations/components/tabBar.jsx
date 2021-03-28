import React, { useState } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import styles from "./tabBar.module.scss";

const TabBar = ({ availableMonths }) => {
  const [activeButton, setActiveButton] = useState(
    availableMonths[0].monthName
  );

  const [activeButtonWeeks, setActiveButtonWeeks] = useState(
    availableMonths[0].weeks
  );

  const [activeWeek, setActiveWeek] = useState(activeButtonWeeks[0]);

  const handleActiveButton = (e) => {
    const name = e.target.name;
    setActiveButton(name);
    var weeks = [];
    const weekString = e.target.value;
    var weekSplitted = weekString.split(",");
    //weeks.push(e.target.value);
    console.log("weeks are", weekSplitted);
    weeks = weeks.concat(weekSplitted);
    setActiveButtonWeeks(weeks);
  };

  const handleActiveWeek = (e) => {
    const week = e.target.name;
    setActiveWeek(week);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBarContent}>
        <div className={styles.monthSelector}>
          {availableMonths.map((month) => (
            <button
              name={month.monthName}
              key={month.monthName}
              value={month.weeks}
              onClick={handleActiveButton}
              className={
                activeButton === month.monthName
                  ? styles.activeMonth
                  : styles.month
              }
            >
              {month.monthName}
            </button>
          ))}
        </div>
        <div className={styles.weekSelector}>
          {activeButtonWeeks.map((week) => (
            <button
              name={week}
              className={activeWeek === week ? styles.activeWeek : styles.week}
              onClick={handleActiveWeek}
              key={week}
            >
              {week}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabBar;

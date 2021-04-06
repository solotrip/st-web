import React, { useState, useEffect } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import styles from "./tabBar.module.scss";

const TabBar = ({ availableMonths }) => {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match

    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const [windowSize, setWindowSize] = useState({
      width: undefined,

      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize

      function handleResize() {
        // Set window width/height to state

        setWindowSize({
          width: window.innerWidth,

          height: window.innerHeight,
        });
      }

      // Add event listener

      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size

      handleResize();

      // Remove event listener on cleanup

      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }
  const size = useWindowSize();
  const screenThreshold = 700;
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
    <>
      <div className={styles.wrapper}>
        {console.log("tab bar width: ", size.width)}

        <div className={styles.tabBarContentHolder}>
          <button
            to="/"
            className={
              size.width < screenThreshold ? styles.logo : styles.logoVertical
            }
          >
            <div className={styles.icon} />
          </button>
          <div
            className={
              size.width < screenThreshold
                ? styles.tabBarContent
                : styles.tabBarContentDesktop
            }
          >
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
                  className={
                    activeWeek === week ? styles.activeWeek : styles.week
                  }
                  onClick={handleActiveWeek}
                  key={week}
                >
                  {week}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          size.width < screenThreshold
            ? styles.pageTitleCentered
            : styles.pageTitleNotCentered
        }
      >
        <div className={styles.recommendationsTitle}>Good morning, Faruk.</div>
      </div>
    </>
  );
};

export default TabBar;

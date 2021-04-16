import React, { useState, useEffect } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import styles from "./tabBar.module.scss";

import { MenuButton } from "components";
const TabBar = () => {
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

  return (
    <>
      <div className={styles.wrapper}>
        {console.log("tab bar width: ", size.width)}

        <div className={styles.tabBarContentHolder}>
          <div className={styles.recommendationsTitle}>
            Good evening, Faruk.
          </div>
        </div>
      </div>
    </>
  );
};

export default TabBar;

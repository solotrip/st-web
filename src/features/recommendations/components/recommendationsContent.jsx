import React, { useEffect, useState } from "react";
import styles from "./recommendationsContent.module.scss";
import Recommendation from "./elements/recommendation";
import cn from "classnames";

const RecommendationsContent = ({
  recommendations,
  isOnboarding,
  handleOpenSheet,
}) => {
  let recommmendationList;

  const [onboarding, setOnboarding] = useState(isOnboarding);

  if (!onboarding) {
    recommmendationList = recommendations;
  } else if (onboarding) {
    recommmendationList = recommendations.slice(0, 3);
  }
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
  let user = { name: "Yerli Faruk", country: "PW" };
  let stories = [
    {
      url:
        "https://ik.imagekit.io/stmedia/tr:h-800,w-640,fo-auto/Boston-US-a506bdbb-41d2-4d48-b2e4-2180706cbcfa",
    },
  ];

  return (
    <div
      className={
        !onboarding ? styles.outerWrapperCentered : styles.outerWrapper
      }
    >
      {size.width > screenThreshold && (
        <div>
          <div className={styles.title}>
            {onboarding ? "This Month" : "Recommendations"}{" "}
          </div>
        </div>
      )}
      <div
        className={
          size.width < screenThreshold ? styles.wrapperCentered : styles.wrapper
        }
      >
        {recommmendationList.map((recommendation) => {
          return (
            <Recommendation
              recommendation={recommendation}
              user={user}
              size={size}
            />
          );
        })}
      </div>
      {onboarding && (
        <div className={styles.wantMore}>
          <div className={styles.wantMoreText}>Want more?</div>
          <div className={styles.wantMoreButton}>
            <button
              className={cn(styles.signup2, "glow-on-hover")}
              onClick={handleOpenSheet}
              style={{
                width: "230px",
                height: "50px",
                fontSize: "20px",
              }}
              name="Interests"
            >
              <span role="img" aria-label="Preferences"></span>
              Set your Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsContent;

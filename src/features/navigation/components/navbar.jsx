import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./navbar.module.scss";
import { MenuButton } from "components";
import ThemeSwitch from "./theme-switch";
import Sheet from "react-modal-sheet";
import {
  FiX as CloseIcon,
  FiCheck as ApplyIcon,
  FiChevronRight as NextIcon,
  FiChevronLeft as BackIcon,
} from "react-icons/fi";
import InterestsContainer from "../../recommendations/containers/interests/interests";
import CalendarContainer from "../../recommendations/containers/calendar/calendar";
import SignupContainer from "../../auth/containers/signup";
import LoginContainer from "../../auth/containers/login";
import InterestsMock from "../../recommendations/interests.json";
import FiltersMock from "../../recommendations/filters.json";
import CalendarAlt from "../../recommendations/containers/calendar/calendarAlt";

const Navbar = ({
  isLoggedIn,
  loading,
  children,
  items,
  availableMonths,
  onboarding,
}) => {
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

  const menuItems = [<ThemeSwitch key="nav-theme-switch" />];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [openTab, setOpenTab] = useState("");

  const [interestListDefault, setInterestListDefault] = useState();
  const [interestList, setInterestList] = useState();

  function handleNextSheetTab(direction) {
    const tabs = ["Interests", "Calendar", "Bucketlist"];
    const index = tabs.findIndex((tab) => tab === openTab);
    console.log(
      "next pressed and current tab is:",
      openTab,
      "will changed to: ",
      tabs[index + 1]
    );
    if (direction === "next") {
      setOpenTab(tabs[index + 1]);
    } else if (direction === "previous") {
      setOpenTab(tabs[index - 1]);
    }
  }

  const fetchData = async () => {
    return await fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setInterestList(data);
        setInterestListDefault(data);
      });
  };

  useEffect(() => {
    if (onboarding) {
      setSheetOpen(true);
      setOpenTab("Interests");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenSheet = (e) => {
    const tabToOpen = e.target.name;
    setSheetOpen(true);
    setOpenTab(tabToOpen);
  };
  return (
    <div
      className={
        size.width < screenThreshold ? styles.navbar : styles.navbarVertical
      }
    >
      {
        <div>
          {size.width < screenThreshold ? (
            <div
              className={
                size.width < screenThreshold
                  ? styles.container
                  : styles.containerVertical
              }
            >
              <div
                className={
                  size.width < screenThreshold
                    ? styles.row1
                    : styles.row1Vertical
                }
              >
                <Link
                  to="/recommendations"
                  className={
                    size.width < screenThreshold
                      ? styles.logo
                      : styles.logoVertical2
                  }
                >
                  <div className={styles.icon} />
                </Link>
                <div
                  className={
                    size.width < screenThreshold
                      ? styles.actions
                      : styles.actionsVertical
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
                <button
                  className={cn(styles.signup2, "glow-on-hover")}
                  onClick={handleOpenSheet}
                  name="Interests"
                >
                  <span role="img" aria-label="Preferences"></span>
                  Preferences
                </button>
              </div>
              {console.log("widht is: ", size.width)}
              {children && <div className={styles.content}>{children}</div>}
            </div>
          ) : (
            <div className={styles.containerVertical}>
              <div className={styles.row2Vertical}>
                {size.width >= screenThreshold && (
                  <Link
                    to="/recommendations"
                    className={
                      size.width < screenThreshold
                        ? styles.logo
                        : styles.logoVertical2
                    }
                  >
                    <div className={styles.icon} />
                  </Link>
                )}
                {items.map((item) => (
                  <button
                    className={styles.col1Vertical}
                    onClick={handleOpenSheet}
                    name={item.name}
                  >
                    <button
                      className={styles.colImage}
                      style={{
                        backgroundImage: "url(" + item.image + ")",
                      }}
                      name={item.name}
                    />
                    <button className={styles.colText} name={item.name}>
                      {item.name}
                    </button>
                  </button>
                ))}
                <div className={styles.menuButtonHolderVertical2}>
                  <MenuButton items={menuItems} />
                </div>
              </div>
            </div>
          )}
        </div>
      }
      <Sheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        springConfig={{
          stiffness: 300,
          damping: 20,
          mass: 0.2,
        }}
      >
        <Sheet.Container>
          <Sheet.Header className={styles.sheetHeader} />
          <div className={styles.sheetrow1}>
            {!onboarding ||
              (onboarding && openTab == "Interests" && (
                <button
                  className={styles.closeSheet}
                  onClick={() => setSheetOpen(false)}
                >
                  <CloseIcon className={styles.closeIcon} />
                </button>
              ))}

            {onboarding && openTab !== "Interests" && (
              <button
                className={styles.closeSheet}
                onClick={() => handleNextSheetTab("previous")}
              >
                <BackIcon className={styles.closeIcon} />
              </button>
            )}

            <div className={styles.sheetTabs}>
              <button
                className={openTab == "Interests" && styles.activeSheetTab}
                name="Interests"
                onClick={() => setOpenTab("Interests")}
              >
                Interests
              </button>
              <button
                className={openTab == "Calendar" && styles.activeSheetTab}
                name="Calendar"
                onClick={() => setOpenTab("Calendar")}
              >
                Dates
              </button>
              <button
                name="Bucketlist"
                className={openTab == "Bucketlist" && styles.activeSheetTab}
                onClick={() => setOpenTab("Bucketlist")}
              >
                Bucketlist
              </button>
            </div>

            {!onboarding ||
              (onboarding && openTab == "Bucketlist" && (
                <button
                  className={styles.closeSheet}
                  onClick={() => setSheetOpen(false)}
                >
                  <ApplyIcon className={styles.closeIcon} />
                </button>
              ))}
            {onboarding && openTab !== "Bucketlist" && (
              <button
                className={styles.closeSheet}
                onClick={() => handleNextSheetTab("next")}
              >
                <NextIcon className={styles.closeIcon} />
              </button>
            )}
          </div>

          <Sheet.Content disableDrag={true}>
            {onboarding && openTab == "Interests" && (
              <div className={styles.onboardingText}>
                Welcome to Pulfy!
                <div>
                  To know you better, select the ones that interest you and
                  click next.
                </div>
              </div>
            )}
            {onboarding && openTab == "Calendar" && (
              <div className={styles.onboardingText}>
                <div>Select your available dates and click next.</div>
              </div>
            )}
            {onboarding && openTab == "Bucketlist" && (
              <div className={styles.onboardingText}>
                <div>
                  Select cities or countries on your Bucketlist and click check.
                </div>
              </div>
            )}

            <div className={styles.sheetTitle}></div>
            <div className={styles.sheet}>
              {openTab == "Interests" && (
                <InterestsContainer
                  data={InterestsMock}
                  placeHolder={"Search interests or topics"}
                />
              )}

              {openTab == "Bucketlist" && (
                <InterestsContainer
                  data={interestList}
                  placeHolder={"Search destinations"}
                />
              )}

              {openTab == "Filters" && (
                <InterestsContainer
                  data={FiltersMock}
                  placeHolder={"Search filters"}
                />
              )}

              {openTab == "Calendar" && <CalendarAlt />}
              {openTab == "Signup" && <SignupContainer />}
              {openTab == "Login" && <LoginContainer />}

              {/* Your sheet content goes here */}
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

Navbar.defaultProps = {};

export default Navbar;

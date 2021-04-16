import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./navbar.module.scss";
import { MenuButton } from "components";
import ThemeSwitch from "./theme-switch";
import Sheet from "react-modal-sheet";
import { FiX as CloseIcon, FiCheck as ApplyIcon } from "react-icons/fi";
import InterestsContainer from "../../recommendations/containers/interests/interests";
import CalendarContainer from "../../recommendations/containers/calendar/calendar";
import SignupContainer from "../../auth/containers/signup";
import LoginContainer from "../../auth/containers/login";
import InterestsMock from "../../recommendations/interests.json";
import FiltersMock from "../../recommendations/filters.json";
import CalendarAlt from "../../recommendations/containers/calendar/calendarAlt";

const Navbar = ({ isLoggedIn, loading, children, items }) => {
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

  const menuItems = [<ThemeSwitch key="nav-theme-switch" />];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [openTab, setOpenTab] = useState("");

  const [interestListDefault, setInterestListDefault] = useState();
  const [interestList, setInterestList] = useState();

  const fetchData = async () => {
    return await fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setInterestList(data);
        setInterestListDefault(data);
      });
  };

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
          {!isLoggedIn ? (
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
                  to="/"
                  className={
                    size.width < screenThreshold
                      ? styles.logo
                      : styles.logoVertical
                  }
                >
                  <div className={styles.icon} />
                </Link>
                {size.width < screenThreshold && (
                  <div className={styles.attentionText}>
                    Join to save your interests and access your recommendations
                    from anywhere.
                  </div>
                )}
                <div
                  className={
                    size.width < screenThreshold
                      ? styles.menuButtonHolder
                      : styles.menuButtonHolderVertical
                  }
                >
                  <MenuButton items={menuItems} />
                </div>
              </div>
              {console.log("widht is: ", size.width)}
              {children && <div className={styles.content}>{children}</div>}
              <div
                className={
                  size.width < screenThreshold
                    ? styles.actions
                    : styles.actionsVertical
                }
              >
                {!isLoggedIn && !loading && (
                  <div
                    className={
                      size.width < screenThreshold
                        ? styles.signupLogin
                        : styles.signupLoginVertical
                    }
                  >
                    <button
                      className={cn(styles.signup2, "glow-on-hover")}
                      onClick={handleOpenSheet}
                      name="Signup"
                    >
                      <span role="img" aria-label="Signup"></span>
                      Signup
                    </button>
                  </div>
                )}
                {!isLoggedIn && !loading && (
                  <div
                    className={
                      size.width < screenThreshold
                        ? styles.signupLogin
                        : styles.signupLoginVertical
                    }
                  >
                    <button
                      className={cn(styles.signup, "glow-on-hover")}
                      onClick={handleOpenSheet}
                      name="Login"
                    >
                      <span role="img" aria-label="Login"></span>
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
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
                    ? styles.row2
                    : styles.row2Vertical
                }
              >
                {size.width >= screenThreshold && (
                  <Link
                    to="/"
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
                    className={
                      size.width < screenThreshold
                        ? styles.col1
                        : styles.col1Vertical
                    }
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
                <div
                  className={
                    size.width < screenThreshold
                      ? styles.menuButtonHolder2
                      : styles.menuButtonHolderVertical2
                  }
                >
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

          <Sheet.Content disableDrag={true}>
            <div className={styles.sheet}>
              <div className={styles.sheetrow1}>
                <button
                  className={styles.closeSheet}
                  onClick={() => setSheetOpen(false)}
                >
                  <CloseIcon className={styles.closeIcon} />
                </button>
                <div className={styles.sheetTitle}>{openTab}</div>

                <button
                  className={styles.closeSheet}
                  onClick={() => setSheetOpen(false)}
                >
                  <ApplyIcon className={styles.closeIcon} />
                </button>
              </div>
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

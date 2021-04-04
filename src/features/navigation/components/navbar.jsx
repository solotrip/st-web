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
import InterestsMock from "../../recommendations/interests.json";
import FiltersMock from "../../recommendations/filters.json";
import CalendarAlt from "../../recommendations/containers/calendar/calendarAlt";

const Navbar = ({ isLoggedIn, loading, children, items }) => {
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
    <div className={styles.navbar}>
      {!isLoggedIn ? (
        <div className={styles.container}>
          <div className={styles.row1}>
            <Link to="/" className={styles.logo}>
              <div className={styles.icon} />
            </Link>
            <div className={styles.attentionText}>
              Join to save your interests and access your recommendations from
              anywhere.
            </div>
            <div className={styles.menuButtonHolder}>
              <MenuButton items={menuItems} />
            </div>
          </div>

          {children && <div className={styles.content}>{children}</div>}
          <div className={styles.actions}>
            {!isLoggedIn && !loading && (
              <div className={styles.signupLogin}>
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
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.row2}>
            {items.map((item) => (
              <button
                className={styles.col1}
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
            <div className={styles.menuButtonHolder2}>
              <MenuButton items={menuItems} />
            </div>
          </div>
        </div>
      )}
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

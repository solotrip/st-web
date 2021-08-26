import React, { useState } from "react";
import styles from "./dates.module.scss";
import { Link } from "react-router-dom";
import Availability from "../../components/availability";
import NewDate from "../../components/newdate";
import Date from "../../components/date";

let availabilities = [
  {
    id: 1,
    title: "Summer Vacation",
    dates: "March 30 - August 29",
    selected: true,
  },
  { id: 2, title: "My Weekend Getaway", dates: "June 4 - 5", selected: false },
  { id: 3, title: "Winterfell", dates: "January 1 - 15", selected: false },
];

const DatesContainer = () => {
  //availabilities, newDate
  const [activeView, setActiveView] = useState("availabilities");
  return (
    <div className={styles.wrapper}>
      {activeView === "availabilities" ? (
        availabilities.map((availability) => <Date data={availability} />)
      ) : (
        <NewDate />
      )}
      {activeView === "availabilities" && (
        <div className={styles.dateAdder}>
          <Link>
            <button
              className={styles.actionButton}
              onClick={() => {
                setActiveView("newDate");
              }}
            >
              Add New Date
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DatesContainer;

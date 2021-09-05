import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
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

<svg width="0" height="0">
  <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#7a6ded" offset="0%" />
    <stop stopColor="#591885" offset="100%" />
  </linearGradient>
</svg>;

const Header = ({ availableDates, onSelect, activeDateIndex }) => {
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

  return (
    <div className={styles.navbarFixed}>
      <div className={styles.container}>
        <Link to="/recommendations" className={styles.logoTextHolder}>
          {/*<PulfyIcon className={styles.pulfyIconBar} />*/}
          <img
            className={styles.calendarEdit}
            src={
              appTheme == "light"
                ? "https://ik.imagekit.io/7zlqc1cmihe/goback_b9jA88tXl.svg?updatedAt=1629375128527"
                : "https://ik.imagekit.io/7zlqc1cmihe/lightgoback_ltxjEwdDjz.svg?updatedAt=1629375128470"
            }
            alt=""
          />

          {/*<span className={styles.pulfyBar}>pulfy</span>*/}
        </Link>
        <div className={styles.actions}>
          <div className={styles.currentDates}>Notifications</div>

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

        <Link
          className={styles.interestIconButton}
          to="/recommendations/preferences/2"
        >
          <img
            className={styles.circleEdit}
            src={
              appTheme == "light"
                ? "https://ik.imagekit.io/7zlqc1cmihe/circleedit_9_q8p7yt7b.svg?updatedAt=1629286595546"
                : "https://ik.imagekit.io/7zlqc1cmihe/lightcircleedit_xMRSIRFl5.svg?updatedAt=1629315661340"
            }
            alt=""
          />
          {/*<CircleEdit24Regular style={{ stroke: "url(#blue-gradient)" }} />*/}
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  availableDates: PropTypes.array,
  activeDateIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Header;

import React from "react";
import styles from "./date.module.scss";
import Checkbox from "./../../../../components/input/checkbox";

const Date = ({ data, handler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.checkbox}>
        <Checkbox styles={{ width: "50px", height: "50px" }} />
      </div>
      <button className={styles.dateContent} onClick={handler}>
        {" "}
        <div className={styles.dateTitle}>{data.title} </div>
        <div className={styles.dateInfo}>{data.dates}</div>
      </button>
      <div className={styles.editLabel}></div>
    </div>
  );
};

export default Date;

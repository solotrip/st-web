import React from "react";
import styles from "./interestlist.module.scss";
import Interest from "./elements/interest";

const InterestList = ({ interestList = [] }) => {
  return (
    <div className={styles.wrapper}>
      {interestList.map((data, index) => {
        if (data) {
          return <Interest data={data} />;
        }
        return null;
      })}
    </div>
  );
};

export default InterestList;

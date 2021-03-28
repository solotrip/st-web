import React from "react";
import { useParams } from "react-router-dom";
import recommendations from "../recommendations.json";

import styles from "./recommendations.module.scss";
import TabBar from "../components/tabBar";
import RecommendationsContent from "../components/recommendationsContent";
const RecommendationsContainer = () => {
  const availableMonths = [
    {
      monthName: "Aug",
      weeks: ["Whole Month", "1-7", "8-14", "15-21", "22-28"],
    },
    {
      monthName: "Sep",
      weeks: ["Whole Month", "29-4", "5-11", "12-18", "19-25", "25-1"],
    },
    {
      monthName: "Oct",
      weeks: ["Whole Month", "2-8", "9-15", "16-22", "23-29"],
    },
  ];

  return (
    <>
      <div className={styles.wrapper}>
        <TabBar availableMonths={availableMonths} className={styles.TabBar} />
        <RecommendationsContent
          recommendations={recommendations}
          className={styles.RecommendationsContent}
        />
      </div>
    </>
  );
};

export default RecommendationsContainer;

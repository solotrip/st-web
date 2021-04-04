import React from "react";
import { useParams } from "react-router-dom";
import recommendations from "../../recommendations.json";

import styles from "./recommendations.module.scss";
import TabBar from "../../components/tabBar";

import RecommendationsContent from "../../components/recommendationsContent";
import Navbar from "features/navigation/components/navbar";

const RecommendationsContainer = () => {
  const items = [
    {
      name: "Interests",
      image:
        "https://ik.imagekit.io/7zlqc1cmihe/bike_pa8Uy_lAO.jpeg?tr=w-60,h-60,fo-auto",
    },
    {
      name: "Calendar",
      image:
        "https://ik.imagekit.io/7zlqc1cmihe/calendar_mXdOO48qc.jpeg?tr=w-60,h-60,fo-auto",
    },
    {
      name: "Bucketlist",
      image:
        "https://ik.imagekit.io/7zlqc1cmihe/kazuend-2KXEb_8G5vo-unsplash_mi7JiHk_U.jpg?tr=w-60,h-60,fo-auto",
    },
    {
      name: "Filters",
      image:
        "https://ik.imagekit.io/7zlqc1cmihe/filter_KqnopME50Wmx.jpeg?tr=w-60,h-60,fo-auto",
    },
  ];

  const availableMonths = [
    {
      monthName: "Aug",
      weeks: ["1-7", "8-14", "15-21", "22-28"],
    },
    {
      monthName: "Sep",
      weeks: ["29-4", "5-11", "12-18", "19-25", "25-1"],
    },
    {
      monthName: "Oct",
      weeks: ["2-8", "9-15", "16-22", "23-29"],
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
        <Navbar isLoggedIn={true} items={items} />
      </div>
    </>
  );
};

export default RecommendationsContainer;

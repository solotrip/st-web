import React, { useState } from "react";
import recommendations from "../../recommendations.json";

import styles from "./recommendations.module.scss";

import Navbar from "features/navigation/components/navbar";

const onboardingDefault = true;

const RecommendationsContainer = () => {
  const [onboarding, setOnboarding] = useState(onboardingDefault);

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
      weeks: ["29-4", "5-11", "12-18", "19-25"],
    },
    {
      monthName: "Oct",
      weeks: ["2-8", "9-15", "16-22", "23-29"],
    },
  ];

  return (
    <>
      <div className={styles.wrapperx}>
        {/* <RecommendationsContent
          recommendations={recommendations}
          className={styles.RecommendationsContentx}
          isOnboarding={onboarding}
        />
       */}

        <Navbar
          isLoggedIn={false}
          items={items}
          availableMonths={availableMonths}
          isOnboarding={onboarding}
          recommendations={recommendations}
        />
      </div>
    </>
  );
};

export default RecommendationsContainer;

import React from "react";
import styles from "./recommendationsContent.module.scss";
import Recommendation from "./elements/recommendation";

const RecommendationsContent = ({ recommendations }) => {
  let user = { name: "Yerli Faruk", country: "PW" };
  let stories = [
    {
      url:
        "https://ik.imagekit.io/stmedia/tr:h-800,w-640,fo-auto/Boston-US-a506bdbb-41d2-4d48-b2e4-2180706cbcfa",
    },
  ];
  return (
    <div className={styles.wrapper}>
      {recommendations.map((recommendation) => {
        return <Recommendation recommendation={recommendation} user={user} />;
      })}
    </div>
  );
};

export default RecommendationsContent;

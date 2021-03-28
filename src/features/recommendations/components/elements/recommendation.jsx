import React, { useState } from "react";
import styles from "./recommendation.module.scss";
import ProgressBar from "./ProgressBar";
import CloudIcon from "../../../../assets/images/cloud.png";
//import Stories from "react-insta-stories";

let firstProgress = 0.2;
let secondProgress = 0.4;
let thirdProgress = 0.6;
let forthProgress = 0.8;
let fifthProgress = 1.0;

const inactiveTabImages = [
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-overview_j66PG19F7ujCa.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-cloud_D7-pl5BTXM.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-events_zmbNvePjr7.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-accomodation_0B-H1EFiux.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-flights_1v6KjXggfG.png)",
];

const activeTabImages = [
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-overview-blue_bBnWBO8YjA47R.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-cloud-blue_wnRWP0O6ql7ur.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-events-blue_HZI3DqcjN.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-accomodation-blue_I5cv42xjprH2B.png)",
  "url(https://ik.imagekit.io/7zlqc1cmihe/hi/hi-flights-blue_B5W9fmzAk1OLF.png)",
];

const Recommendation = ({ recommendation, stories, user }) => {
  const [progressPercent, setProgressPercent] = useState(firstProgress);

  const [firstTabImage, setFirstTabImage] = useState(activeTabImages[0]);
  const [secondTabImage, setSecondTabImage] = useState(inactiveTabImages[1]);
  const [thirdTabImage, setThirdTabImage] = useState(inactiveTabImages[2]);
  const [forthTabImage, setForthTabImage] = useState(inactiveTabImages[3]);
  const [fifthTabImage, setFifthTabImage] = useState(inactiveTabImages[4]);

  let firstEvent = "";
  let combinedEvents;
  const eventsCombined = recommendation.events.forEach((event) => {
    console.log("title is: ", event.title);
    const categoryAndTitle = event.category + ": " + event.title;
    combinedEvents = firstEvent.concat(categoryAndTitle, ", ");
    console.log("combined events are : ", combinedEvents);
    firstEvent = combinedEvents;

    return combinedEvents;
  });

  let firstActivity = "";
  let combinedActivities;

  var cheaperThanYearlyAverage =
    parseFloat(recommendation.hotel_price) <
    parseFloat(recommendation.overall_avg_hotel_price)
      ? "cheaper than yearly average.)"
      : "more expensive than yearly average.)";

  const activitiesCombined = recommendation.activities.forEach((activity) => {
    console.log("title is: ", activity);
    combinedActivities = firstActivity.concat(activity, ", ");
    console.log("combined events are : ", combinedActivities);
    firstActivity = combinedActivities;

    return combinedActivities;
  });

  console.log(
    "hotel price is :",
    parseFloat(recommendation.hotel_price),
    parseFloat(recommendation.overall_avg_hotel_price),
    parseFloat(recommendation.hotel_price) >
      parseFloat(recommendation.overall_avg_hotel_price)
  );

  const segmentedContent = [
    {
      matchScore: `Matchscore is ${recommendation.matchScore}`,
      bestActivity: `Best time for ${recommendation.activities[0]}`,
      bucketlisted: `on your bucketlist`,
      eventCount: `${recommendation.events.length} events you may like`,
      visaFree: recommendation.country.visa_free_for.includes(user.country)
        ? "visa free for you"
        : "",
    },
    {
      temperature: `minimum: ${recommendation.climate.t_min}°C maximum: ${recommendation.climate.t_max}°C `,
      averagetemp: `average: ${recommendation.climate.t_avg}°C`,
      humidity: `Humidity: ${recommendation.climate.humidity}`,
      riskLevel: "Risk level has decreased from 3 to 2.",
    },
    { combinedEvents, combinedActivities },
    {
      hotelPrice:
        `Hotel price ${recommendation.hotel_price}$ ( ` +
        parseInt(
          Math.abs(
            (100 *
              (recommendation.hotel_price -
                recommendation.overall_avg_hotel_price)) /
              recommendation.overall_avg_hotel_price
          )
        ) +
        "%" +
        cheaperThanYearlyAverage,
    },
    {},
  ];
  const [activeTabContent, setActiveTabContent] = useState(segmentedContent[0]);

  const handleProgressPercent = (e) => {
    const percentValue = e.target.value;
    const percentValueInt = parseFloat(percentValue);
    setProgressPercent(percentValue);
    e.target.style.width = 100;
    if (percentValueInt === firstProgress) {
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setFirstTabImage(activeTabImages[0]);
      setSecondTabImage(inactiveTabImages[1]);
      setThirdTabImage(inactiveTabImages[2]);
      setForthTabImage(inactiveTabImages[3]);
      setFifthTabImage(inactiveTabImages[4]);
      setActiveTabContent(segmentedContent[0]);
    } else if (percentValueInt === secondProgress) {
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setFirstTabImage(inactiveTabImages[0]);
      setSecondTabImage(activeTabImages[1]);
      setThirdTabImage(inactiveTabImages[2]);
      setForthTabImage(inactiveTabImages[3]);
      setFifthTabImage(inactiveTabImages[4]);
      setActiveTabContent(segmentedContent[1]);
    } else if (percentValueInt === thirdProgress) {
      setFirstTabImage(inactiveTabImages[0]);
      setSecondTabImage(inactiveTabImages[1]);
      setThirdTabImage(activeTabImages[2]);
      setForthTabImage(inactiveTabImages[3]);
      setFifthTabImage(inactiveTabImages[4]);
      setActiveTabContent(segmentedContent[2]);
    } else if (percentValueInt === forthProgress) {
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setFirstTabImage(inactiveTabImages[0]);
      setSecondTabImage(inactiveTabImages[1]);
      setThirdTabImage(inactiveTabImages[2]);
      setForthTabImage(activeTabImages[3]);
      setFifthTabImage(inactiveTabImages[4]);
      setActiveTabContent(segmentedContent[3]);
    } else if (percentValueInt === fifthProgress) {
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setFirstTabImage(inactiveTabImages[0]);
      setSecondTabImage(inactiveTabImages[1]);
      setThirdTabImage(inactiveTabImages[2]);
      setForthTabImage(inactiveTabImages[3]);
      setFifthTabImage(activeTabImages[4]);
      setActiveTabContent(segmentedContent[4]);
    }
  };

  console.log("single recommendation is", recommendation);
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.cell}
        style={{
          backgroundImage: "url(" + recommendation.image + ")",
        }}
      >
        <div className={styles.title}>{recommendation.name}</div>
        <div className={styles.text}>
          {Object.values(activeTabContent).map(function (element) {
            return <div className={styles.textElement}> {element} </div>;
          })}
        </div>

        <div className={styles.progressBar}>
          <ProgressBar width={355} percent={progressPercent} />
        </div>

        <div className={styles.recommendationTabs}>
          {/* <div className={styles.centeredTabs}></div>*/}
          <button
            className={styles.tabButton}
            style={{
              height: "26px",
              width: `30px`,
              backgroundImage: `${firstTabImage}`,
            }}
            value={firstProgress}
            onClick={handleProgressPercent}
          ></button>
          <button
            className={styles.tabButton}
            style={{
              height: "23px",
              width: `30px`,
              backgroundImage: `${secondTabImage}`,
            }}
            value={secondProgress}
            onClick={handleProgressPercent}
          ></button>{" "}
          <button
            className={styles.tabButton}
            style={{
              height: "24px",
              width: `30px`,
              backgroundImage: `${thirdTabImage}`,
            }}
            value={thirdProgress}
            onClick={handleProgressPercent}
          >
            {" "}
          </button>{" "}
          <button
            className={styles.tabButton}
            style={{
              height: "29px",
              width: `30px`,
              backgroundImage: `${forthTabImage}`,
            }}
            value={forthProgress}
            onClick={handleProgressPercent}
          >
            {" "}
          </button>
          <button
            className={styles.tabButton}
            style={{
              height: "30px",
              width: `37px`,
              backgroundImage: `${fifthTabImage}`,
            }}
            value={fifthProgress}
            onClick={handleProgressPercent}
          >
            {" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;

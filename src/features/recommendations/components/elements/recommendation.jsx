import React, { useState } from "react";
import styles from "./recommendation.module.scss";
import ProgressBar from "./ProgressBar";
import VisibilitySensor from "react-visibility-sensor";
import { ReactComponent as OverviewImage } from "../../../../assets/overview.svg";
import { ReactComponent as CloudImage } from "../../../../assets/cloud.svg";
import { ReactComponent as EventsImage } from "../../../../assets/events.svg";
import { ReactComponent as AccommodationImage } from "../../../../assets/accommodation.svg";
import { ReactComponent as FlightsImage } from "../../../../assets/flights.svg";

let zerothProgress = 0.0;
let firstProgress = 0.25;
let secondProgress = 0.5;
let thirdProgress = 0.75;
let forthProgress = 1.0;
let fifthProgress = 1.0;

let increase = 0.0;

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

const Recommendation = ({ recommendation, stories, user, size }) => {
  const [isRecommendationActive, setIsRecommendationActive] = useState(false);
  const [textStyle, setTextStyle] = useState(styles.text);
  const [textElementStyle, setTextElementStyle] = useState(styles.textEvents);
  const screenThreshold = 700;
  const [progressPercent, setProgressPercent] = useState(firstProgress);

  const [activeButton, setActiveButton] = useState("first");

  const [firstTabImage, setFirstTabImage] = useState(activeTabImages[0]);
  const [secondTabImage, setSecondTabImage] = useState(inactiveTabImages[1]);
  const [thirdTabImage, setThirdTabImage] = useState(inactiveTabImages[2]);
  const [forthTabImage, setForthTabImage] = useState(inactiveTabImages[3]);
  const [fifthTabImage, setFifthTabImage] = useState(inactiveTabImages[4]);
  const [bestActivityIcon, setBestActivityIcon] = useState();

  const [overviewStyles, setOverviewStyles] = useState(styles.svgImage);
  const [cloudStyles, setCloudStyles] = useState(styles.svgImage);
  const [eventsStyles, setEventsStyles] = useState(styles.svgImageActive);
  const [accommodationStyles, setAccommodationStyles] = useState(
    styles.svgImage
  );
  const [flightsStyles, setFlightsStyles] = useState(styles.svgImage);

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

  const showEvents = recommendation.events.map((event) => {
    const div = <div className={textStyle}>{event.title}</div>;
    return div;
  });

  const bestActivityIconHandler = () => {
    if (recommendation.activities[0] == "Hiking") {
      setBestActivityIcon("🥾");
    } else if (recommendation.activities[0] == "Walking") {
      setBestActivityIcon("🚶🏽‍♀️");
    } else if (recommendation.activities[0] == "Mountain Bike") {
      setBestActivityIcon("🚵‍♀️");
    } else if (recommendation.activities[0] == "Kayak/ Canoe") {
      setBestActivityIcon("🛶");
    }
  };

  function handleShowEvents() {
    const divs = recommendation.events.map((event) => {
      const div1 = (
        <div className={textElementStyle}>
          {event.category == "sports" && "⚽ "}
          {event.category == "expos" && "🍷 "}
          {event.title}
        </div>
      );
      return div1;
    });

    const activitydivs = recommendation.activities.map((activity) => {
      const activitydiv1 = (
        <div className={textElementStyle}>
          {activity == "Hiking" && "🥾 "}
          {activity == "Walking" && "🚶🏽‍♀️ "}
          {activity == "Mountain Bike" && "🚵‍♀️ "}
          {activity == "Kayak/ Canoe" && "🛶 "}
          {activity}
        </div>
      );

      return activitydiv1;
    });
    return (
      <div className={textStyle}>
        {divs}
        {activitydivs}
      </div>
    );
  }

  let firstActivity = "";
  let combinedActivities;
  let timer;

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
    {},
    {
      hotelPrice: `🏨 Room in Hotel ${recommendation.hotel_price}$`,
      hotelPriceInfo:
        "(" +
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
    {
      route1: `🛬 Istanbul - ${recommendation.name}  350$`,
      route2: `🛬 Istanbul - Amsterdam - ${recommendation.name}  650$`,
      route3: `🛬 Istanbul - London - ${recommendation.name}  530$`,
    },
    {
      bestActivity: `🏄‍♀️  Best time for ${recommendation.activities[0]}`,
      visaFree: recommendation.country.visa_free_for.includes(user.country)
        ? "🛂      Visa free for you"
        : "",
      temperatureMin: `❄️  minimum: ${recommendation.climate.t_min}°C `,
      temperatureMax: `🔥 maximum: ${recommendation.climate.t_max}°C `,
      tripdays: "🚀 3 days trip recommended",
      riskLevel: "🦠 COVID: 343 daily cases in USA",
    },
  ];
  const [activeTabContent, setActiveTabContent] = useState(segmentedContent[0]);

  function resetReplayLoop() {
    //checkActiveTab(0);
    //setProgressPercent(0);
    setActiveButton("first");
    setActiveTabContent(segmentedContent[0]);
  }

  async function autoReplayLoop() {
    let d = 0.0;
    clearTimeout(timer);
    for (let i = 0; i <= 8000; i = i + 100) {
      setTimeout(function () {
        const x = autoReplayProgress(i / 8000, d);
      }, i);
    }
    //setActiveButton("first");
    //setActiveTabContent(segmentedContent[0]);
    /*
    for (let i = 0; i < 15000; i = i + 50) {
      setTimeout(function () {
        const x = autoReplayProgress((i + 50) / 15000);
      }, i);
    }
    */
  }

  async function autoReplayProgress(x, i) {
    //let i = 0.0;

    timer = await setTimeout(() => {
      i = i + x;
      //clearTimeout(timer);
      checkActiveTab(i);
      setProgressPercent(i);
    }, 1000);
    //clearTimeout(timer);
  }

  function checkActiveTab(percentValueInt) {
    if (percentValueInt >= firstProgress && percentValueInt < secondProgress) {
      setActiveButton("first");
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImageEvents);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImage);

      setTextStyle(styles.text);

      setActiveTabContent(segmentedContent[0]);
      handleShowEvents();
    } else if (
      percentValueInt >= secondProgress &&
      percentValueInt < thirdProgress
    ) {
      setActiveButton("second");
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setTextStyle(styles.text1);
      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImageActive);
      setFlightsStyles(styles.svgImage);

      setActiveTabContent(segmentedContent[1]);
    } else if (
      percentValueInt >= thirdProgress &&
      percentValueInt < forthProgress
    ) {
      setActiveButton("third");
      setTextStyle(styles.text2);
      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImageActive);

      setActiveTabContent(segmentedContent[2]);
      //handleShowEvents();
    } else if (percentValueInt >= forthProgress) {
      console.log("first progress is: ", firstProgress);
      console.log("percentvalue is: ", percentValueInt);
      setActiveButton("forth");
      setTextStyle(styles.text3);
      setOverviewStyles(styles.svgImageActive);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImage);

      setActiveTabContent(segmentedContent[3]);
    }
  }

  const handleProgressPercent = (e) => {
    const currentButton = e.target.name;
    setActiveButton(currentButton);
    const percentValue = e.target.value;
    const percentValueInt = parseFloat(percentValue);
    setProgressPercent(percentValue);
    //e.target.style.width = 100;
    checkActiveTab(percentValueInt);

    setTextStyle(styles.text);
    setTextElementStyle(styles.textEvents);
  };

  return (
    //<div className={styles.wrapper} onTouchStart={autoReplayLoop}>
    <div
      className={
        size.width < screenThreshold
          ? styles.wrapperCentered
          : styles.wrapperNotCentered
      }
    >
      {console.log("width-size in single recommendation is : ", size.width)}
      <VisibilitySensor
        onChange={(isVisible) => {
          //isVisible && resetReplayLoop();
          //isVisible && autoReplayLoop();
          //autoReplayLoop();
        }}
      >
        <div
          className={isRecommendationActive ? styles.cellDark : styles.cell}
          onMouseEnter={() => {
            setIsRecommendationActive(true);
            //autoReplayLoop();
            //resetReplayLoop();
            //setActiveButton("first");
            //setActiveTabContent(segmentedContent[0]);
          }}
          onMouseLeave={() => {
            setIsRecommendationActive(false);
            // resetReplayLoop();
            // setActiveButton("first");
            // setActiveTabContent(segmentedContent[0]);
          }}
          style={{
            backgroundImage: "url(" + recommendation.image + ")",
          }}
        >
          {bestActivityIconHandler}
          <div className={styles.title}>{recommendation.name}</div>

          <div className={styles.matchScore}>
            {recommendation.matchScore + "%"}
          </div>

          <div className={styles.matchScoreAlt}>match</div>

          {activeButton !== "first" && (
            <div className={textStyle}>
              {Object.values(activeTabContent).map(function (element) {
                return <div className={textElementStyle}> {element} </div>;
              })}
            </div>
          )}

          {activeButton == "first" && handleShowEvents()}

          <div className={styles.progressBar}>
            <ProgressBar width={355} percent={progressPercent} />
          </div>
          <div className={styles.recommendationTabs}>
            {/* <div className={styles.centeredTabs}></div>*/}
            <button
              name="first"
              className={styles.tabButton}
              value={firstProgress}
              onClick={handleProgressPercent}
              onMouseEnter={handleProgressPercent}
            >
              <EventsImage
                className={
                  activeButton == "first" ? styles.svgImageActive : eventsStyles
                }
                onMouseEnter={handleProgressPercent}
                onClick={handleProgressPercent}
              />
            </button>
            <button
              name="second"
              className={styles.tabButton}
              value={secondProgress}
              onClick={handleProgressPercent}
              onMouseEnter={handleProgressPercent}
            >
              <AccommodationImage
                className={
                  activeButton == "second"
                    ? styles.svgImageActive
                    : accommodationStyles
                }
                onMouseEnter={handleProgressPercent}
                onClick={handleProgressPercent}
              />
            </button>{" "}
            <button
              name="third"
              className={styles.tabButton}
              value={thirdProgress}
              onClick={handleProgressPercent}
              onMouseEnter={handleProgressPercent}
            >
              <FlightsImage
                className={
                  activeButton == "third"
                    ? styles.svgImageActive
                    : flightsStyles
                }
                onMouseEnter={handleProgressPercent}
                onClick={handleProgressPercent}
              />
            </button>
            <button
              name="forth"
              className={styles.tabButton}
              value={forthProgress}
              onClick={handleProgressPercent}
              onMouseEnter={handleProgressPercent}
            >
              <OverviewImage
                className={
                  activeButton == "forth"
                    ? styles.svgImageActive
                    : overviewStyles
                }
                onMouseEnter={handleProgressPercent}
                onClick={handleProgressPercent}
              />
            </button>
          </div>
        </div>
      </VisibilitySensor>
    </div>
  );
};

export default Recommendation;

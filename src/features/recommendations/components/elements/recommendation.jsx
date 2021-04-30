import React, { useState } from "react";
import styles from "./recommendation.module.scss";
import ProgressBar from "./ProgressBar";
import VisibilitySensor from "react-visibility-sensor";
import { ReactComponent as OverviewImage } from "../../../../assets/overview.svg";
import { ReactComponent as CloudImage } from "../../../../assets/cloud.svg";
import { ReactComponent as EventsImage } from "../../../../assets/events.svg";
import { ReactComponent as AccommodationImage } from "../../../../assets/accommodation.svg";
import { ReactComponent as FlightsImage } from "../../../../assets/flights.svg";

import {
  AiFillPlayCircle as PlayButton,
  AiFillPauseCircle as PauseButton,
} from "react-icons/ai";

import { BsBoxArrowUpRight as AddIcon2 } from "react-icons/bs";
import { FaExternalLinkAlt as AddIcon } from "react-icons/fa";

let zerothProgress = 0.0;
let firstProgress = 0.25;
let secondProgress = 0.5;
let thirdProgress = 0.75;
let forthProgress = 1.0;

const Recommendation = ({ recommendation, user, size }) => {
  const [isRecommendationActive, setIsRecommendationActive] = useState(false);
  const [textStyle, setTextStyle] = useState(styles.text);
  const [textElementStyle, setTextElementStyle] = useState(styles.textEvents);
  const screenThreshold = 700;
  const [progressPercent, setProgressPercent] = useState(zerothProgress);

  const [activeButton, setActiveButton] = useState("first");

  const [overviewStyles, setOverviewStyles] = useState(styles.svgImage);
  const [cloudStyles, setCloudStyles] = useState(styles.svgImage);
  const [eventsStyles, setEventsStyles] = useState(styles.svgImageActive);
  const [accommodationStyles, setAccommodationStyles] = useState(
    styles.svgImage
  );
  const [flightsStyles, setFlightsStyles] = useState(styles.svgImage);
  const [sectionTitle, setSectionTitle] = useState("Events");

  const [playAnimation, setPlayAnimation] = useState(false);

  const [eventsHolderStyles, setEventsHolderStyles] = useState(
    styles.eventsHolderAnimate
  );

  async function handlePlayAnimation() {
    let timer;
    //setActiveButton("first");
    //setActiveTabContent(segmentedContent[0]);

    setPlayAnimation(true);

    timer = await setTimeout(() => {
      setActiveButton("first");
    }, 0);
    timer = await setTimeout(() => {
      setActiveButton("second");
    }, 2500);

    timer = await setTimeout(() => {
      setActiveButton("third");
    }, 5000);

    timer = await setTimeout(() => {
      setActiveButton("forth");
    }, 7500);
  }

  function handleShowContent() {
    const div1 = (
      <div className={styles.eventsFrame}>
        <div className={eventsHolderStyles}>
          <div className={styles.sectionTitle}> Events </div>
          <div className={styles.eventsContentHolder}>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Superbowl Semifinal</div>
                <div className={styles.eventDescription}> 120$ - Mar 19 </div>
              </div>
              <button className={styles.buyButton}>
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Coldplay Concert</div>
                <div className={styles.eventDescription}>120$ - Mar 19 </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div className={styles.eventPhoto} />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Chocolate Festival</div>
                <div className={styles.eventDescription}>120$ - Mar 19 </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div className={styles.eventPhoto} />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>event name</div>
                <div className={styles.eventDescription}>120$ - Mar 19 </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div className={styles.eventPhoto} />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>event name</div>
                <div className={styles.eventDescription}>120$ - Mar 19 </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.eventsHolder}>
          <div className={styles.sectionTitle}> Accommodation </div>
          <div className={styles.eventsContentHolder}>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Private Room Rental </div>
                <div className={styles.eventDescription}>from 28$ </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Entire Home Rental</div>
                <div className={styles.eventDescription}>from 44$</div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Hostel Bed</div>
                <div className={styles.eventDescription}>from 10$</div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Room in 5-star Hotel</div>
                <div className={styles.eventDescription}>from 55$ </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.eventsHolder}>
          <div className={styles.sectionTitle}> Flights </div>
          <div className={styles.eventsContentHolder}>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ei.marketwatch.com/Multimedia/2019/02/25/Photos/ZQ/MW-HE536_airpla_20190225131547_ZQ.jpg?uuid=5fa81d1a-3929-11e9-9462-ac162d7bc1f7" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>
                  Istanbul - {recommendation.name}{" "}
                </div>
                <div className={styles.eventDescription}>from 350$</div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ei.marketwatch.com/Multimedia/2019/02/25/Photos/ZQ/MW-HE536_airpla_20190225131547_ZQ.jpg?uuid=5fa81d1a-3929-11e9-9462-ac162d7bc1f7" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>
                  {recommendation.name} - Istanbul{" "}
                </div>
                <div className={styles.eventDescription}>from 410$ </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ei.marketwatch.com/Multimedia/2019/02/25/Photos/ZQ/MW-HE536_airpla_20190225131547_ZQ.jpg?uuid=5fa81d1a-3929-11e9-9462-ac162d7bc1f7" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>
                  London - {recommendation.name}{" "}
                </div>
                <div className={styles.eventDescription}>from 480$ </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ei.marketwatch.com/Multimedia/2019/02/25/Photos/ZQ/MW-HE536_airpla_20190225131547_ZQ.jpg?uuid=5fa81d1a-3929-11e9-9462-ac162d7bc1f7" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>
                  {recommendation.name} - Amsterdam
                </div>
                <div className={styles.eventDescription}>from 530$ </div>
              </div>
              <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.eventsHolder}>
          <div className={styles.sectionTitle}>Overview</div>
          <div className={styles.eventsContentHolder}>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Activities</div>
                <div className={styles.eventDescription}>
                  Trekking,Surfing,Scuba Diving
                </div>
              </div>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=989&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Weather</div>
                <div className={styles.eventDescription}>
                  min 13°C, max 28°C
                </div>
              </div>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/flagged/photo-1584036561584-b03c19da874c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>COVID-19</div>
                <div className={styles.eventDescription}>318 Daily Cases</div>
              </div>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.unsplash.com/photo-1613244469730-f1aa82dbe7df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>Status</div>
                <div className={styles.eventDescription}>
                  Visa free for you, PCR test is necessary.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return div1;
  }
  /*
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
        <div className={styles.sectionTitle}> Events </div>
        {divs}
        {activitydivs}
      </div>
    );
  }
  */

  let timer;

  var cheaperThanYearlyAverage =
    parseFloat(recommendation.hotel_price) <
    parseFloat(recommendation.overall_avg_hotel_price)
      ? "cheaper than yearly average.)"
      : "more expensive than yearly average.)";

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

  function checkActiveTab(percentValueInt) {
    if (percentValueInt >= firstProgress && percentValueInt < secondProgress) {
      setActiveButton("first");

      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImageEvents);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImage);

      setTextStyle(styles.text);
      setSectionTitle("Events");

      //setActiveTabContent(segmentedContent[0]);
      //handleShowEvents();
    } else if (
      percentValueInt >= secondProgress &&
      percentValueInt < thirdProgress
    ) {
      setActiveButton("second");
      setSectionTitle("Accommodation");

      setTextStyle(styles.text1);
      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImageActive);
      setFlightsStyles(styles.svgImage);

      //setActiveTabContent(segmentedContent[1]);
    } else if (
      percentValueInt >= thirdProgress &&
      percentValueInt < forthProgress
    ) {
      setActiveButton("third");
      setSectionTitle("Flights");
      setTextStyle(styles.text2);
      setOverviewStyles(styles.svgImage);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImageActive);

      //setActiveTabContent(segmentedContent[2]);
      //handleShowEvents();
    } else if (percentValueInt >= forthProgress) {
      setActiveButton("forth");
      setSectionTitle("Overview");
      setTextStyle(styles.text3);
      setOverviewStyles(styles.svgImageActive);
      setCloudStyles(styles.svgImage);
      setEventsStyles(styles.svgImage);
      setAccommodationStyles(styles.svgImage);
      setFlightsStyles(styles.svgImage);

      //setActiveTabContent(segmentedContent[3]);
    }
  }

  const handleProgressPercent = (e) => {
    //disable autoanimation
    setPlayAnimation(false);
    const currentButton = e.target.name;
    setActiveButton(currentButton);

    if (currentButton == "first") {
      setEventsHolderStyles(styles.eventsHolderAnimate);
    } else if (currentButton == "second" && activeButton == "first") {
      setEventsHolderStyles(styles.eventsHolderAnimate2);
    } else if (currentButton == "second" && activeButton !== "first") {
      setEventsHolderStyles(styles.eventsHolderAnimate2reverse);
    } else if (currentButton == "third" && activeButton !== "forth") {
      setEventsHolderStyles(styles.eventsHolderAnimate3);
    } else if (currentButton == "third" && activeButton == "forth") {
      setEventsHolderStyles(styles.eventsHolderAnimate3reverse);
    } else if (currentButton == "forth") {
      setEventsHolderStyles(styles.eventsHolderAnimate4);
    }
    const percentValue = e.target.value;
    const percentValueInt = parseFloat(percentValue);
    setProgressPercent(percentValue);

    checkActiveTab(percentValueInt);

    setTextStyle(styles.text);
    setTextElementStyle(styles.textEvents);
  };

  return (
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
        }}
      >
        <div
          className={isRecommendationActive ? styles.cellDark : styles.cell}
          onMouseEnter={() => {
            setIsRecommendationActive(true);
            setPlayAnimation(true);
            setEventsHolderStyles(styles.eventsHolderFullAnimate);

            //autoReplayLoop();
            //resetReplayLoop();
            //setActiveButton("first");
            //setActiveTabContent(segmentedContent[0]);
          }}
          onMouseLeave={() => {
            setIsRecommendationActive(false);
            setPlayAnimation(false);
            setEventsHolderStyles(styles.eventsHolderAnimate);
            setActiveButton("first");
            setOverviewStyles(styles.svgImage);
            setCloudStyles(styles.svgImage);
            setEventsStyles(styles.svgImageEvents);
            setAccommodationStyles(styles.svgImage);
            setFlightsStyles(styles.svgImage);
            setProgressPercent(firstProgress);
          }}
          style={{
            backgroundImage: "url(" + recommendation.image + ")",
          }}
        >
          <div className={styles.title}>{recommendation.name}</div>

          {handleShowContent()}

          <button
            className={styles.playStopFlow}
            onClick={() => {
              !playAnimation &&
                setEventsHolderStyles(styles.eventsHolderFullAnimate);
              playAnimation &&
                setEventsHolderStyles(styles.eventsHolderAnimate);
              setPlayAnimation(!playAnimation);
            }}
          ></button>
          <div className={styles.progressBar}>
            {playAnimation ? (
              <ProgressBar
                width={355}
                percent={1.0}
                play={playAnimation}
                animationHandler={(event) =>
                  console.log("animation handling for", event.animationName)
                }
              />
            ) : (
              <ProgressBar width={355} percent={progressPercent} play={false} />
            )}
          </div>
          <div className={styles.recommendationTabs}>
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

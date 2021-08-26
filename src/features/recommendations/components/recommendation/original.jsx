import React, { useState } from "react";
import styles from "./recommendation.module.scss";
import _interesection from "lodash/intersection";

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  },
];

const Recommendation = ({ recommendation, user, size = 1024 }) => {
  const [isRecommendationActive, setIsRecommendationActive] = useState(false);

  //We will update it on backend.
  const [isLiked, setIsLiked] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const screenThreshold = 700;

  function handleShowContent() {
    const div1 = (
      <div className={styles.eventsFrame}>
        <div className={styles.eventsHolderAnimate}>
          <div className={styles.eventsContentHolder}>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ik.imagekit.io/7zlqc1cmihe/f1_gUi3gVo9UM.svg?updatedAt=1629383611517" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventDescription}>Flights</div>
                <div className={styles.eventName}>
                  {" "}
                  Fastest: $655 Cheapest: $155 Best: $355
                </div>
              </div>
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhoto}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ik.imagekit.io/7zlqc1cmihe/f2_t5dpjC4Hni.svg?updatedAt=1629383611512" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventDescription}>Acommodation</div>
                <div className={styles.eventName}>
                  Hostel: $655 Airbnb: $155 Hotel: $355
                </div>
              </div>
              {/* <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>*/}
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhotoVisa}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ik.imagekit.io/7zlqc1cmihe/f3_312aF4qJe.svg?updatedAt=1629383611526" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventDescription}>Status</div>
                <div className={styles.eventName}>
                  Visa free for you, PCR test is necessary.
                </div>
              </div>
              {/* <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>*/}
            </div>
            <div className={styles.eventCell}>
              <div
                className={styles.eventPhotoWeather}
                style={{
                  backgroundImage:
                    "url(" +
                    "https://ik.imagekit.io/7zlqc1cmihe/f4_qLTwoX-Hg.svg?updatedAt=1629383611412" +
                    ")",
                }}
              />
              <div className={styles.eventDetails}>
                <div className={styles.eventDescription}>Weather</div>
                <div className={styles.eventName}>min 13°C, max 28°C</div>
              </div>
              {/* <button className={styles.buyButton}>
                {" "}
                <AddIcon className={styles.buyNow} />
              </button>*/}
            </div>
          </div>
        </div>
      </div>
    );
    return div1;
  }

  return (
    <div
      className={
        size.width < screenThreshold
          ? styles.wrapperCentered
          : styles.wrapperNotCentered
      }
    >
      <div
        className={isRecommendationActive ? styles.cellDark : styles.cell}
        onMouseEnter={() => {
          setIsRecommendationActive(true);
        }}
        onMouseLeave={() => {
          setIsRecommendationActive(false);
        }}
        style={{
          //backgroundImage: "url(" + recommendation.images + ")",
          backgroundImage:
            "url(" +
            " https://images.unsplash.com/photo-1480548004877-593316be2bd5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" +
            ")",
        }}
      >
        <div className={styles.titleAndHeart}>
          <div className={styles.title}>
            {recommendation.name} {recommendation.country.emoji_flag}
          </div>
          <button className={styles.heart} onClick={() => setIsLiked(!isLiked)}>
            {
              <img
                className={styles.heart}
                src={
                  isLiked
                    ? "https://ik.imagekit.io/7zlqc1cmihe/bpselectedoption_X9_D5zp1vc.svg?updatedAt=1629412884533"
                    : "https://ik.imagekit.io/7zlqc1cmihe/bpnotselected_AOwJrggHJS0.svg?updatedAt=1629412615056"
                }
                alt=""
              />
            }
          </button>
        </div>
        <div className={styles.showImage}>
          <button
            className={styles.heart}
            onClick={() => setShowFullImage(!showFullImage)}
          >
            {
              <img
                className={styles.heart}
                src={
                  showFullImage
                    ? "https://ik.imagekit.io/7zlqc1cmihe/notshowimage_Fy4G-OAqQn.svg?updatedAt=1629414318186"
                    : "https://ik.imagekit.io/7zlqc1cmihe/showimage_QEB7CTM_J.svg?updatedAt=1629414318216"
                }
                alt=""
              />
            }
          </button>
        </div>

        <div
          className={
            showFullImage ? styles.blurredBgTransparent : styles.blurredBg
          }
        >
          <div className={styles.arrowHolder}>
            <div className={styles.arrowLeft}>
              <FaChevronLeft />
            </div>
            <div className={styles.arrowRight}>
              <FaChevronRight />
            </div>
          </div>

          <div className={styles.slideHolder}>
            {images.map((image) => (
              <div>
                <img src={image.link} className={styles.slideElement} alt="a" />
                <div className={styles.slideText}>Event1</div>
              </div>
            ))}
          </div>
          {handleShowContent()}
          <div className={styles.arrowHolder}>
            <div className={styles.arrowLeft}>
              <FaChevronLeft />
            </div>
            <div className={styles.arrowRight}>
              <FaChevronRight />
            </div>
          </div>
          <div className={styles.slideHolder}>
            {images.map((image) => (
              <div>
                <img src={image.link} className={styles.slideElement} alt="a" />
                <div className={styles.slideText}>POI1</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;

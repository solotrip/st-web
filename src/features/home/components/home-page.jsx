import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import styles from "./home-page.module.scss";
import { ReactComponent as PulfyIcon } from "../../../assets/pold.svg";
import { Link } from "react-router-dom";
//import Combined from "assets/combined.mp4";
import Recommendation from "../../recommendations/components/recommendation/index";
import Content from "../../recommendations/components/content";
import { isMobile } from "react-device-detect";

import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

import { profileSelector } from "../../profile/slice";

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

let yourspecs = [
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Events & Festivals",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Acommodation",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Flights",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Visa Status",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Attractions",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Covid Stats",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "General Status",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Cost of Living",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Events & Festivals",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Acommodation",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Flights",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Visa Status",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Attractions",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Covid Stats",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "General Status",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Cost of Living",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Events & Festivals",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Acommodation",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Flights",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Visa Status",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Attractions",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Covid Stats",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "General Status",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Cost of Living",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Events & Festivals",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Acommodation",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Flights",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Visa Status",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "Attractions",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Covid Stats",
  },
  {
    link:
      "https://seatgeek.com/images/performers-landscape/super-bowl-e0465e/11591/huge.jpg",
    title: "General Status",
  },
  {
    link:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Cost of Living",
  },
];

let recommendation = {
  activities: ["activity1", "activity2"],
  bucketlisted: false,
  climate: {
    humidity: 66.3,
    rainy_days: 9,
    t_avg: 22,
    t_max: 28.6,
    t_min: 15.7,
    w_speed: 9.7,
  },
  country: {
    country_code: "PL",
    ISO2: "PL",
    emoji_flag: "🇵🇱",
    name: "Poland",
    visa_free_for: [
      "IT",
      "WS",
      "SC",
      "MO",
      "MT",
      "ME",
      "VG",
      "RO",
      "AD",
      "PW",
      "FO",
      "RS",
      "GU",
      "HM",
      "GB",
      "MH",
      "NZ",
      "ES",
      "CR",
      "SE",
      "DK",
      "HU",
      "BR",
      "CZ",
      "DE",
      "JP",
      "MK",
      "MD",
      "BL",
      "TW",
      "VU",
      "VI",
      "CY",
      "SV",
      "PF",
      "GD",
      "HK",
      "AR",
      "BS",
      "BN",
      "BG",
      "VE",
      "FK",
      "GL",
      "HN",
      "JE",
      "TT",
      "IL",
      "NL",
      "CO",
      "DM",
      "LU",
      "NU",
      "AT",
      "LT",
      "SM",
      "BE",
      "CH",
      "BA",
      "PA",
      "US",
      "GI",
      "SG",
      "AS",
      "AI",
      "AW",
      "BM",
      "KY",
      "LC",
      "PM",
      "VC",
      "TC",
      "WF",
      "AX",
      "BB",
      "IO",
      "CL",
      "CK",
      "CW",
      "FI",
      "GT",
      "IS",
      "KI",
      "LI",
      "MU",
      "MX",
      "PY",
      "KN",
      "MF",
      "TL",
      "TO",
      "HR",
      "EE",
      "FR",
      "TF",
      "IE",
      "LV",
      "MY",
      "FM",
      "MC",
      "MS",
      "NI",
      "NF",
      "MP",
      "NO",
      "PN",
      "SX",
      "SI",
      "GS",
      "UY",
      "TV",
      "AG",
      "AU",
      "CA",
      "GR",
      "GG",
      "IM",
      "KR",
      "NC",
      "PE",
      "PR",
      "SH",
      "SK",
      "UA",
      "SJ",
      "PT",
      "SB",
      "AE",
      "AL",
      "GE",
      "VA",
    ],
    visa_on_arrival_for: [],
    languages: ["Polish"],
    names: {
      name_de: "Polen",
      name_en: "Poland",
      name_es: "Polonia",
      name_fr: "Pologne",
      name_it: "Polonia",
      name_ru: "Польша",
      name_tr: "Polonya",
      name_zh: "波兰",
    },
  },
  events: [],
  name: "Budapest",
  popular: true,
  sid: "budapest",
};

const HomePage = ({}) => {
  //const { data: user, loading: profileLoading } = useSelector(profileSelector);
  return (
    <div className={styles.outer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <img
              src="https://ik.imagekit.io/7zlqc1cmihe/nostroke_On5RfkPz2W.png?updatedAt=1629769174155"
              style={{ width: "150px" }}
              alt=""
            />
          </div>
          <div className={styles.logoText}></div>
        </div>
        <div className={styles.login}>
          <Link to="/login">
            <button className={styles.button}>login</button>
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.row1}>
          <div className={styles.row1Title}>
            <div>Personalized </div>
            <div>Travel</div>
            <div>Recommendations</div>
          </div>
          <div className={styles.row1Subtitle}>
            Recommendations based on events, festivals, accommodation, flights,
            weather and much more.
          </div>
          <Link to="/onboarding/1">
            <button className={styles.actionButton}>Get Recommendations</button>
          </Link>
        </div>
      </div>
      {/*<div className={styles.recoDemo}>
        <Content recommendations={[recommendation]} mapEnabled={false} />
  </div>*/}
      <div className={styles.videoContainer}>
        <video
          autoPlay
          src={
            "https://res.cloudinary.com/dtp5yitjt/video/upload/v1629817028/combined2_pqra8s.mp4"
          }
          playsInline
          loop="loop"
          muted
          preload="auto"
          id="myVideo"
          className={styles.videoContainer}
        >
          your browser does not support video tag.
        </video>
      </div>

      {!isMobile ? (
        <div className={styles.featuresHolder}>
          <div className={styles.featureImage}>
            <div className={styles.arrowHolder}>
              <div className={styles.arrowLeft}>
                <FaChevronLeft />
              </div>
              <div className={styles.arrowRight}>
                <FaChevronRight />
              </div>
            </div>
            <div className={styles.slideHolder}>
              {yourspecs.map((spec) => (
                <div>
                  <ImageShadow
                    src={spec.link}
                    className={styles.slideElement}
                    width={80}
                    shadowBlur={10}
                    alt="a"
                  />
                  <div className={styles.slideText}>{spec.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Your Specs.</div>
            <div className={styles.featureSubtitle}>
              Choose what you want to see on recommendation.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.featuresHolder}>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Your Specs.</div>
            <div className={styles.featureSubtitle}>
              Choose what you want to see on recommendation.
            </div>
          </div>

          <div className={styles.featureImage}>
            <div className={styles.arrowHolder}>
              <div className={styles.arrowLeft}>
                <FaChevronLeft />
              </div>
              <div className={styles.arrowRight}>
                <FaChevronRight />
              </div>
            </div>
            <div className={styles.slideHolder}>
              {yourspecs.map((spec) => (
                <div>
                  <ImageShadow
                    src={spec.link}
                    className={styles.slideElement}
                    width={80}
                    shadowBlur={10}
                    alt="a"
                  />
                  <div className={styles.slideText}>{spec.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles.featuresHolder}>
        <div className={styles.featureText}>
          <div className={styles.featureTitle}>Your Time.</div>
          <div className={styles.featureSubtitle}>
            Choose your available dates or extended periods for travel.
          </div>
        </div>
        <div className={styles.featureImage}>
          <ImageShadow
            className={styles.calendar}
            src={
              "https://ik.imagekit.io/7zlqc1cmihe/July_kJ0X3FxmQg.svg?updatedAt=1629801887574"
            }
            width={"70%"}
            shadowBlur={10}
            alt="a"
          />
        </div>
      </div>
      {!isMobile ? (
        <div className={styles.featuresHolder}>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                "https://ik.imagekit.io/7zlqc1cmihe/Ekran_Resmi_2021-08-24_03.43.15_CE4wOz4ST2.png?updatedAt=1629802491671"
              }
              width={"60%"}
              shadowBlur={10}
              alt="a"
            />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Your Recommendations.</div>
            <div className={styles.featureSubtitle}>Period.</div>
          </div>
        </div>
      ) : (
        <div className={styles.featuresHolder}>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Your Recommendations.</div>
            <div className={styles.featureSubtitle}>Period.</div>
          </div>
          <div className={styles.featureImage}>
            <ImageShadow
              className={styles.calendar}
              src={
                "https://ik.imagekit.io/7zlqc1cmihe/Ekran_Resmi_2021-08-24_03.43.15_CE4wOz4ST2.png?updatedAt=1629802491671"
              }
              width={"60%"}
              shadowBlur={10}
              alt="a"
            />
          </div>
        </div>
      )}
      <div className={styles.featuresHolder}>
        <div className={styles.featureText}>
          <div className={styles.featureTitle}>Get Notifications.</div>
          <div className={styles.featureSubtitle}>
            Updates, status changes, cancellations of events and flights. All
            the things that matter to you.
          </div>
        </div>
        <div className={styles.featureImage}>
          <ImageShadow
            className={styles.calendar}
            src={
              "https://ik.imagekit.io/7zlqc1cmihe/aa/Ekran_Resmi_2021-08-24_14.36.12_Ac3kgVKY5-.png?updatedAt=1629805024074"
            }
            width={"60%"}
            shadowBlur={10}
            alt="a"
          />
          <ImageShadow
            className={styles.calendar}
            src={
              "https://ik.imagekit.io/7zlqc1cmihe/aa/Ekran_Resmi_2021-08-24_14.35.29_laUsGjaOK.png?updatedAt=1629805023868"
            }
            width={"60%"}
            shadowBlur={10}
            style={{ paddingTop: "20px" }}
            alt="a"
          />
          <ImageShadow
            className={styles.calendar}
            src={
              "https://ik.imagekit.io/7zlqc1cmihe/aa/Ekran_Resmi_2021-08-24_14.35.55_79AdExil-7V.png?updatedAt=1629805024034"
            }
            width={"60%"}
            shadowBlur={10}
            style={{ paddingTop: "20px" }}
            alt="a"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.row2}>
          <div className={styles.row1Subtitle}>
            Ready to Get Recommendations?
          </div>
          <Link to="/onboarding/1">
            <div className={styles.actionButton}>Get Started</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;

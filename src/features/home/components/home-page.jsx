import React from "react";
import Footer from "./footer";

import styles from "./home-page.module.scss";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

let yourspecs = [
  {
    link:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    title: "Events & Festivals",
    key: 14,
  },
  {
    link:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Acommodation",
    key: 24,
  },
  {
    link:
      "https://images.unsplash.com/photo-1605590427165-3884d6aa6731?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    title: "Flights",
    key: 34,
  },
  {
    link:
      "https://images.unsplash.com/photo-1523384709476-df63a9564991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
    title: "Visa Status",
    key: 44,
  },
  {
    link:
      "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80",
    title: "Attractions",
    key: 54,
  },
  {
    link:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80",
    title: "Covid Stats",
    key: 74,
  },
  {
    link:
      "https://images.unsplash.com/photo-1585391443707-de9291b9acb2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvdW50cnl8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    title: "General Status",
    key: 84,
  },
  {
    link:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    title: "Cost of Living",
    key: 64,
  },
];

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
                    key={spec.key + "887"}
                  />
                  <div className={styles.slideText} key={spec.key + "34"}>
                    {spec.title}
                  </div>
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
                    key={spec.key + "111"}
                  />
                  <div className={styles.slideText} key={spec.key + "134"}>
                    {spec.title}
                  </div>
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
            key="1"
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
            key="2"
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
            key="3"
          />
        </div>
      </div>
      {!isMobile ? (
        <div className={styles.featuresHolder}>
          <div className={styles.featureImage}>
            <div className={styles.arrowHolder}>
              <div className={styles.arrowLeft2}>
                <FaChevronLeft />
              </div>
              <div className={styles.arrowRight2}>
                <FaChevronRight />
              </div>
            </div>
            <div className={styles.slideHolder}>
              {yourspecs.map((spec) => (
                <div>
                  <ImageShadow
                    src={
                      "https://ik.imagekit.io/7zlqc1cmihe/Ekran_Resmi_2021-08-24_03.43.15_CE4wOz4ST2.png?updatedAt=1629802491671"
                    }
                    className={styles.slideElement2}
                    width={250}
                    shadowBlur={8}
                    alt="a"
                    key={spec.key + "211"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Infinite Customization.</div>
            <div className={styles.featureSubtitle}>
              You can customize your recommendations with different
              combinations.
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.featuresHolder}>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Infinite Customization.</div>
            <div className={styles.featureSubtitle}>
              You can customize your recommendations with different
              combinations.
            </div>
          </div>
          <div className={styles.featureImage}>
            <div className={styles.arrowHolder}>
              <div className={styles.arrowLeft2}>
                <FaChevronLeft />
              </div>
              <div className={styles.arrowRight2}>
                <FaChevronRight />
              </div>
            </div>
            <div className={styles.slideHolder}>
              {yourspecs.map((spec) => (
                <div>
                  <ImageShadow
                    src={
                      "https://ik.imagekit.io/7zlqc1cmihe/Ekran_Resmi_2021-08-24_03.43.15_CE4wOz4ST2.png?updatedAt=1629802491671"
                    }
                    className={styles.slideElement2}
                    width={250}
                    shadowBlur={10}
                    alt="a"
                    key={spec.key + "211"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

      <Footer />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;

import React from "react";
import Footer from "./footer";

import styles from "./home-page.module.scss";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

//import { Capacitor } from "@capacitor/core";

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

let yourspecs = [
  {
    link: "https://source.unsplash.com/5Rt5KhbUp5g/400x300",
    title: "Events & Festivals",
    key: 14,
  },
  {
    link: "https://source.unsplash.com/IQKuHc2lils/400x300",
    title: "Acommodation",
    key: 24,
  },
  {
    link: "https://source.unsplash.com/x2lS3Xl_Lzw/400x300",
    title: "Flights",
    key: 34,
  },
  {
    link: "https://source.unsplash.com/gMJ3tFOLvnA/400x300",
    title: "Visa Status",
    key: 44,
  },
  {
    link: "https://source.unsplash.com/nnzkZNYWHaU/400x300",
    title: "Attractions",
    key: 54,
  },
  {
    link: "https://source.unsplash.com/rnr8D3FNUNY/400x300",
    title: "Covid Stats",
    key: 74,
  },
  {
    link: "https://source.unsplash.com/1lfI7wkGWZ4/400x300",
    title: "General Status",
    key: 84,
  },
  {
    link: "https://source.unsplash.com/ZVprbBmT8QA/400x300",
    title: "Cost of Living",
    key: 64,
  },
];

let bucketlist = [
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/France_Marseille_071_Z_zcXbsw6.jpeg",
    title: "Marseille 🇫🇷",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Poland_Warsaw_081_hszpzFXzc.jpeg",
    title: "Warsaw 🇵🇱",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Belgium_Brussels_043_ywtsNgEVe.jpeg",
    title: "Brussels 🇧🇪",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Britain_Oxford_061_CWq5_ZI6V.jpeg",
    title: "Oxford 🇬🇧",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Czech_Republic_Prague_014_K3DSjNySSMU.jpeg",
    title: "Prague 🇨🇿",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Taormina_068_0fGbxxOWH.jpeg",
    title: "Taormina 🇮🇹",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Britain_Cambridge_067_FMIKN5uSm.jpeg",
    title: "Cambridge 🇬🇧",
  },

  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Lombardy_073_OdqaupZ6EY.jpeg",
    title: "Lombardy 🇮🇹",
  },

  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Sweden_Stockholm_035_7J-e0AYhX.jpeg",
    title: "Stockholm 🇸🇪",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Italy_Milan_009_rcyh_cGrtRoR.jpeg",
    title: "Milan 🇮🇹",
  },
  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Portugal_Azores_078_ZN9sCXr4M.jpeg",
    title: "Azores 🇵🇹",
  },

  {
    link:
      "https://ik.imagekit.io/7zlqc1cmihe/Europe_Popular_Destinations/tr:h-400/Croatia_Zagreb_069_K6DbU9BV8.jpeg",
    title: "Zagreb 🇭🇷",
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
                    width={160}
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
                    width={160}
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
          <div className={styles.featureTitle}>Your Bucketlist.</div>
          <div className={styles.featureSubtitle}>
            Prioritize the recommendations from destinations you want to go.
          </div>
        </div>

        <div className={styles.featureImage}>
          <div className={styles.arrowHolder}>
            <div className={styles.arrowLeft3}>
              <FaChevronLeft />
            </div>
            <div className={styles.arrowRight3}>
              <FaChevronRight />
            </div>
          </div>
          <div className={styles.slideHolder}>
            {bucketlist.map((spec) => (
              <div>
                <ImageShadow
                  src={spec.link}
                  className={styles.slideElement3}
                  shadowBlur={10}
                  alt="a"
                  key={spec.key + "111"}
                />
                <div className={styles.slideText2} key={spec.key + "134"}>
                  {spec.title}
                </div>
              </div>
            ))}
          </div>
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

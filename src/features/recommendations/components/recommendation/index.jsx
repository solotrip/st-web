import React, { useState, useEffect } from "react";
import styles from "./recommendation.module.scss";
import _interesection from "lodash/intersection";
import useThemeState from "utils/hooks/use-theme-state";
import {useDispatch,useSelector} from "react-redux"
import {addToBucketlist, removeFromBucketlist} from "../../../preferences/containers/bucketlist/slice"
import { addToWishlist,removeFromWishlist  } from "../../../wishlist/slice"

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

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

const Recommendation = ({
  recommendation,
  user,
  size = 1024,
  activeHandler,
  wishlisted
}) => {
  const dispatch = useDispatch()
  

  
  const [showFullImage, setShowFullImage] = useState(false);
  const screenThreshold = 700;
  const [appTheme] = useThemeState();

  

  const handleHeart = (reco) => {
    //setIsLiked(!wishlisted);
    if (wishlisted) {
      dispatch(removeFromWishlist(reco))
      //setHeartStyle(styles.heartFilled);
    } else {
      dispatch(addToWishlist(reco))

      //setHeartStyle(styles.heart);
    }
  };

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : true
  );

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <>
      {isMobile && (
        <>
        {/*console.log("recommendation details are: ", recommendation)*/}
          <div
            onMouseEnter={() => {
              activeHandler(recommendation.sid);
            }}
            className={styles.wrapper}
           
          >
            <div className={styles.titleAndHeart}>
              <div className={styles.title}>
                {recommendation.name} {recommendation.country.emoji_flag}
              </div>
              <button className={wishlisted ? styles.heartFilled : styles.heart} onClick={() => handleHeart(recommendation)}>
                {
                  <img
                    className={wishlisted ? styles.heartFilled : styles.heart}
                    alt=""
                  />
                }
              </button>
            </div>
            <div className={styles.wrapper2}>
              <div className={styles.cell}>
                <div className={styles.slider}>Events & Festivals</div>
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
                      <ImageShadow
                        src={image.link}
                        className={styles.slideElement}
                        width={80}
                        shadowBlur={10}
                        alt="a"
                        key={image.link + "1"}
                      />
                      <div className={styles.slideText}>Event1</div>
                    </div>
                  ))}
                </div>

                <div className={styles.content}>
                  <div className={styles.stats}>
                    <div className={styles.statRow}>
                      <div className={styles.statImage}>
                        <ImageShadow
                        
                          src={
                            appTheme == "light"
                              ? "https://ik.imagekit.io/7zlqc1cmihe/darkplane_6qiv8c4PG.svg?updatedAt=1629578118558"
                              : "https://ik.imagekit.io/7zlqc1cmihe/f1_gUi3gVo9UM.svg?updatedAt=1629383611517"
                          }
                          width={"50px"}
                        />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Fastest
                          </div>
                          <div className={styles.statContentCellRow2}>655$</div>
                        </div>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Cheapest
                          </div>
                          <div className={styles.statContentCellRow2}>155$</div>
                        </div>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>Best</div>
                          <div className={styles.statContentCellRow2}>355$</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.statRow}>
                      <div className={styles.statImage}>
                        <ImageShadow
                          src={
                            appTheme == "light"
                              ? "https://ik.imagekit.io/7zlqc1cmihe/darkhome_Em0WLXxzpp.svg?updatedAt=1629578118545"
                              : "https://ik.imagekit.io/7zlqc1cmihe/f2_t5dpjC4Hni.svg?updatedAt=1629383611512"
                          }
                          width={"50px"}
                        />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Hotel
                          </div>
                          <div className={styles.statContentCellRow2}>200$</div>
                        </div>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Hostel
                          </div>
                          <div className={styles.statContentCellRow2}>22$</div>
                        </div>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Airbnb
                          </div>
                          <div className={styles.statContentCellRow2}>55$</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.statRow}>
                      <div className={styles.statImagePass}>
                        <ImageShadow
                          src={
                            appTheme == "light"
                              ? "https://ik.imagekit.io/7zlqc1cmihe/darkpass_9y2utfZOS.svg?updatedAt=1629578118493"
                              : "https://ik.imagekit.io/7zlqc1cmihe/f3_312aF4qJe.svg?updatedAt=1629383611526"
                          }
                          width={"40px"}
                        />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            Visa free for you.
                          </div>
                          <div className={styles.statContentCellRow2}>
                            PCR test is necessary.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.statRow}>
                      <div className={styles.statImagePass}>
                        <ImageShadow
                          src={
                            appTheme == "light"
                              ? "https://ik.imagekit.io/7zlqc1cmihe/darkcloud_WU3lopNi2.svg?updatedAt=1629578118570"
                              : "https://ik.imagekit.io/7zlqc1cmihe/f4_qLTwoX-Hg.svg?updatedAt=1629383611412"
                          }
                          width={"50px"}
                        />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statContentCell}>
                          <div className={styles.statContentCellRow1}>
                            min 13°C, max 28°C
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.slider}>What to See</div>
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
                      <ImageShadow
                        src={image.link}
                        className={styles.slideElement}
                        width={80}
                        shadowBlur={10}
                        alt="a"
                        key={image.link + "2"}
                      />
                      <div className={styles.slideText}>POI1</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;

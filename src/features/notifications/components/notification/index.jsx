import React, { useState } from "react";
import styles from "./notification.module.scss";
import _interesection from "lodash/intersection";

import {
  FaExternalLinkAlt as AddIcon,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
} from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Notification = ({ notification, user, size = 1024 }) => {
  const screenThreshold = 700;

  return (
    <div
      className={
        size.width < screenThreshold
          ? styles.wrapperCentered
          : styles.wrapperNotCentered
      }
    >
      <div className={styles.cell}>
        <div className={styles.firstRow}>
          <div className={styles.dateHolder}>{notification.dates}</div>
          <div>
            {!notification.hasSeen && (
              <img
                className={styles.notSeen}
                src={
                  "https://ik.imagekit.io/7zlqc1cmihe/reddot_wYbUrVkJvLu.svg?updatedAt=1629379244841"
                }
                alt=""
              />
            )}
          </div>
        </div>
        <div className={styles.secondRow}> {notification.notificationText}</div>
        <div className={styles.thirdRow}>
          <img
            className={styles.image}
            src={notification.notificationDetails.image}
            alt=""
          />
          <div className={styles.innerRow}>
            <div className={styles.title}>
              {notification.notificationDetails.title}
            </div>
            <div className={styles.subtitle}>
              {" "}
              {notification.notificationDetails.subtitle}
            </div>
          </div>
        </div>
        <div className={styles.forthRow}> {notification.timeStamp}</div>
      </div>
    </div>
  );
};

export default Notification;

import React from "react";
import styles from "./content.module.scss";
import Notification from "./notification";

const Content = ({ notifications, user }) => {
  return (
    <div className={styles.outerWrapperCentered}>
      <div className={styles.wrapperCentered}>
        <div className={styles.rowin}>
          {notifications.map((notification) => {
            return (
              <Notification
                key={`not-${notification.sid}`}
                notification={notification}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;

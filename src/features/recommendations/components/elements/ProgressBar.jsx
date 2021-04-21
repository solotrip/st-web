import * as React from "react";

import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ width, percent, status, play, animationHandler }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width);
    console.log("progress value changed");
  });

  return (
    <div className={styles.progressComp}>
      <h1 className={styles.percentNumber}>{status}</h1>
      <div className={styles.progressDiv} style={{ width: width }}>
        <div
          style={play ? { width: `0px` } : { width: `${value}px` }}
          className={play ? styles.progressPlay : styles.progress}
          //onAnimationIterationCapture={animationHandler}
          //onProgress={console.log("on progress event")}
          //onRateChange={console.log("on rate change event")}
          onTimeUpdate={animationHandler}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

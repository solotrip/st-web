import * as React from "react";

import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ width, percent, status }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width);
  });

  return (
    <div className={styles.progressComp}>
      <h1 className={styles.percentNumber}>{status}</h1>
      <div className={styles.progressDiv} style={{ width: width }}>
        <div style={{ width: `${value}px` }} className={styles.progress} />
      </div>
    </div>
  );
};

export default ProgressBar;

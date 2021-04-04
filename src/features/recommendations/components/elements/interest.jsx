import React, { useState } from "react";
import styles from "./interest.module.scss";

const Interest = ({ data }) => {
  const [addSelected, setAddSelected] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.listItem} key={data.name}>
        <div className={styles.itemName}>{data.name}</div>
        <button
          className={!addSelected ? styles.addButton : styles.removeButton}
          onClick={() => setAddSelected(!addSelected)}
        >
          {!addSelected ? "Add" : "Added"}
        </button>
      </div>
    </div>
  );
};

export default Interest;

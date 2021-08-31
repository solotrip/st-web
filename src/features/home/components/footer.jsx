import React from "react";

import styles from "./footer.module.scss";

const Footer = ({}) => {
  return (
    <div className={styles.wrapper}>
      <button class={styles.element}>About Pulfy</button>
      <button class={styles.element}>Newsroom</button>
      <button class={styles.element}>Pulfy for Business</button>
      <button class={styles.element}>Help Center</button>
      <button class={styles.element}>Career</button>
      <button class={styles.element}>Privacy & Terms</button>
      <button class={styles.element}>Guides</button>
      <button class={styles.element}>Sitemap</button>
    </div>
  );
};

export default Footer;

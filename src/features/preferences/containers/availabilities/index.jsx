import React, { useMemo, useState } from "react";

import SettingsSection from "../../components/settings-section";
import Select from "react-select";
import styles from "./availability.module.scss";

const AvailabilityContainer = ({ defaults, options }) => {
  const [customized, setCustomized] = useState(defaults);
  const handleChange = (value) => {
    let firstVal = value[value.length - 1];
    setCustomized([firstVal]);
  };

  return (
    <SettingsSection
      title="Available Dates"
      description="Select one of your available dates."
    >
      <Select
        options={options}
        value={customized}
        isMulti
        className={styles.select}
        classNamePrefix="rs"
        onChange={handleChange}
        placeholder="Select from Available Dates..."
      />
    </SettingsSection>
  );
};

export default AvailabilityContainer;

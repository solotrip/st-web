import React, { useMemo, useState } from "react";

import SettingsSection from "../../components/settings-section";
import Select from "react-select";
import styles from "./availability.module.scss";

import {useDispatch,useSelector} from "react-redux"
import {selectAvailability} from "../dates/slice"

const AvailabilityContainer = () => {
  const availabilities   = useSelector(state => state.preferences.availabilities.availabilities)
  const selectedAvailability = [useSelector(state =>  state.preferences.availabilities.selectedAvailability)]
  const dispatch = useDispatch()
  //const [customized, setCustomized] = useState(defaults);
  const handleChange = (value) => {
    let lastVal = value[value.length - 1];
    let arrayed= [lastVal];
    dispatch(selectAvailability(lastVal))
    //setCustomized([lastVal]);

    
  
  };

  return (
    <>
    
    <SettingsSection
      title="Available Dates"
      description="Select one of your available dates."
    >
      <Select
        options={availabilities}
        value={selectedAvailability}
        isMulti
        className={styles.select}
        classNamePrefix="rs"
        onChange={handleChange}
        placeholder="Select from Available Dates..."
      />
    </SettingsSection></>
  );
};

export default AvailabilityContainer;

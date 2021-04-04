import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/searchbar";
import InterestList from "../../components/interestlist";

import styles from "./interests.module.scss";

const InterestsContainer = ({ data, placeHolder }) => {
  const [input, setInput] = useState("");
  const [interestListDefault, setInterestListDefault] = useState(data);
  const [interestList, setInterestList] = useState(data);

  const updateInput = async (input) => {
    const filtered = interestListDefault.filter((interest) => {
      return interest.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setInterestList(filtered);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <SearchBar
          input={input}
          onChange={updateInput}
          placeHolder={placeHolder}
        />

        <InterestList interestList={interestList} />
      </div>
    </>
  );
};

export default InterestsContainer;

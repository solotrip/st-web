import React from "react";
import { useSpring, animated, useTransition } from "react-spring";

import { useDispatch, useSelector } from "react-redux";
import { selectTab } from "../navigation/slice";
import { Link } from "react-router-dom";

function MenuItem(propsComp) {
  const {
    text,
    value,
    logo,
    isActive,
    color,
    backgroundColor,
    link,
  } = propsComp;
  const dispatch = useDispatch();
  const transitions = useTransition(isActive, null, {
    from: { opacity: 0, width: 0 },
    enter: { opacity: 1, width: 0 },
    leave: { opacity: 0, width: 0 },
  });

  const { x } = useSpring({
    x: isActive ? 1 : 0,
  });

  const handleSelect = (param) => {
    if (value !== "Preferences") {
      dispatch(selectTab(param));
    } else {
      dispatch(selectTab("Recommendations"));
    }
  };

  return (
    <animated.div
      style={{
        display: "flex",
        alignItems: "center",
        //margin: "0px 10px 0px 0",
        cursor: "pointer",
        //padding: "10px 20px",
        padding: "10px 10px 10px 0px",
        //paddingRight: "0px",
        backgroundColor: x.interpolate({
          range: [0, 1],
          output: ["transparent", backgroundColor],
        }),
        borderRadius: 20,
      }}
      onClick={() => handleSelect(value)}
    >
      {logo}
    </animated.div>
  );
}

export default MenuItem;

import React, { useState, useEffect } from "react";
import styles from "./content.module.scss";
import Recommendation from "./recommendation/index";
import useThemeState from "utils/hooks/use-theme-state";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibmFiZXJrIiwiYSI6ImNrc25sdngyaTFxZHUydm94ZXpuYXp6Y2wifQ.tOkAADvCBh7-SvAYKbQCtA",
});

//var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

/*mapboxgl.accessToken =
  "pk.eyJ1IjoibmFiZXJrIiwiYSI6ImNrc25sdngyaTFxZHUydm94ZXpuYXp6Y2wifQ.tOkAADvCBh7-SvAYKbQCtA";
var map = new mapboxgl.Map({
  container: "YOUR_CONTAINER_ELEMENT_ID",
  style: "mapbox://styles/mapbox/streets-v11",
});

*/

const Content = ({ recommendations, user, mapEnabled = true }) => {
  const [appTheme] = useThemeState();
  //default dark map.
  const [mapboxTheme, setMapboxTheme] = useState(
    "mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol"
  );

  useEffect(() => {
    appTheme == "light"
      ? setMapboxTheme("mapbox://styles/naberk/cksnq0g1q12vb17nzkij49ou6")
      : setMapboxTheme("mapbox://styles/naberk/cksnplg9i2mvi18pgkkuf1fol");
  }, [appTheme]);
  return (
    <div className={styles.mostOuted}>
      <div className={styles.outerWrapperCentered}>
        <div className={styles.wrapperCentered}>
          <div className={styles.rowin}>
            {recommendations.map((recommendation) => {
              return (
                <Recommendation
                  key={`rec-${recommendation.sid}`}
                  recommendation={recommendation}
                  user={user}
                />
              );
            })}
          </div>
        </div>
      </div>
      {mapEnabled && (
        <div className={styles.mapbox}>
          <Map
            style={mapboxTheme}
            containerStyle={{
              height: "100vh",
              width: "100%",
            }}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>
          </Map>
          ;
        </div>
      )}
    </div>
  );
};

export default Content;

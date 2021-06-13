import { Divider } from "antd";
import React from "react";
import PlanetSelect from "./PlanetSelect/PlanetSelect";

const Destination = ({
  planets,
  vehicles,
  onHandleSelectChange,
  onHandleRadioChange,
  selectedPlanets,
}) => {
  return selectedPlanets.map((currentPlanet, i) => {
    return (
      <React.Fragment key={i}>
        <PlanetSelect
          planets={planets}
          currentPlanet={currentPlanet}
          id={i}
          onHandleSelectChange={onHandleSelectChange}
          vehicles={vehicles}
          onHandleRadioChange={onHandleRadioChange}
        />
        <Divider type="vertical" />
      </React.Fragment>
    );
  });
};

export default Destination;

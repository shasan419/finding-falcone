import { Divider } from "antd";
import React from "react";
import Dropdown from "./Dropdown/Dropdown";

const Division = ({
  planets,
  vehicles,
  onHandleSelectChange,
  onHandleRadioChange,
  selectedPlanets,
}) => {
  return selectedPlanets.map((currentPlanet, i) => {
    return (
      <React.Fragment key={i}>
        <Dropdown
          planets={planets}
          value={currentPlanet}
          num={i}
          onHandleSelectChange={onHandleSelectChange}
          vehicles={vehicles}
          onHandleRadioChange={onHandleRadioChange}
        />
        <Divider type="vertical" />
      </React.Fragment>
    );
  });
};

export default Division;

import React from "react";
import { Select, Divider, Space } from "antd";
import VehicleSelect from "./VehicleSelect/VehicleSelect";
import { getLocalItem, isNotEmptyString } from "../../../utils/utils";
const { Option } = Select;

const PlanetSelect = ({
  planets,
  vehicles,
  currentPlanet,
  selectedVehicles,
  id,
  onHandleSelectChange,
  onHandleRadioChange,
}) => {
  let value = "";
  let distance = "";
  if (isNotEmptyString(currentPlanet)) {
    value = getLocalItem("planets").filter((x) => x.name === currentPlanet);
    distance = value[0].distance;
  }
  return (
    <Space direction="vertical">
      <span>{`Destination ${id + 1}`}</span>
      <Divider type="verticle" />
      <Select
        showSearch
        className="select"
        value={currentPlanet ? currentPlanet + " - " + distance : ""}
        onChange={(val) => onHandleSelectChange(val, id)}
        size="large"
      >
        {planets.map((planet, i) => {
          return (
            <Option key={i} value={planet.name}>
              {planet.name} - {planet.distance}
            </Option>
          );
        })}
      </Select>

      {isNotEmptyString(currentPlanet) ? (
        <VehicleSelect
          currentPlanet={value}
          id={id}
          vehicles={vehicles}
          onHandleRadioChange={onHandleRadioChange}
          selectedVehicles={selectedVehicles}
        />
      ) : null}
    </Space>
  );
};

export default PlanetSelect;

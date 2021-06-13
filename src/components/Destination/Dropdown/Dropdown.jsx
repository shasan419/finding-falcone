import React from "react";
import { Select, Divider, Space } from "antd";
import VehicleRadio from "./VehicleRadio/VehicleRadio";
import "./Dropdown.css";

const { Option } = Select;

const Dropdown = ({
  planets,
  vehicles,
  value,
  num,
  onHandleSelectChange,
  onHandleRadioChange,
}) => {
  let val = "";
  if (value !== "") {
    val = JSON.parse(localStorage.getItem("planets")).filter(
      (x) => x.name === value
    );
  }
  return (
    <Space direction="vertical">
      <span>{`Destination ${num + 1}`}</span>
      <Divider type="verticle" />
      <Select
        className="select"
        value={value ? value : ""}
        onChange={(val) => onHandleSelectChange(val, num)}
      >
        {planets.map((planet, i) => {
          return (
            <Option key={i} value={planet.name}>
              {planet.name}
            </Option>
          );
        })}
      </Select>

      {value !== "" ? (
        <VehicleRadio
          value={val}
          num={num}
          vehicles={vehicles}
          onHandleRadioChange={onHandleRadioChange}
        />
      ) : null}
    </Space>
  );
};

export default Dropdown;

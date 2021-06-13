import React from "react";
import { Select, Divider } from "antd";
import "./Dropdown.css";

const { Option } = Select;

const Dropdown = ({ planets, value, num, onHandleChange }) => {
  return (
    <div>
      <span>{`Destination ${num + 1}`}</span>
      <Divider type="verticle" />
      <Select
        className="select"
        value={value ? value : ""}
        onChange={(val) => onHandleChange(val, num)}
      >
        {planets.map((planet, i) => {
          return (
            <Option key={i} value={planet.name}>
              {planet.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default Dropdown;

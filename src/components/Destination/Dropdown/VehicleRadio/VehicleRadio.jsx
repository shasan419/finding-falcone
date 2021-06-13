import React from "react";
import { Radio, Space } from "antd";

const VehicleRadio = ({ value, num, vehicles, onHandleRadioChange }) => {
  return (
    <Radio.Group
      onChange={(e) => onHandleRadioChange(e.target.value, num)}
      className="radio-group"
    >
      <Space direction="vertical">
        {vehicles.map((x, i) => {
          return (
            <Radio
              key={i}
              value={x.name}
              disabled={
                x.max_distance >= value[0].distance && x.total_no > 0
                  ? false
                  : true
              }
            >
              {x.name}
              {`(${x.total_no})`}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default VehicleRadio;

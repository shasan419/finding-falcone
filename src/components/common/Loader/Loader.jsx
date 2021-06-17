import React from "react";
import { Spin } from "antd";

const Loader = ({ text }) => {
  return <Spin size="large" tip={text} />;
};

export default Loader;

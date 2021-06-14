import React from "react";
import { Button } from "antd";

const CommonButton = ({ content, ...rest }) => {
  return <Button {...rest}>{content}</Button>;
};

export default CommonButton;

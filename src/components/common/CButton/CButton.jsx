import React from "react";
import { Button } from "antd";

const CButton = ({ content, ...rest }) => {
  return <Button {...rest}>{content}</Button>;
};

export default CButton;

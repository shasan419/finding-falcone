import React from "react";
import { Link } from "react-router-dom";
import CommonButton from "../../common/CommonButton/CommonButton";

const LinkButton = () => {
  return (
    <Link to={{ pathname: "/" }} style={{ textDecoration: "none" }}>
      <CommonButton content={"Start Again"} type="dashed" />
    </Link>
  );
};

export default LinkButton;

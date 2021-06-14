import React from "react";
import { Link } from "react-router-dom";

const CLink = ({ content, path }) => {
  return (
    <Link to={{ pathname: path }} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
};

export default CLink;

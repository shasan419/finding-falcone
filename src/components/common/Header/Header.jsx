import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import "./Header.css";

const Header = (props) => {
  return (
    <header className="container__header">
      <div className="nav-items">
        <Link to={{ pathname: "/" }} className="Logo">
          <h1 className="logo-text">Finding Falcone</h1>
        </Link>
        <div>
          {props.resetButton}
          <Divider type="vertical" />
          <a href="https://www.geektrust.in/" target="_blank" rel="noreferrer">
            Geek Trust Home
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

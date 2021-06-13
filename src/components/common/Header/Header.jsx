import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  flex-shrink: 0;
  background-color: var(--light-content);
  box-shadow: 0px 0px 2px 1px #c7c5c5;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  @media screen and (max-width: 498px) {
    display: flex;
    flex-direction: column;
  }
`;

const LogoText = styled.h1`
  font-size: 32px;
  color: var(--light-text);
  cursor: pointer;
`;

const Header = (props) => {
  return (
    <HeaderWrapper>
      <NavItems>
        <Link to={{ pathname: "/" }} style={{ textDecoration: "none" }}>
          <LogoText>Finding Falcone</LogoText>
        </Link>
        <div>
          {props.resetButton}
          <Divider type="vertical" />
          <a href="https://www.geektrust.in/" target="_blank" rel="noreferrer">
            Geek Trust Home
          </a>
        </div>
      </NavItems>
    </HeaderWrapper>
  );
};

export default Header;

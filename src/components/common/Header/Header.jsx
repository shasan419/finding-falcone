import React from "react";
import { Divider } from "antd";
import styled from "styled-components";
import CLink from "../CLink/CLink";

const HeaderWrapper = styled.header`
  flex-shrink: 0;
  background-color: var(--content);
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
  font-size: 26px;
  color: var(--text);
  cursor: pointer;
`;

const RedirectText = styled.a`
  color: var(--text);
  cursor: pointer;
`;

const Header = (props) => {
  return (
    <HeaderWrapper>
      <NavItems>
        <CLink content={<LogoText>Finding Falcone!</LogoText>} path={"/"} />
        <div>
          {props.resetButton}
          <Divider type="vertical" />
          <RedirectText
            href="https://www.geektrust.in/"
            target="_blank"
            rel="noreferrer"
          >
            Geek Trust Home
          </RedirectText>
        </div>
      </NavItems>
    </HeaderWrapper>
  );
};

export default Header;

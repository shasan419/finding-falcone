import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  flex-shrink: 0;
  text-align: center;
  padding: 24px;
`;

const Footer = (props) => {
  return (
    <FooterWrapper>
      <span style={{ color: "var(--text)" }}>
        Coding problem - www.geektrust.in/finding-falcone
      </span>
    </FooterWrapper>
  );
};

export default Footer;

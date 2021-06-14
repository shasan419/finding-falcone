import React from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import styled from "styled-components";

const Main = styled.div`
  max-width: 60%;
  width: 96%;
  flex-grow: 1;
  background-color: var(--light-content);
  margin: 24px auto;
  padding: 24px;
  box-shadow: 0px 0px 2px 1px #c7c5c5;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    max-width: 96%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Result = (props) => {
  console.log(props);
  return (
    <Container>
      <Header />
      <Main>
        <p>{props.location.state.result.status}</p>
      </Main>
      <Footer />
    </Container>
  );
};

export default Result;

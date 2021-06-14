import React from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";

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

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d4edda;
  color: #155724;
`;

const FailureContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8d7da;
  color: #721c24;
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 26px;
  margin: 24px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;

const Result = (props) => {
  const { result, timeTaken } = props.location.state;
  return (
    <Container>
      <Header />
      <Main>
        {result.status === "success" ? (
          <>
            <SuccessContent>
              <TextWrapper>
                Success! Congratulations on finding Falcone. <b>King Shan</b> is
                mighty pleased.
              </TextWrapper>
              <TextWrapper>Time taken: {timeTaken}</TextWrapper>
              <TextWrapper>Planet found: {result.planet_name}</TextWrapper>
            </SuccessContent>
            <ButtonWrapper>
              <Link to={{ pathname: "/" }} style={{ textDecoration: "none" }}>
                <Button type="dashed">Start Again</Button>
              </Link>
            </ButtonWrapper>
          </>
        ) : (
          <>
            <FailureContent>
              <TextWrapper>
                Oops.!! The search party has returned empty handed.
              </TextWrapper>
            </FailureContent>
            <ButtonWrapper>
              <Link to={{ pathname: "/" }} style={{ textDecoration: "none" }}>
                <Button type="dashed">Start Again</Button>
              </Link>
            </ButtonWrapper>
          </>
        )}
      </Main>
      <Footer />
    </Container>
  );
};

export default Result;

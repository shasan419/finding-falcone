import React from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import LinkButton from "./LinkButton/LinkButton";
import styled from "styled-components";
import {
  Main,
  Container,
  ButtonWrapper,
  TextWrapper,
} from "../styles/commonStyles";

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
              <LinkButton />
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
              <LinkButton />
            </ButtonWrapper>
          </>
        )}
      </Main>
      <Footer />
    </Container>
  );
};

export default Result;

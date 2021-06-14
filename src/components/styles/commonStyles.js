import styled from "styled-components";

const Main = styled.div`
  max-width: fit-content;
  width: 96%;
  flex-grow: 1;
  background-color: var(--content);
  margin: 24px auto;
  padding: 24px;
  box-shadow: 0px 0px 2px 1px #c7c5c5;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    max-width: 96%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 26px;
  margin: 24px;
  color: var(--text);
`;

export { Main, Container, ButtonWrapper, TextWrapper };

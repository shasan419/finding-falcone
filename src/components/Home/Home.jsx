import React, { Component } from "react";
import Loader from "./Loader/Loader";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import { message } from "antd";
import Destination from "../Destination/Destination";
import CButton from "../common/CButton/CButton";
import styled from "styled-components";
import {
  Main,
  Container,
  ButtonWrapper,
  TextWrapper,
} from "../styles/commonStyles";
import {
  performApiCall,
  updateSelectedArray,
  updateTimeTaken,
} from "../../utils/utils";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
class Home extends Component {
  state = {
    loading: false,
    isShowFind: false,
    planets: [],
    selectedPlanets: ["", "", "", ""],
    vehicles: [],
    selectedVehicles: ["", "", "", ""],
    result: "",
    timeTaken: 0,
    loadingText: "Loading...",
  };

  getPlanets = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/planets", {});
    localStorage.setItem("planets", JSON.stringify(data));
    this.setState({ planets: data, loading: false });
  };

  getVehicles = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/vehicles", {});
    localStorage.setItem("vehicles", JSON.stringify(data));
    this.setState({ vehicles: data, loading: false });
  };

  getToken = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: {},
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    this.setState({ loading: false });
  };

  handleFindFalcone = async () => {
    const { selectedPlanets, selectedVehicles } = this.state;
    this.setState({ loadingText: "Searching...", loading: true });
    const data = await performApiCall("/find", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("token")),
        planet_names: [...selectedPlanets],
        vehicle_names: [...selectedVehicles],
      }),
    });
    this.setState({ result: data, loading: false });
    if (data.error) {
      message.error(data.error);
      this.resetFields();
    } else {
      this.props.history.push("/result", {
        result: data,
        timeTaken: this.state.timeTaken,
      });
    }
  };

  handlePlanetChange = (val, id) => {
    const { selectedPlanets } = this.state;
    const selected = selectedPlanets.map((x, i) => {
      if (i === id) {
        return (x = val);
      }
      return x;
    });
    let planetsFiltered = updateSelectedArray(
      selected,
      JSON.parse(localStorage.getItem("planets")),
      "planets"
    );
    this.setState({
      selectedPlanets: selected,
      planets: planetsFiltered,
    });
  };

  handleVehicleChange = (val, id) => {
    const { selectedVehicles } = this.state;
    const selected = selectedVehicles.map((x, i) => {
      if (i === id) {
        return (x = val);
      }
      return x;
    });
    let vehiclesFiltered = updateSelectedArray(
      selected,
      JSON.parse(localStorage.getItem("vehicles")),
      "vehicles"
    );
    if (selected[3] !== "") {
      this.setState({ isShowFind: true });
    }
    this.setState({
      selectedVehicles: selected,
      vehicles: vehiclesFiltered,
    });
  };

  resetFields = () => {
    this.setState({
      loadingText: "Resetting...",
      selectedPlanets: ["", "", "", ""],
      selectedVehicles: ["", "", "", ""],
    });
    this.getPlanets();
    this.getVehicles();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedVehicles !== prevState.selectedVehicles) {
      const timeTaken = updateTimeTaken(
        this.state.selectedPlanets,
        this.state.selectedVehicles
      );
      this.setState({ timeTaken });
    }
  }

  componentDidMount() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  componentWillUnmount() {
    localStorage.removeItem("planets");
    localStorage.removeItem("vehicles");
    localStorage.removeItem("token");
  }

  render() {
    const {
      planets,
      selectedPlanets,
      loading,
      vehicles,
      timeTaken,
      isShowFind,
      loadingText,
    } = this.state;
    const {
      handlePlanetChange,
      handleVehicleChange,
      resetFields,
      handleFindFalcone,
    } = this;

    return (
      <Container>
        <Header
          resetButton={
            <CButton
              type="dashed"
              onClick={() => resetFields()}
              danger
              content={"Reset"}
            />
          }
        />

        {!loading ? (
          <Main>
            <TextWrapper>Select planets you want to search in:</TextWrapper>
            <ContentWrapper>
              <Destination
                planets={planets}
                vehicles={vehicles}
                onHandleSelectChange={handlePlanetChange}
                onHandleRadioChange={handleVehicleChange}
                selectedPlanets={selectedPlanets}
              />
            </ContentWrapper>
            <TextWrapper>Time taken: {timeTaken}</TextWrapper>
            <ButtonWrapper>
              {isShowFind ? (
                <CButton
                  type="dashed"
                  onClick={() => handleFindFalcone()}
                  loading={loading}
                  content={"Find Falcone!"}
                />
              ) : null}
            </ButtonWrapper>
          </Main>
        ) : (
          <LoaderWrapper>
            <Loader text={loadingText} />
          </LoaderWrapper>
        )}
        <Footer />
      </Container>
    );
  }
}

export default Home;

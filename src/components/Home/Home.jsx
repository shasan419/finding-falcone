import React, { Component } from "react";
import Loader from "../common/Loader/Loader";
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
  isNotEmptyString,
  createArray,
  setLocalItem,
  getLocalItem,
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
    selectedPlanets: createArray(4),
    vehicles: [],
    selectedVehicles: createArray(4),
    result: "",
    timeTaken: 0,
    loadingText: "Loading...",
  };

  getPlanets = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/planets", {});
    setLocalItem("planets", data);
    this.setState({ planets: data, loading: false });
  };

  getVehicles = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/vehicles", {});
    setLocalItem("vehicles", data);
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
    setLocalItem("token", data.token);
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
        token: getLocalItem("token"),
        planet_names: [...selectedPlanets],
        vehicle_names: [...selectedVehicles],
      }),
    });
    this.setState({ result: data, loading: false });
    if (data.error) {
      message.error(data.error);
      this.getToken();
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
    this.handleVehicleChange("", id);
    let planetsFiltered = this.updateSelectedArray(
      selected,
      getLocalItem("planets"),
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
    let vehiclesFiltered = this.updateSelectedArray(
      selected,
      getLocalItem("vehicles"),
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

  updateSelectedArray = (selectedArray, wholeArray, type) => {
    let nameArray = wholeArray.map((x) => {
      return x.name;
    });
    selectedArray.forEach((x) => {
      let index = nameArray.indexOf(x);
      if (index > -1) {
        if (type === "planets") {
          wholeArray.splice(index, 1);
          nameArray.splice(index, 1);
        } else if (type === "vehicles") {
          if (wholeArray[index].total_no > 0) {
            wholeArray[index].total_no -= 1;
          }
        }
      }
    });
    return wholeArray;
  };

  updateTimeTaken = (selectedPlanets, selectedVehicles) => {
    let timeTaken = 0;
    for (let i = 0; i < selectedPlanets.length; i++) {
      if (
        isNotEmptyString(selectedPlanets[i]) &&
        isNotEmptyString(selectedVehicles[i])
      ) {
        let planet = getLocalItem("planets").filter(
          (x) => x.name === selectedPlanets[i]
        );
        let vehicle = getLocalItem("vehicles").filter(
          (x) => x.name === selectedVehicles[i]
        );
        timeTaken += planet[0].distance / vehicle[0].speed;
      }
    }
    return timeTaken;
  };

  resetFields = () => {
    this.setState({
      loadingText: "Resetting...",
      selectedPlanets: createArray(4),
      selectedVehicles: createArray(4),
    });
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedVehicles !== prevState.selectedVehicles) {
      const timeTaken = this.updateTimeTaken(
        this.state.selectedPlanets,
        this.state.selectedVehicles
      );
      //updating time taken to travel
      this.setState({ timeTaken });
    }
  }

  componentDidMount() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  componentWillUnmount() {
    //resetting the response data
    localStorage.removeItem("planets");
    localStorage.removeItem("vehicles");
    localStorage.removeItem("token");
  }

  render() {
    const {
      planets,
      selectedPlanets,
      selectedVehicles,
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
                selectedVehicles={selectedVehicles}
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

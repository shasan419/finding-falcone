import React, { Component } from "react";
import Loader from "../common/Loader/Loader";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import { performApiCall } from "../../utils/utils";
import "./Home.css";
import { Button } from "antd";
import Destination from "../Destination/Destination";

class Home extends Component {
  state = {
    loading: false,
    isFind: false,
    planets: [],
    selectedPlanets: ["", "", "", ""],
    vehicles: [],
    selectedVehicles: ["", "", "", ""],
    token: "",
  };

  getPlanets = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/planets", {});
    localStorage.setItem("planets", JSON.stringify(data));
    // console.log(data);
    this.setState({ planets: data, loading: false });
  };

  getVehicles = async () => {
    this.setState({ loading: true });
    const data = await performApiCall("/vehicles", {});
    localStorage.setItem("vehicles", JSON.stringify(data));
    console.log(data);
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
    // console.log(data);
    this.setState({ token: data, loading: false });
  };

  handlePlanetChange = (val, id) => {
    const { selectedPlanets } = this.state;
    const selected = selectedPlanets.map((x, i) => {
      if (i === id) {
        return (x = val);
      }
      return x;
    });
    let planetsFiltered = this.removeSelectedPlanet(
      selected,
      JSON.parse(localStorage.getItem("planets"))
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
    let vehiclesFiltered = this.removeSelectedVehicle(
      selected,
      JSON.parse(localStorage.getItem("vehicles"))
    );
    this.setState({
      selectedVehicles: selected,
      vehicles: vehiclesFiltered,
    });
  };

  removeSelectedPlanet(selectedArray, wholeArray) {
    let onlyName = wholeArray.map((x) => {
      return x.name;
    });
    selectedArray.forEach((x) => {
      let index = onlyName.indexOf(x);
      if (index > -1) {
        wholeArray.splice(index, 1);
        onlyName.splice(index, 1);
      }
    });
    return wholeArray;
  }

  removeSelectedVehicle(selectedArray, wholeArray) {
    let onlyName = wholeArray.map((x) => {
      return x.name;
    });
    selectedArray.forEach((x) => {
      let index = onlyName.indexOf(x);
      if (index > -1) {
        if (wholeArray[index].total_no > 0) {
          wholeArray[index].total_no -= 1;
        }
        onlyName.splice(index, 1);
      }
    });
    return wholeArray;
  }

  resetFields = () => {
    this.setState({
      selectedPlanets: ["", "", "", ""],
      selectedVehicles: ["", "", "", ""],
    });
    localStorage.removeItem("planets");
    localStorage.removeItem("vehicles");
    this.componentDidMount();
  };

  componentDidMount() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  componentWillUnmount() {
    localStorage.removeItem("planets");
    localStorage.removeItem("vehicles");
  }

  render() {
    const { planets, selectedPlanets, loading, vehicles, isFind } = this.state;
    const { handlePlanetChange, handleVehicleChange, resetFields } = this;

    return (
      <div className="container">
        <Header
          resetButton={
            <Button onClick={() => resetFields()} danger>
              Reset
            </Button>
          }
        />

        {!loading ? (
          <main className="container__main">
            <div className="search-text">
              Select planets you want to search in:
            </div>
            <div className="content">
              <Destination
                planets={planets}
                vehicles={vehicles}
                onHandleSelectChange={handlePlanetChange}
                onHandleRadioChange={handleVehicleChange}
                selectedPlanets={selectedPlanets}
              />
            </div>
            {isFind ? (
              <div className="find-btn">
                <Button>Find Falcone</Button>
              </div>
            ) : null}
          </main>
        ) : (
          <div className="loader">
            <Loader />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default Home;

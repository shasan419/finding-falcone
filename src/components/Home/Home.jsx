import React, { Component } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Loader from "../common/Loader/Loader";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import { performApiCall, removeSelected } from "../../utils/utils";
import "./Home.css";
import { Button, Divider } from "antd";

class Home extends Component {
  state = {
    loading: false,
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
    // console.log(data);
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
    let planetsFiltered = removeSelected(
      selected,
      JSON.parse(localStorage.getItem("planets"))
    );
    this.setState({ selectedPlanets: selected, planets: planetsFiltered });
  };

  componentDidMount() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  componentWillUnmount() {
    localStorage.removeItem("planets");
  }

  render() {
    const { planets, selectedPlanets, loading } = this.state;
    const { handlePlanetChange } = this;

    return (
      <div className="container">
        <Header resetButton={<Button danger>Reset</Button>} />

        {!loading ? (
          <main className="container__main">
            <div className="search-text">
              Select planets you want to search in:
            </div>
            <div className="content">
              {selectedPlanets.map((currentPlanet, i) => {
                return (
                  <React.Fragment key={i}>
                    <Dropdown
                      planets={planets}
                      value={currentPlanet}
                      num={i}
                      onHandleChange={handlePlanetChange}
                    />
                    <Divider type="vertical" />
                  </React.Fragment>
                );
              })}
            </div>
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

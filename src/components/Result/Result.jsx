import React from "react";
import Loader from "../common/Loader/Loader";
import Header from "../common/Header/Header";
import "./Result.css";
import Footer from "../common/Footer/Footer";

const Result = ({ loading }) => {
  return (
    <div className="container">
      <Header />
      <main className="container__main">
        {!loading ? (
          <p>Result</p>
        ) : (
          <div className="loader">
            <Loader />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Result;

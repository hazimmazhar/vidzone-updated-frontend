import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-section">
          <div className="black-overlay text-white">
            <div className="container" style={{ marginTop: "80px" }}>
              <div className="row">
                <div className="col">
                  <img src="/img/logo.png" alt="" className="d-block" />
                  <span style={{ fontSize: "18px", fontWeight: "400" }}>
                    THE BEST MOVIE RENTAL SHOP IN TOWN
                  </span>
                  <div className="mt-4">
                    <h1 className="display-4">Bringing Entertainment</h1>
                    <h1 className="display-4" style={{ fontWeight: "700" }}>
                      to life for you and your family
                    </h1>
                    <Link
                      to="/movies"
                      className="btn btn-lg btn-outline-primary ml-1 mt-4"
                    >
                      Movies <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

import React, { Component } from "react";
import Banner from "./common/banner";

class About extends Component {
  state = {
    bannerImg: "/img/2020-john-wick.jpg",
  };

  render() {
    return (
      <React.Fragment>
        <Banner backgroundImg={this.state.bannerImg} />
        <div className="about">
          <div className="container my-5">
            <div className="row mb-5">
              <div className="col-md-6 p-5">
                <h1>Our Mission</h1>
              </div>
              <div className="col-md-6 p-5">
                <p className="lead ">
                  Our mission is to provide the best services to our customers.
                  <br />
                  We provide our customers with the best quality with a 30 day
                  money back guarantee. This is the first movie rental store in
                  the country and we are proud to announce it.
                  <br />
                  Head to the nearest store today and renrt out your favourite
                  movie.
                </p>
              </div>
              <hr width="50%" />
            </div>

            <h2 className="mt-5 text-center">Image Gallery</h2>
            <div className="row mt-5">
              <div className="col-md-6">
                <img src="/img/hellboy.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-md-6">
                <img src="/img/logan.jpg" className="img-fluid" alt="" />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-4">
                <img src="/img/terminator.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-md-4">
                <img src="/img/black-widow.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-md-4">
                <img src="/img/bloodshot.jpg" className="img-fluid" alt="" />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <img src="/img/darth.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-md-6">
                <img src="/img/extraction.jpg" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;

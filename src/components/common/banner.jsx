import React, { Component } from "react";

class Banner extends Component {
  render() {
    const { backgroundImg } = this.props;

    return (
      <div
        className="banner-section"
        style={{
          background: `url(${backgroundImg} )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
          position: "relative",
        }}
      ></div>
    );
  }
}

export default Banner;

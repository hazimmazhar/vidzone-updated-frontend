import React, { Component } from "react";
import _ from "lodash";

class Card extends Component {
  renderDetail = (item, detail) => {
    if (detail.content) return detail.content(item);
    const data = _.get(item, detail.path);
    return (
      <p className="px-3">
        <strong>{detail.label}</strong> {data}
      </p>
    );
  };

  createKey = (item, detail) => {
    return item._id + (detail.path || detail.key);
  };

  render() {
    const { data, details } = this.props;
    const { REACT_APP_API_URL: imgUrl } = process.env;

    return (
      <React.Fragment>
        <div className="row">
          {data.map((item) => (
            <div key={item._id} className="col-4">
              <div className="card mb-4 pb-4">
                {item.movieImg && (
                  <img
                    className="card-img-top img-fluid"
                    src={imgUrl + "/" + item.movieImg}
                    alt=""
                  />
                )}
                <div className="card-body"></div>
                {details.map((detail) => (
                  <div key={this.createKey(item, detail)}>
                    {this.renderDetail(item, detail)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Card;

{
  /* <tbody>
  {data.map((item) => (
    <tr key={item._id}>
      {columns.map((column) => (
        <td key={this.createKey(item, column)}>
          {this.renderCell(item, column)}
        </td>
      ))}
    </tr>
  ))}
</tbody>; */
}

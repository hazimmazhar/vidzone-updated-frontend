import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveGenre } from "./../services/genreService";
import * as auth from "./../services/authService";

class GenreForm extends Form {
  state = {
    data: { name: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(255).required().label("Name"),
  };

  doSubmit = async () => {
    await saveGenre(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      return (
        <div className="container my-5">
          <h1>Genre Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderButton("Save")}
          </form>
        </div>
      );
    }

    return (
      <div className="container my-5">
        <h1>Not Authorised</h1>
      </div>
    );
  }
}

export default GenreForm;

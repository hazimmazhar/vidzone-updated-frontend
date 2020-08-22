import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies } from "./../services/movieService";
import { getCustomers } from "./../services/customerService";
import { saveReturn } from "./../services/returnService";
import { toast } from "react-toastify";
import * as auth from "../services/authService";

class ReturnForm extends Form {
  state = {
    data: { customerId: "", movieId: "" },
    customers: [],
    movies: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    customerId: Joi.string().required().label("Customer"),
    movieId: Joi.string().required().label("Movie"),
  };

  async populateCustomers() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  async populateMovies() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  async componentDidMount() {
    await this.populateCustomers();
    await this.populateMovies();
  }

  mapToViewModel(rental) {
    return {
      _id: rental._id,
      customerId: rental.customer._id,
      movieId: rental.movie._id,
    };
  }

  doSubmit = async () => {
    try {
      await saveReturn(this.state.data);
      this.props.history.push("/rentals");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Return already processed");
      else if (ex.response && ex.response.status === 404)
        toast.error("Rental not found.");
    }
  };

  render() {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      return (
        <div className="container my-5">
          <h1>Return Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderSelect("customerId", "Customer", this.state.customers)}
            {this.renderSelect("movieId", "Movie", this.state.movies)}
            {this.renderButton("Save")}
          </form>
        </div>
      );
    }

    return (
      <div className="container my-5">
        <h1>Not Authorised</h1>;
      </div>
    );
  }
}

export default ReturnForm;

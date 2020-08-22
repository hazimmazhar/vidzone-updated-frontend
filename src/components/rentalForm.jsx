import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies } from "./../services/movieService";
import { getCustomers } from "./../services/customerService";
import { saveRental } from "./../services/rentalService";
import * as auth from "../services/authService";
import { toast } from "react-toastify";

class RentalForm extends Form {
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
      await saveRental(this.state.data);
      this.props.history.push("/rentals");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Rental already exists");
    }
  };

  render() {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      return (
        <div className="container my-5">
          <h1>Rental Form</h1>
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

export default RentalForm;

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>MovieForm {match.params.id} </h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default MovieForm;

import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Card from "./common/card";

class MoviesCard extends Component {
  details = [
    {
      path: "title",
      content: (movie) => (
        <h3 className="text-center">
          {" "}
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        </h3>
      ),
    },
    { path: "genre.name", label: "Genre: " },
    { path: "numberInStock", label: "Stock: " },
    { path: "dailyRentalRate", label: "Rate: " },
    { path: "cast", label: "Cast: " },
    { path: "description", label: "Description: " },
    { path: "imdbRating", label: "IMDB: " },
  ];

  deleteButton = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger ml-4"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.details.push(this.deleteButton);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Card
        details={this.details}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesCard;

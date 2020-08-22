import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";
import * as auth from "../services/authService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      imdbRating: "",
      cast: "",
      description: "",
      movieImg: null,
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).max(255).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
    imdbRating: Joi.number().required().min(1).max(10).label("IMDB Rating"),
    cast: Joi.string().required().max(300).label("Cast"),
    description: Joi.string().required().max(1024).label("Description"),
    movieImg: Joi.required(),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (!movieId) return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      imdbRating: movie.imdbRating,
      cast: movie.cast,
      description: movie.description,
    };
  }

  doSubmit = async () => {
    const {
      title,
      genreId,
      numberInStock,
      dailyRentalRate,
      imdbRating,
      cast,
      description,
      movieImg,
    } = this.state.data;

    let data = new FormData();
    data.append("title", title);
    data.append("genreId", genreId);
    data.append("numberInStock", numberInStock);
    data.append("dailyRentalRate", dailyRentalRate);
    data.append("imdbRating", imdbRating);
    data.append("cast", cast);
    data.append("description", description);
    data.append("movieImg", movieImg);
    console.log(data);
    try {
      await saveMovie(data);
      this.props.history.push("/movies");
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      return (
        <div className="container my-5">
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderInput("imdbRating", "IMDB Rating")}
            {this.renderInput("cast", "Cast")}
            {this.renderInput("description", "Description")}
            {this.renderFileInput("movieImg", "Movie Thumbnail")}
            {this.renderButton("Save")}
          </form>
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <h1>Not Authorised</h1>
      </div>
    );
  }
}

export default MovieForm;

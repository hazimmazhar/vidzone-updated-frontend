import http from "./httpServices";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndPoint, movie);
  // var fd = new FormData();
  //       const data = this.state.data;
  //       for (var key in data) {
  //           fd.append(key, data[key]);
  //       }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
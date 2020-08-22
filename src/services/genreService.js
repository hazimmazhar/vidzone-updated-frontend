import http from "./httpServices";

const apiEndPoint = "/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}

function GenreUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function saveGenre(genre) {
  return http.post(apiEndPoint, genre);
}

export function deleteGenre(genreId) {
  return http.delete(GenreUrl(genreId));
}

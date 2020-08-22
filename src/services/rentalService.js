import http from "./httpServices";

const apiEndPoint = "/rentals";

function rentalUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getRentals() {
  return http.get(apiEndPoint);
}

export function getRental(rentalId) {
  return http.get(rentalUrl(rentalId));
}

export function saveRental(rental) {
  if (rental._id) {
    const body = { ...rental };
    delete rental._id;
    return http.put(rentalUrl(rental._id), body);
  }

  return http.post(apiEndPoint, rental);
}

export function deleteRental(rentalId) {
  return http.delete(rentalUrl(rentalId));
}

import React, { Component } from "react";
import auth from "../services/authService";
import Table from "./common/table";
import { Link } from "react-router-dom";

class RentalsTable extends Component {
  columns = [
    { path: "customer.name", label: "Customer" },
    { path: "movie.title", label: "Movie" },
    { path: "dateOut", label: "Date of Rentout" },
    { path: "dateReturned", label: "Reurn Date" },
    { path: "rentalFee", label: "Total Fee" },
  ];

  deleteColumn = {
    key: "delete",
    content: (rental) => (
      <button
        onClick={() => this.props.onDelete(rental)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={rentals}
        onSort={onSort}
      />
    );
  }
}

export default RentalsTable;

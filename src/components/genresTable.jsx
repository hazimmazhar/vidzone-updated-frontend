import React, { Component } from "react";
import auth from "../services/authService";
import Table from "./common/table";

class GenresTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (genre) => (
      <button
        onClick={() => this.props.onDelete(genre)}
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
    const { genres, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={genres}
        onSort={onSort}
      />
    );
  }
}

export default GenresTable;

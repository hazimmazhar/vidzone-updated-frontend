import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getRentals, deleteRental } from "./../services/rentalService";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import RentalsTable from "./rentalsTable";

class Rentals extends Component {
  state = {
    rentals: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "customer.name", order: "asc" },
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }

  handleDelete = async (rental) => {
    const originalRentals = this.state.rentals;
    const rentals = originalRentals.filter((r) => r._id !== rental._id);
    this.setState({ rentals: rentals });
    try {
      await deleteRental(rental._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Rental has already been deleted");
      this.setState({ rentals: originalRentals });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      rentals: allRentals,
      searchQuery,
    } = this.state;
    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter((m) =>
        m.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: rentals } = this.getPagedData();

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {user && (
              <React.Fragment>
                <Link to="/rentals/new" className="btn btn-primary mb-2">
                  New Rental
                </Link>
                <Link to="/returns/new" className="btn btn-primary mb-2 ml-2">
                  Return Movie
                </Link>
              </React.Fragment>
            )}
            <p>Showing {totalCount} in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <RentalsTable
              rentals={rentals}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Rentals;

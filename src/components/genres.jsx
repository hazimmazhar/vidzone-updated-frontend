import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import { getGenres, deleteGenre } from "./../services/genreService";
import Pagination from "./common/pagination";
import GenresTable from "./genresTable";
import SearchBox from "./searchBox";

class Genres extends Component {
  state = {
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  handleDelete = async (genre) => {
    const originalGenres = this.state.genres;
    const genres = originalGenres.filter((g) => g._id !== genre._id);
    this.setState({ genres });
    try {
      await deleteGenre(genre._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Genre has already been deleted");
      this.setState({ genres: originalGenres });
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
      genres: allGenres,
      searchQuery,
    } = this.state;

    let filtered = allGenres;
    if (searchQuery)
      filtered = allGenres.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.name], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: genres } = this.getPagedData();

    return (
      <div className="container mt-5">
        {user && (
          <Link to="/genres/new" className="btn btn-primary mb-2">
            New Genre
          </Link>
        )}
        <p>Showing {totalCount} in the database</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <GenresTable
          genres={genres}
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
    );
  }
}

export default Genres;

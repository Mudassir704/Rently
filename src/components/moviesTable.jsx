import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';
import { getCurrnetUser } from '../services/authService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    {path: 'genre.name', label: "Genre"},
    {path: 'numberInStock', label: "Stock"},
    {path: 'dailyRentalRate', label: "Rate"},
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
  ];



  rentColumn = {
    key: 'rent',
    content: movie => (
      <button
        onClick={() => {
          this.props.onRent(movie)}}
        className="btn btn-warning btn-sm"
      >
        Rent
      </button>
    )
  };
  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = getCurrnetUser();
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn);
    if(user && !user.isAdmin)
      this.columns.push(this.rentColumn);
  }

  render() {
    
    const { movies, onSort, sortColumn } = this.props;
    return (
        <Table
          columns={this.columns}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
    );
  }
}

export default MoviesTable;
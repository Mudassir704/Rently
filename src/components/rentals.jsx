import React,{Component} from "react";
import { deleteRent, getRentals, returnRentals } from "../services/rentalServise";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import Table from "./common/table";
import _ from 'lodash';
import { toast } from "react-toastify";
import Loading from "./common/loading";
import { getCurrnetUser } from "../services/authService";


class Rentals extends Component {
  
  state = { 
    sortColumn: { path: 'dateOut', order: 'asc' },
    rentals: [],
    currentPage: 1,
    pageSize: 7,
    isLoading: false,
    rentalLoading: false
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = getCurrnetUser();
    const { data } = await getRentals();
    const rentals = [];
    for(let i in data){
      // console.log(data[i]);
      if(data[i].user._id === user._id)
        rentals.push(data[i])
    }
    this.setState({ rentals });
    this.setState({ isLoading: false });
  }


  return = {
    key: 'rent',
    content: rental => (
      <button
        onClick={() => this.handleReturn(rental)}
        className="btn btn-danger btn-sm"
      >
        {rental.rentalFee === undefined ? "Return" : "Returned"}
      </button>
    )
  };
  deleteCol = {
    key: 'delete',
    content: rental => (
      <button
        disabled={rental.rentalFee === undefined? true : false}
        onClick={() => this.handleDelete(rental)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  columns = [
    {path: 'movie.title', label: "Movie"},
    {path: 'dateOut', label: "Date Out"},
    {path: 'dateReturned', label: "Date Return"},
    {path: 'rentalFee', label: "Rental Fee"},
    this.return,
    this.deleteCol
  ];

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleDelete = async rental => {
    const originalRentals = this.state.rentals;
    const rentals = originalRentals.filter(r => r._id !== rental._id)
    this.setState({ rentals })
    try {
      await deleteRent(rental._id)
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This Rental has already been deleted.')

      this.setState({ rentals: originalRentals })
    }
  }

  handleReturn = async rental => {
    this.setState({ rentalLoading: true });
    try {
      const { data } = await returnRentals(rental.movie._id, rental.user._id);
      const newRental = {...this.state.rentals}
      for(let i in newRental){
        if(newRental[i]._id === data._id){
          newRental[i] = data;
          break;
        }
      }
      console.log(typeof(data.dateOut));
      this.setState({ rentals: newRental })
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
      toast.error('Return Proccessed')
      this.setState({ rentalLoading: false });
    }
    this.setState({ rentalLoading: false });
  }


  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      // selectedGenre,
      // searchQuery,
      rentals
    } = this.state

    // let filtered = rentals
    // if (searchQuery)
    //   filtered = rentals.filter(m =>
    //     m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    //   )
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = rentals.filter(m => m.genre._id === selectedGenre._id)
    const sorted = _.orderBy(rentals, [sortColumn.path], [sortColumn.order])

    const data = paginate(sorted, currentPage, pageSize)

    return { totalCount: rentals.length, data }
  }



  render() {
    const { pageSize, currentPage, isLoading, rentalLoading  } = this.state;
    const { totalCount, data } = this.getPagedData()
    if(isLoading) return <Loading />
    if(data.length === 0)
      return <h3 style={{ 
        "height": "100%",
        "display": "flex",
        "justify-content": "center",
        "alignItems": "center",
        "align-items": "center"
       }}>You don't have rentals{'\n'} Let's try rental with zero rental fee for a Day!!!!</h3>
    return (
      <div>
        {rentalLoading === true ? <Loading /> :
        <Table 
          columns = {this.columns}
          sortColumn={this.state.sortColumn}
          data = {data}
          onSort={this.handleSort}
        />}
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


export default Rentals;

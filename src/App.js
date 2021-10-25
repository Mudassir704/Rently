import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute'
import { ToastContainer } from 'react-toastify';
import { getCurrnetUser } from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Profile from './components/profile';


class App extends Component {
  state = {}

  componentDidMount() {
    const user = getCurrnetUser();
    this.setState({ user });
  }
  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" render={props => <Movies {...props} user={user}/>}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/profile" render={props => <Profile {...props} user={user} />}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrnetUser } from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!getCurrnetUser()) return <Redirect to={{
          pathname: '/login',
          state: { from: props.location } //redirect them to the page they were at
        }}
        />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Helpers
import { validateToken } from '../Utils/Helpers';

// Constants
import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkUserAuth = validateToken(localStorage.getItem(AUTH_USER_TOKEN_KEY));

  return (
    <Route
      {...rest}
      render={props => {
        return checkUserAuth ? (
          <Component {...props} />
        ) : (
          <Navigate
            to="/login"
          />
        );
      }}
    />
  );
};

export default PrivateRoute;

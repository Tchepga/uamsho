import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Provider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/connexion" />
        )
      }
    />
  );
};

export default PrivateRoute;

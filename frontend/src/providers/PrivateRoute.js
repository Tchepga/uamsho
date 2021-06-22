import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Provider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route>
      {...rest}
      render=
      {(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps}></RouteComponent>
        ) : (
          <Redirect to="/connexion" />
        )
      }
    </Route>
  );
};

export default PrivateRoute;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import {isAuth} from "./auth";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    // const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("this", isAuth());

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuth() ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;
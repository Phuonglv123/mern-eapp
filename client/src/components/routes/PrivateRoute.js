import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import AppURL from "./AppURL";
import Auth from "../../services/api/Auth";

export const PrivateRoute = ({component: Component, props, ...rest}) => (
    <Route {...rest} render={p => (
        Auth.isAuthenticated() && Auth.isAuthenticated().role === 'admin'
            ? <Component {...p} {...props}/>
            : <Redirect to={{pathname: AppURL.login(), state: {from: p.location}}}/>
    )}/>
);

import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import AppURL from "./AppURL";
import DashboardScene from "../../scenes/DashboardScene/DashboardScene";
import HomeScene from "../../scenes/HomeScene/HomeScene";
import {PrivateRoute} from "./PrivateRoute";
import LoginScene from "../../scenes/LoginScene/LoginScene";


const routes = [
    {
        path: AppURL.home(),
        exact: true,
        component: HomeScene
    },
    {
        path: AppURL.login(),
        component: LoginScene
    }
];

const privateRoute = [
    {
        path: AppURL.dashboard(),
        component: DashboardScene
    }
]

class AppRoute extends Component {
    render() {
        return (
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route path={route.path} component={route.component} exact={route.exact} key={index}/>
                    ))
                }
                {
                    privateRoute.map((route, index) => (
                        <PrivateRoute path={route.path} component={route.component} exact={route.exact} key={index}/>
                    ))
                }
            </Switch>
        );
    }
}

export default AppRoute;

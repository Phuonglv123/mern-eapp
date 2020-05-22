import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import AppURL from "./AppURL";
import DashboardScene from "../../scenes/DashboardScene/DashboardScene";
import HomeScene from "../../scenes/HomeScene/HomeScene";
import {PrivateRoute} from "./PrivateRoute";
import LoginScene from "../../scenes/LoginScene/LoginScene";
import ManagerCategory from "../../scenes/ManagerCategoryScene/ManagerCategory";
import ManagerProduct from "../../scenes/ManagerProductScene/ManagerProduct";
import LayoutAdmin from "../layout/LayoutAdmin";
import CreateOrUpdateCategoryScene from "../../scenes/ManagerCategoryScene/CreateOrUpdateCategoryScene";
import CreateOrUpdateProductScene from "../../scenes/ManagerProductScene/CreateOrUpdateProductScene";


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
        exact: true,
        component: DashboardScene
    }, {
        path: AppURL.category(),
        exact: true,
        component: ManagerCategory
    }, {
        path: AppURL.product(),
        exact: true,
        component: ManagerProduct
    }, {
        path: AppURL.createOrUpdateCategory('create'),
        component: CreateOrUpdateCategoryScene
    }, {
        path: AppURL.createOrUpdateCategory('update'),
        component: CreateOrUpdateCategoryScene
    }, {
        path: AppURL.createOrUpdateProduct('create'),
        component: CreateOrUpdateProductScene
    }, {
        path: AppURL.createOrUpdateProduct('update'),
        component: CreateOrUpdateProductScene
    }
];


const DefaultAdmin = () => (
    <LayoutAdmin>
        {
            privateRoute.map((route, index) => (
                <PrivateRoute path={route.path} component={route.component} exact={route.exact} key={index}/>
            ))
        }
    </LayoutAdmin>
);

class AppRoute extends Component {
    render() {
        return (
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route path={route.path} component={route.component} exact={route.exact} key={index}/>
                    ))
                }
                <Route component={DefaultAdmin}/>
            </Switch>
        );
    }
}

export default AppRoute;

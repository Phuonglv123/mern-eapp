import React, {Component} from 'react';
import {createBrowserHistory} from "history";
import {Router} from 'react-router-dom';
import AppRoute from "./components/routes/AppRoute";

const myHistory = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <Router history={myHistory}>
                <AppRoute/>
            </Router>
        );
    }
}

export default App;

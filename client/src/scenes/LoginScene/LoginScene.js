import React, {Component} from 'react';
import Auth from "../../services/api/Auth";
import {isElementOfType} from "react-dom/test-utils";

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    clickSubmit = async () => {
        let res = await Auth.login({email: this.state.email, password: this.state.password})
        if (res.errors) {
            console.log(res.errors)
        } else {
            Auth.authenticate(res.payload, () => {
                console.log('next')
            })
        }
        console.log(res)
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        onChange={(e) => {
                            this.setState({email: e.target.value})
                        }}
                        type="email"
                        className="form-control"
                        value={this.state.email}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                        onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}
                        type="password"
                        className="form-control"
                        value={this.state.password}
                    />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </div>
        );
    }
}

export default LoginScene;

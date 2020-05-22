import moment from "moment";
import AppURL from "../../components/routes/AppURL";
import {Modal, notification} from "antd";

export default class BaseAPI {
    setToken(token) {
        this.token = token;
    }

    clone(params) {
        function getDict(obj) {
            let r;
            if (Array.isArray(obj)) {
                r = [];
            } else if (obj === null || obj === undefined || typeof obj !== 'object') {
                return obj;
            } else {
                r = {};
            }

            for (let key in obj) {
                let value = obj[key];
                let v;

                if (value === null || value === undefined) {
                    v = value;
                    // delete obj[key];
                    // continue
                }
                if (Array.isArray(value)) {
                    let arrayValue = [];
                    for (let i of value) {
                        arrayValue.push(getDict(i))
                    }
                    v = arrayValue;
                } else if (typeof value === 'object') {
                    v = getDict(value)
                } else {
                    v = value;
                }

                r[key] = v;
            }
            return r;
        }

        return getDict(params);
    }

    parse(res) {
        function getDict(obj) {
            if (obj === null || obj === undefined) {
                return obj;
            }
            let r;
            if (Array.isArray(obj)) {
                r = [];
            } else {
                r = {};
            }

            for (let key in obj) {
                let value = obj[key];
                let v;

                if (typeof value === 'string') {

                    let m = moment(value, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'HH:mm:ss'], true);
                    if (m.isValid()) {
                        v = m;
                    } else {
                        v = value;
                    }
                } else if (typeof value === "object") {
                    v = getDict(value)
                } else {
                    v = value;
                }

                r[key] = v;
            }
            return r;
        }

        let result = getDict(res);
        return result;
    }

    async apiCall(option: Option) {
        option.method = option.hasOwnProperty('method') ? option.method : 'GET';
        option.params = option.hasOwnProperty('params') ? option.params : null;
        option.redirectOn403 = option.hasOwnProperty('redirectOn403') ? option.redirectOn403 : true;

        try {
            let headers = {
                'Content-type': 'application/json',
            };
            if (this.token) {
                headers['Authorization'] = this.token;
            }
            if (option.headers) {
                headers = Object.assign(headers, option.headers);
            }
            if (headers['Content-type'] === 'application/json') {
                option.params = this.clone(option.params);
            }
            const res = await fetch(`/${option.url}`, {
                method: option.method,
                headers: headers,
                data: option.params,
                validateStatus: status => {
                    return true;
                },
            });
            if (res.status >= 300) {
                // Logg.log(res.data);
                Modal.error({
                    title: 'Error',
                    content: 'Something wrong happen, please contact support',
                });
            } else if (res.status === 401 || res.status === 403) {
                if (option.redirectOn403) {
                    if (!window.location.pathname.startsWith(AppURL.login())) {
                        window.location.href = AppURL.login(window.location.href);
                    }
                }
                return res.data;
                window.location = AppURL.login();
            } else {
                notification.success({
                    message: 'Success',
                    description: 'Action success !',
                    duration: 0.8
                });
                return this.parse(res.data);
            }
        } catch (e) {
            console.log(e);
            return {
                data: null,
                error: {}
            }
        }
    }
}


export type Option = {
    url: string,
    method: string,
    returnRaw: boolean,
    params: Object,
    headers?: Object,
    redirectOn403?: boolean,
}

import axios from 'axios';

class Auth {

    async login(params) {
        const res = await this.apiCall({
            url: 'api/auth/login',
            method: 'POST',
            params: params
        });
        return res;
    }

    isAuthenticated() {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'));
        } else {
            return false;
        }
    }

    authenticate = (data, next) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(data));
            next();
        }
    };


    async apiCall(option: Option & { token: string }) {
        option.method = option.hasOwnProperty('method') ? option.method : 'GET';
        option.params = option.hasOwnProperty('params') ? option.params : null;
        let headers = {
            'Content-type': 'application/json',
        };
        if (option.params && option.params.token) {
            headers['Authorization'] = `Token ${option.params.token}`
        }

        try {
            const res = await axios({
                method: option.method,
                headers: headers,
                url: `${option.url}`,
                data: option.params,
                validateStatus: status => {
                    return true;
                },
            });
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

}

export default new Auth();

import {IS_STAGE} from "./env";

class BaseConfig {
    isDev() {
        return process.env.NODE_ENV === 'development';
    }
}

class ConfigDEV extends BaseConfig {
    API_URL = 'http://admin-api.test.com:8000/v1/';
    RECAPTCHA_KEY = '6LdhPboUAAAAAL3okOS2_NHr5_KoAkbYK9P_g9R5';
    CLIENT_URL = 'http://localhost:3005';
    GOOGLE_SIGNIN_CLIENT_ID = '152024468814-8vaka553pq6uch0h3raoiks1gdv1tnts.apps.googleusercontent.com';
    SOCKET_URL = 'ws://admin-api.test.com:8000/';
    VIEWER_URL = 'https://viewer.pupam.com/view/';
}

class ConfigSTAG extends BaseConfig {
}

class ConfigPROD extends BaseConfig {
}


const Config = process.env.NODE_ENV === 'development' ? IS_STAGE ? new ConfigSTAG() : new ConfigDEV() : new ConfigPROD();
// const config = process.env.NODE_ENV === 'development' ? new ConfigSTAG() : new ConfigPROD();

export default Config;


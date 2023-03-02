import Local from './Local';

/**
 * This is a helper class that places all "knowledge" about doing a fetch() in one place. 
 * Any component that needs to do a fetch() will import this class and call the corresponding method.
 * 
 * All methods call the internal/private _doFetch() method, which does all the work. It returns
 * a "unified" myresponse obj that has four properties:
 *   ok: true if the server response is OK, false otherwise
 *   data: the response data if OK, null otherwise
 *   status: the response status code if the server was reached; 0 otherwise
 *   error: the error message if there was either a server or network error, '' otherwise
 **/

class Api {

    //Login
    static async loginUser(username, password) {
        let body = { username, password };

        return await this._doFetch('/login', 'POST', body);
    }

    //Get all users
    static async getUsers() {
        return await this._doFetch('/users');
    }

    //General GET (for any URL, like /events)
    static async getContent(url) {
        return await this._doFetch(url);
    }


    static async _doFetch(url, method = 'GET', body = null) {
        let options = {
            method,
            headers: {}
        };

        //Add token to headers if it exists in localStorage

        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        let uresponse = { ok: false, data: null, status: 0, error: ''};
        try {
            let response = await fetch(url, options);
            if (response.ok) {
                uresponse.ok = true;
                uresponse.data = await response.json();
                uresponse.status = response.status;
            } else {
                uresponse.status = response.status;
                uresponse.error = response.statusText;
            }
        } catch(err) {
            uresponse.error = err.message;
        }

        return uresponse;
    }
}

export default Api;



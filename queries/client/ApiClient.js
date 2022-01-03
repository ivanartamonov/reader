class ApiClient {
    static _jwt;

    static call(url, options) {
        if (this._jwt) {
            options = {
                headers: {
                    Authorization: 'Bearer ' + this._jwt
                }
            }
        }

        return fetch(url, options).then(response => response.json());
    }
}

export default ApiClient;
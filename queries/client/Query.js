import ApiClient from "./ApiClient";

class Query {
    _url;
    _fields;
    _extra;

    constructor(url) {
        this._url = url;
    }

    select(fields) {
        this._fields = [this._fields, ...fields];
        return this;
    }

    addExtra(extraFields) {
        this._extra = [this._extra, ...extraFields];
        return this;
    }

    fetch(options) {
        const url = new URL(this._url);

        if (this._fields) {
            url.searchParams.append('fields', this._fields.join(','));
        }

        if (this._extra) {
            url.searchParams.append('expand', this._extra.join(','));
        }

        return ApiClient.call(this._url, options);
    }
}

export default Query;
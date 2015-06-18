require('whatwg-fetch');


/**
 * HTTP Request Headers
 */

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};


/**
 * HTTP Response Middlewares
 */

let filters = {
    basic(response) {
        if (response.status != 200)
            throw response.json();

        return response.json();
    },
    authorize(response) {
        headers.Authorization = `Bearer ${ response.token }`;
        return response;
    },
}

/**
 * HTTP Methods Shorthands
 */
function get(url) {
    let method = 'get';
    return fetch(url, {method,headers}).then(filters.basic);
}

function post(url, data) {
    let method = 'post';
    data = JSON.stringify(data);
    return fetch(url, {method,headers,data}).then(filters.basic);
}


/**
 * Expose calls to the rest of the app
 */

export default function () {
    this.set('api', {

        login: async function (body) {
            return await post('/users/login').then(filters.authorize);
        },

        register: async function (data) {
            return await post('/users', data).then(filters.authorize);
        },


        apps: async function () {
            return await get.bind(undefined, '/apps');
        },
        pay: async function (app_id, tok) {
            return await post('/payments', {app_id, tok});
        }
    });
}
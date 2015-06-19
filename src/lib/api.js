require('whatwg-fetch');
let _ = require('lodash');


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

let pipes = {
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
    return fetch(url, {method,headers}).then(pipes.basic);
}

function post(url, body) {
    let method = 'post';
    body = JSON.stringify(body);
    return fetch(url, {method,headers,body}).then(pipes.basic);
}


/**
 * Expose calls to the rest of the app
 */

export default function (app) {
    app.set('api', {

        login: function (body) {
            return post('/users/login', body).then(pipes.authorize);
        },

        register: function (body) {
            return post('/users/register', body).then(pipes.authorize);
        },


        apps: function () {
            return get('/apps').then(function (items) {
           	    let [ appsOff, apps ] = _.partition(items.apps, 'disabled');
                return {
                    apps,
                    appsOff
                };
            })
        },

        pay: function (app_id, tok) {
            return post('/payments', {app_id, tok});
        }
    });
}
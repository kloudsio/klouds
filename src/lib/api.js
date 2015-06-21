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

function jsonPipe(response) {
    let data = response.json();
    if (response.status != 200)
        throw data;
    return data;
}

function authPipe(response) {
    headers.Authorization = `Bearer ${ response.token }`;
    return response;
}


/**
 * HTTP Methods Shorthands
 */

function get(url) {
    let method = 'get';
    return fetch(url, { method, headers }).then(jsonPipe);
}

function post(url, data) {
    let method = 'post';
    data = JSON.stringify(data);
    return fetch(url, { method, headers, data }).then(jsonPipe);
}


/**
 * Expose calls to the rest of the app
 */

export let login = function (data) {
    return post('/users/login', data).then(authPipe);
}

export let register = function (data) {
   return post('/users/register', data).then(authPipe);
}


export let apps = function () {
    return get('/apps').then(function (items) {
   	    let [ appsOff, apps ] = _.partition(items.apps, 'disabled');
        return {
            apps,
            appsOff
        };
   })
}

export let pay = function (app_id, tok) {
   return post('/payments', {app_id, tok});
}
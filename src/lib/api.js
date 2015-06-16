require('whatwg-fetch');

function validate(response) {
    if (response.status != 200)
        throw new Error(response.statusText);

    return response.json();
}


function authorize(response) {
    headers.Authorization = `Bearer ${ response.token }`;
    return response;
}


let fetchApps = async function () {
    return await fetch('/apps', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(validate);
}

let sendLogin = async function (data) {
    let response = await fetch('/users/login', {
        body: JSON.stringify(data),
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(validate).then(authorize);

    if (!response) {
        console.log('response', response);
        return;
    }

    return response;
}

let sendRegister = async function (data) {
    let response =  await fetch('/users', {
        body: JSON.stringify(data),
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(validate);
    return await login(data);

}

let sendPurchase = async function (app_id, token) {
    let data = {
        app_id: app_id,
        tok: token
    };
    return await fetch.post('/payments', {
        body: JSON.stringify(data),
        method: 'post',
        headers,
    }).then(validate);
}

export default { fetchApps, sendLogin, sendRegister, sendPurchase }
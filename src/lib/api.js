require('whatwg-fetch');

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function basicFilter(response) {
    if (response.status != 200)
        throw new Error(response.statusText);

    return response.json();
}


function authorize(response) {
    console.log(`Now Authorized: Bearer ${ response.token }`)
    headers.Authorization = `Bearer ${ response.token }`;
    return response;
}


let fetchApps = async function () {
    return await fetch('/apps', {
        method: 'get',
        headers: {
        }
    }).then(basicFilter);
}

let sendLogin = async function (data) {
    let response = await fetch('/users/login', {
        body: JSON.stringify(data),
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(basicFilter)

    if (!response) {
        console.log('response', response);
        return;
    }
    authorize(response);
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
    }).then(basicFilter);
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
    }).then(basicFilter);
}

export default { fetchApps, sendLogin, sendRegister, sendPurchase }
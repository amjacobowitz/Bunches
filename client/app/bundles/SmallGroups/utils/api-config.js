export const HOST = 'http://localhost://3000';

export function genHTTPOptions(method, data, otherHeaders) {
  method = method.toUpperCase();
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...otherHeaders
  }

  const options = { headers, method };

  if(['PUT', 'POST'].indexOf(method) !== -1) {
    if (headers['Content-Type'] !== 'application/x-www-form-urlencoded') {
      options.body = JSON.stringify(data);
    } else {
      options.body = '';
    }
  }

  return options;
}

export function route(path) {
  if (path.indexOf('/') === 0) {
    const path = `${HOST}${path}`
  }

  return path;
}

export function fetchRequest(url, options) {
  return fetch(url, options)
    .then(isSuccessful)
    .then(getJson)
    .catch((err) => {
      console.error('Error occured: ', err);
      throw err;
    });
}

function ResponseException(response) {
  this.message = 'API response is not ok';
  this.response = response;
}

function isSuccessful(response) {
  debugger
  if(![200, 201, 204].includes(response.status)) {
    throw new ResponseException(response);
  }
  return response;
}

function getJson(response) {
  if(response.status === 204 || (response.status === 201 && response._bodyText === '')) {
    return true;
  } else {
    return response.json();
  }
}

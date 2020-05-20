var fetch = require('node-fetch')
var querystring = require('querystring');

var kratosUrl = process.env.HYDRA_ADMIN_URL
var mockTlsTermination = {}

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

function get(request, token) {
  var url;
  
  if (request != null && request != undefined) {
    url = new URL('/login/requests', kratosUrl);
    url.search = querystring.stringify({['request']: request});
  }
  else {
    url = new URL('/login', kratosUrl);
  }
  
  return fetch(
    url.toString(),
    {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'Cookie': 'csrf_token=' + token,
        ...mockTlsTermination
      }
    }
    )
    .then(function (res) {
      
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function (body) {
          return Promise.reject(new Error(body.error.message))
        })
      }
    
      if (res.headers.get('content-type').startsWith('application/json')) {
        return res.json();
      } else {
        return res;
      }
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
}

function put(request, token, body) {
  const url = new URL('/login', kratosUrl)
  url.search = querystring.stringify({['request']: request})
  
  return fetch(
    // Joins process.env.KRATOS_PUBLIC_URL with the request path
    url.toString(),
    {
      method: 'POST',
      body: body,
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'csrf_token=' + token,
        ...mockTlsTermination
      }
    }
  )
  .then(function (res) {
 
    if (res.status < 200 || res.status > 302) {
      // This will handle any errors that aren't network related (network related errors are handled automatically)
      return (function (body) {
        console.error('An error occurred while making a HTTP request: ', body)
        return Promise.reject(new Error(body.error.message))
      })
    }
      
    return res;
  });
}

var kratos = {
  // Fetches information on a login request.
  getLoginRequest: function (request, token) {
    return get(request, token);
  },
  // Accepts a login request.
  acceptLoginRequest: function (request, token, body) {
    return put(request, token, body);
  }
};

module.exports = kratos;

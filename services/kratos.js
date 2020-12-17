var fetch = require('node-fetch')
var querystring = require('querystring');

var kratosPublicURL = process.env.KRATOS_PUBLIC_URL
var kratosAdminURL = process.env.KRATOS_ADMIN_URL
var mockTlsTermination = {}

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

function logError(error) {
  console.log('error={status: '+error.status+', url: '+error.url+'}');
}

function get(flow, request, cookie, token) {
  var url;
  
  if (request != null && request != undefined) {
    url = new URL(flow + '/flows', kratosPublicURL);
    url.search = querystring.stringify({['id']: request});
  }
  else if (token != null && token != undefined) {
    url = new URL(flow + '/link', kratosPublicURL);
    url.search = querystring.stringify({['token']: token});
  }
  else {
    url = new URL(flow, kratosPublicURL);
  }
  
  return fetch(
    url.toString(),
    {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'Cookie': cookie,
        ...mockTlsTermination
      }
    }
    )
    .then(function (res) {
      
      var contentType = res.headers.get('content-type');
      
      if (res.status < 200 || res.status > 302) {
        // Wrap response in error object and reject
        var error = new Error();
        // The url that caused exception
        error.url = url.toString();
        // The response status
        error.status = res.status;
        // The headers of the response
        error.headers = res.headers;
        // Check the content type and get the body as a promise
        if (contentType != null && contentType.startsWith('application/json')) {
          error.body = res.json();
        }
        else {
          error.body = res.text();
        }
        logError(error);
        return Promise.reject(error);
      }
      else { 
        if (contentType != null && contentType.startsWith('application/json')) {
          return res.json();
        } else {
          return res;
        }
      }
    });
}

function put(flow, request, cookie, body) {
  var url = new URL(flow, kratosPublicURL)
  url.search = querystring.stringify({['flow']: request})
  
  return fetch(
    url.toString(),
    {
      method: 'POST',
      body: body,
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie,
        ...mockTlsTermination
      }
    }
  )
  .then(function (res) {
    
    var contentType = res.headers.get('content-type');
    
    if (res.status < 200 || res.status > 302) {
      // Wrap response in error object and reject
      var error = new Error();
      // The url that caused exception
      error.url = url.toString();
      // The response status
      error.status = res.status;
      // The headers of the response
      error.headers = res.headers;
      // Check the content type and get the body as a promise
      if (contentType != null && contentType.startsWith('application/json')) {
        error.body = res.json();
      }
      else {
        error.body = res.text();
      }
      
      logError(error);
      return Promise.reject(error);
    }
    else { 
      if (contentType!= null && contentType.startsWith('application/json')) {
        return res.json();
      } else {
        return res;
      }
    }
  })
}

var kratos = {
  // Fetches information on a login request.
  getLoginRequest: function (request, csrf) {
    return get('/login', request, 'csrf_token=' + csrf, null);
  },
  // Accepts a login request.
  acceptLoginRequest: function (request, csrf, body) {
    return put('/login', request, 'csrf_token=' + csrf, body);
  },
  // Initiates account recovery flow
  initiateAccountRecoveryFlow: function() {
    return get('/recovery', null, null, null);
  },
  // Fetches information on a recovery request.
  getAccountRecoveryFlow: function(request, csrf) {
    return get('/recovery', request, 'csrf_token=' + csrf, null);
  },
  // Performs account recovery using token
  completeRecoveryFlow: function(request, csrf, body) {
    return put('/recovery/link', request, 'csrf_token=' + csrf, body);
  },
  // Performs account recovery using token
  useRecoveryLink: function(token) {
    return get('/recovery', null, null, token);
  },
  // Fetches information on a settings request.
  getSettingsRequest: function(request, cookie) {
    return get('/settings', request, 'ory_kratos_session=' + cookie, null);
  },
  setNewPasswordRequest: function(request, session, csrf, body) {
    var cookie = 'ory_kratos_session=' + session + '; ' + 'csrf_token=' + csrf;
    return put('/password', request, cookie, body);
  }
};

module.exports = kratos;

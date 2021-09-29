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

function get(uri, params, cookie) {
  var url = new URL(uri, kratosPublicURL);
  
  if (params != null && params != undefined) {
    url.search = querystring.stringify(params);
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
      
      if (res.status < 200 || res.status > 303) {
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

function put(flow, body) {
  var url = new URL(flow, kratosAdminURL)
  
  return fetch(
    url.toString(),
    {
      method: 'PUT',
      body: body,
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
        ...mockTlsTermination
      }
    }
  )
  .then(function (res) {
    
    var contentType = res.headers.get('content-type');
    
    if (res.status < 200 || res.status > 303) {
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

function post(flow, request, cookie, body) {
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
    
    if (res.status < 200 || res.status > 303) {
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
  initiateLoginRequest: function () {
    return get('/self-service/login/browser', null, null);
  },
  // Fetches information on a login request.
  getLoginRequest: function (id, csrf) {
    return get('/self-service/login/flows', {id:id}, csrf);
  },
  // Accepts a login request.
  acceptLoginRequest: function (flow, csrf, body) {
    return post('/self-service/login', flow, csrf, body);
  },
  // Initiates account recovery flow
  initiateAccountRecoveryFlow: function() {
    return get('/self-service/recovery/browser', null, null);
  },
  // Fetches information on a recovery request.
  getAccountRecoveryFlow: function(id, csrf) {
    return get('/self-service/recovery/flows', {id:id}, csrf);
  },
  // Performs account recovery using token
  completeRecoveryFlow: function(flow, csrf, body) {
    return post('/self-service/recovery', flow, csrf, body);
  },
  // Performs account recovery using token
  useRecoveryLink: function(flow, token) {
    return get('/self-service/recovery', {flow:flow,token:token}, null);
  },
  // Fetches information on a settings request.
  getSettingsRequest: function(id, cookie) {
    return get('/self-service/settings/flows', {id:id}, 'ory_kratos_session=' + cookie);
  },
  // Sets new password
  setNewPasswordRequest: function(flow, session, csrf, body) {
    var cookie = 'ory_kratos_session=' + session + '; ' + csrf;
    return post('/self-service/settings', flow, cookie, body);
  },
  // Fetches information about the current session
  getSessionIdentity: function(session) {
    return get('/sessions/whoami', null, 'ory_kratos_session=' + session);
  },
  // Updates an identity (Admin endpoint)
  updateIdentity: function(id, body) {
    return put('/identities/' + id, body);
  }
};

module.exports = kratos;

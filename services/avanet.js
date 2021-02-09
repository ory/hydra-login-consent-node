var fetch = require('node-fetch');
var querystring = require('querystring');

var gatewayUrl = process.env.AVANET_URL;
var mockTlsTermination = {};

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

function logError(error) {
  console.log('error={status: '+error.status+', url: '+error.url+'}');
}

function get(uri, host, subject) {
  var url = new URL(uri, gatewayUrl);
  url.search = querystring.stringify({['host']: host, 'subject': subject});

  return fetch(
    url.toString(),
    {
      method: 'GET',
      redirect: 'manual',
      headers: {
        ...mockTlsTermination
      }
    }
    )
    .then(function (res) {
      if (res.status != 200) {
        // Wrap response in error object and reject
        var error = new Error();
        // The url that caused exception
        error.url = url.toString();
        // The response status
        error.status = res.status;
        // The headers of the response
        error.headers = res.headers;
        // Get the body
        error.body = res.json();
        // Log error and reject
        logError(error);
        return Promise.reject(error);
      }
      else { 
        if (res.headers.get('content-type').startsWith('application/json')) {
          return res.json();
        } else {
          return res;
        }
      }
    });
}

var avanet = {
  // Fetches session attributes for a logged in user
  getSessionAttributes: function (host, subject) {
    return get('/companyusermgmt/v1/session-attributes', host, subject);
  }
};

module.exports = avanet;

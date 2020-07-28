var fetch = require('node-fetch');
var querystring = require('querystring');

var gatewayUrl = process.env.GATEWAY_URL;
var mockTlsTermination = {};

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

var jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzpmNmRjMDRkMi1kY2UyLTQ4YjUtOWQ3Ni0wODY4MDc5OGNhY2YiLCJ0eXAiOiJKV1QifQ.eyJhY3IiOiIwIiwiYXRfaGFzaCI6ImlYOFRnczN5VkhackNLWW1JZTluX1EiLCJhdWQiOlsiOTkwMmFiZDUtNjFhMS00ZjMwLWExMWUtOWM5MTRlNjUxZGFmIl0sImF1dGhfdGltZSI6MTU5NTkxNzg3MCwiZXhwIjoxNjA0NTU3ODc5LCJpYXQiOjE1OTU5MTc4NzksImlpZCI6IjE1ODkxY2ViLTYzNTAtNGU0Yi1hMWRhLTEyMjU1YjU1ZTZlMiIsImlzcyI6Imh0dHBzOi8vZ2F0ZXdheS5rOHMtZGV2LmF2YW1vbml0b3JpbmcuZGV2LyIsImp0aSI6Ijc2MDc5N2NmLWI2MjMtNDM3Mi04MTFjLTY0NzE5ZjEyNGUxOSIsImtzYyI6Ik1UVTVOVGt4TnpnM01IeEVVREpCYUZCWk5sTTFiREZNVGtoWVdHMXhRV0ZKWVZOTGNtZE5aVzVaZG1seVJ6Y3RNWGxuYTJoaFQwaHBkbFJaZDNSZmNYUnhUV05KUXpZMlJVVmthV1ZMUjNoQ1JDMXliaTFMYm5sWGFXZHdaVE5oZVU0d00yZHJWMnhSZVhsUU9WaHhVMkpNY1dkQ1kwRXdWVWRVTVdsRmNtaGhVV1YwV1VwdGNFUmlaSGxuUFQxODVUTV9WTGpPd2tJNW0xd0NIVkloUXJLdWlIS01CNm1oUnRWcDFsZWxJVUE9Iiwibm9uY2UiOiJUbXBRV1hSSE5FaEJiVnBvYldGM2NVTkNURGd3VWpOWmVGcFpjbFJIYms5VVozY3dkbE11U3pReFdFOXIiLCJvaWQiOjEsIm91aSI6MSwicmF0IjoxNTk1OTE3ODMwLCJzaWQiOiI5NmNmZThhMy0yMmZlLTQ5ZTAtYjExZS03YjU1MTIwMmUzZjQiLCJzdWIiOiJqb2huLmRvZUBhY21lLmNvbSJ9.lAoeP1QZypXAYd6A-2LRZRyrVq0-HV9J6dVLIk3fiWJee2iZT9WNuusuhxRi9QWh0aBK3s0mr6gSYxnUOGTpDg1VZCPoqYP8wRUN1QU4K80PuxR3E827KTdObO64G0jgC8vvb6CSqWJnk73Rr05Wib5Pgot3eWLH1Woj92_VYD4N1nJhz1YaEzg1sS09SNa7x_hp0iijb1MjNDqwPsa8KdrtuzkYaS__pS2wM_gjv2P5-BF5BUr3p4mVvJzmbogLcRp00h6XYWrSKbaVDcF4qbpeFGYuZEDHQaNljHgTgDIFl17qcfknq2Jhvy26hAGgSm0e8h-zsJPIWE8vimggucD285QTsM6oUDOo_WDBRZ1PIfb4TO8vP3dMYX30XBTsBPI7rhMHswGxuZ33LyFqfy9M3qWasUZ9bUM5iM54vxuVawG_kiBDlk2Bwi3XyHRrT2HdP7GN5n6aJsO_uM0ONy5Co5OXMkJUXIB9y20OM-csmm-8A3F4apcGGOEdjI1vlimaCgw7FsalLzx9UF6ZuUH7UnuRo7gMhfFxRyHLtwDf_AAuV_VlkMPGev8RvdPY0pQ2oona6PQBgctyGn9tm5olYudSM2EfqjTp8DSQCncw3f3YRoEz2X8iN_4N0w3_9krHun0rse58wYBN5N3lt27G4i2XRyuMnp7uT5a1pgs';

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
        'X-JWT-Assertion': jwt,
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
        //error.body = res.json();
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

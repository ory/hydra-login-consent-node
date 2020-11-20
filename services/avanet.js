var fetch = require('node-fetch');
var querystring = require('querystring');

var gatewayUrl = process.env.GATEWAY_URL;
var mockTlsTermination = {};

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

var jwt = Buffer.from(process.env.SECRET, 'utf8')
//var jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzpmNmRjMDRkMi1kY2UyLTQ4YjUtOWQ3Ni0wODY4MDc5OGNhY2YiLCJ0eXAiOiJKV1QifQ.eyJhY3IiOiIwIiwiYXRfaGFzaCI6IjhkaE5DSzlISnFhamJtNlpNZnpBTXciLCJhdWQiOlsiOTkwMmFiZDUtNjFhMS00ZjMwLWExMWUtOWM5MTRlNjUxZGFmIl0sImF1dGhfdGltZSI6MTYwNDU2NTQ3MSwiZXhwIjoxNjA3MTU3NDcxLCJpYXQiOjE2MDQ1NjU0NzEsImlpZCI6IjE1ODkxY2ViLTYzNTAtNGU0Yi1hMWRhLTEyMjU1YjU1ZTZlMiIsImlzcyI6Imh0dHBzOi8vZ2F0ZXdheS5rOHMtZGV2LmF2YW1vbml0b3JpbmcuZGV2LyIsImp0aSI6IjEwNTc3NWQzLThjZGItNGFmOS05ZTQ0LTAwZmI0MTk5ODViOCIsImtzYyI6Ik1UWXdORFUyTlRRM01YeG9iMk5MZEdWUE5sbGZkUzF5YkdOek5uRlJlRkJmYzJzM1gzbFNVVzl0VEVkbGEwRnZaalpDZURsZlpIcEJWa3hYZVVGU1VYRnNVM052ZFUxNVZqUlJiRFZvVWtKMVpuazROa3BpYm1WbVJGSXhabEJUU0ROdU1UQlBPVmhVTVVkUGVrMXJhVEJqWmxSQlRFbENjVk5uY2pWV1gwSnJkRzlqVUdsV1QzcEdlSEozUFQxOGJmNG5mSUhiaTkxQWUwZENHTzJ3eTd0UGdfYTZOZURYLURiWG5yM0hFY2M9Iiwibm9uY2UiOiJOWEZLZG5sSWFtNVRkVGRZVUVOaVlXMS1mbVJRZUhWTlJsVjZUSGRRZUdSTFdXOTZkRWhmTWtKdVRHdFgiLCJvaWQiOiIxIiwib3VpIjoiMSIsInBpZCI6IiIsInJhdCI6MTYwNDU2NTQ2Nywic2lkIjoiNjc2YmQxNTMtYTU1Mi00ODA2LTgyMzEtOTMxYjQ1MjNlNzA5Iiwic3ViIjoiam9obi5kb2VAYWNtZS5jb20ifQ.iuml0GP-Ws0pZY4_1dKjeaoYVyIAAhiYDfY4hmH_8rFDyKlow1Gn4DbMgU9jkVQfvEdgvmxgVaeGxMAHz3eCb-n7wbSMy3ZMZ40VF8H_rAzJdbym6goV66MO__vH23Tob5fa8Vkd2J-bajoSSf41GxrXUWI9CAfQdGlwxf-C3jcn3Ti_l9PVXNlLPxz6uFOjmOT5dmSPiCLive8FH9coZAHnVMrbijgCadk_ogx6W3BHY889V9IUDBfdA_jM3z93MuHMLbe0rhnzWto1_Qis46Tazha4TN1W1649jb1jSUareW9fA1AAk2xB15QIBv-soDMCTtyIY9iqs-Uz0bxbHRNo-BvhThvqF-arZMlihg9PcP3gQgDskzcB2t1aNznfx5KryQc6VFF0MkAivhn_u3QhdKtUvH6tSpYRjwxycUs-4J0f8LZsEwS4KSYM0ly8pvVOsqotdjD28-FVrFwJiyHIY6hJcN9n_81TKxQyryvoIECkDA3sUm0VD8M50fW6pFG6O9Fy5zwavxKwLMlkehJPjfrfmPNd3yi938kP93nANYrjes4LTwbTtDOmNhLE_5-5r_sDtkJsrpF3mjxlXg0-H7L9Cs87cz_4SE2koMGbq5lfUgXFtWLjnyUgC-oLbBsS3KRB7WzAKyE0AVetvqcKq1p-BYz4LLHhUPzKJjQ'

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

import fetch from 'node-fetch';
import * as querystring from 'querystring';


const hydraUrl = process.env.HYDRA_ADMIN_URL
let mockTlsTermination = {}

if (process.env.MOCK_TLS_TERMINATION) {
  mockTlsTermination = {
    'X-Forwarded-Proto': 'https'
  }
}

// A little helper that takes type (can be "login" or "consent") and a challenge and returns the response from ORY Hydra.
const get = (flow: string, challenge: string) => {
  const url = new URL('/oauth2/auth/requests/' + flow, hydraUrl)
  url.search = querystring.stringify({[flow + '_challenge']: challenge})
  return fetch(
    url.toString(),
    {
      method: 'GET',
      headers: {
        ...mockTlsTermination
      }
    }
    )
    .then((res) => {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function (body) {
          console.error('An error occurred while making a HTTP request: ', body)
          return Promise.reject(new Error(body.error.message))
        })
      }

      return res.json();
    });
}

// A little helper that takes type (can be "login" or "consent"), the action (can be "accept" or "reject") and a challenge and returns the response from ORY Hydra.
const put = (flow: string, action: string, challenge: string, body: any) => {
  const url = new URL('/oauth2/auth/requests/' + flow + '/' + action, hydraUrl)
  url.search = querystring.stringify({[flow + '_challenge']: challenge})
  return fetch(
    // Joins process.env.HYDRA_ADMIN_URL with the request path
    url.toString(),
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...mockTlsTermination
      }
    }
  )
    .then((res) => {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then((body) => {
          console.error('An error occurred while making a HTTP request: ', body)
          return Promise.reject(new Error(body.error.message))
        })
      }

      return res.json();
    });
}

const hydra = {
  // Fetches information on a login request.
  getLoginRequest: (challenge: string) => {
    return get('login', challenge);
  },
  // Accepts a login request.
  acceptLoginRequest: (challenge: string, body: any) => {
    return put('login', 'accept', challenge, body);
  },
  // Rejects a login request.
  rejectLoginRequest: (challenge: string, body: any) => {
    return put('login', 'reject', challenge, body);
  },
  // Fetches information on a consent request.
  getConsentRequest: (challenge: string) => {
    return get('consent', challenge);
  },
  // Accepts a consent request.
  acceptConsentRequest: (challenge: string, body: any) => {
    return put('consent', 'accept', challenge, body);
  },
  // Rejects a consent request.
  rejectConsentRequest: (challenge: string, body: any) => {
    return put('consent', 'reject', challenge, body);
  },
  // Fetches information on a logout request.
  getLogoutRequest: (challenge: string) => {
    return get('logout', challenge);
  },
  // Accepts a logout request.
  acceptLogoutRequest: (challenge: string) => {
    return put('logout', 'accept', challenge, {});
  },
  // Reject a logout request.
  rejectLogoutRequest: (challenge: string) => {
    return put('logout', 'reject', challenge, {});
  },
};

export default hydra;

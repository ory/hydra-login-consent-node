import { AdminApi } from '@oryd/hydra-client'

const hydraAdmin = new AdminApi(process.env.HYDRA_ADMIN_URL)
if (process.env.MOCK_TLS_TERMINATION) {
  let headers = { 'X-Forwarded-Proto': 'https' }
  if (hydraAdmin.defaultHeaders) {
    headers = {
      ...hydraAdmin.defaultHeaders,
      ...headers
    }
  }
  hydraAdmin.defaultHeaders = headers
}

export { hydraAdmin }

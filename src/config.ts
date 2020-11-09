import { AdminApi } from '@oryd/hydra-client'

const hydraAdmin = new AdminApi(process.env.HYDRA_ADMIN_URL)
if (process.env.MOCK_TLS_TERMINATION) {
  hydraAdmin.defaultHeaders['X-Forwarded-Proto'] = 'https'
}

export { hydraAdmin }

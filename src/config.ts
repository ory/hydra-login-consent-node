import { Configuration, V0alpha2Api } from '@ory/client'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

const hydraAdmin = new V0alpha2Api(
  new Configuration({
    accessToken: process.env.PAT,
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions
  })
)

export { hydraAdmin }

import { Configuration, V0alpha2Api } from '@ory/client'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

const configuration = new Configuration({
  basePath: process.env.HYDRA_ADMIN_URL,
  baseOptions
})

if (process.env.ORY_TOKEN) {
  configuration.accessToken = process.env.ORY_PAT
}

const hydraAdmin = new V0alpha2Api(configuration)

export { hydraAdmin }

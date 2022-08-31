import { Configuration, V0alpha2Api } from '@ory/client'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

const configiration = new Configuration({
  basePath: process.env.HYDRA_ADMIN_URL,
  baseOptions
})

if (process.env.ORY_TOKEN) {
  configiration.accessToken = process.env.ORY_TOKEN
}

const hydraAdmin = new V0alpha2Api(configiration)

export { hydraAdmin }

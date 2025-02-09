// Copyright © 2025 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client-fetch"

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { "X-Forwarded-Proto": "https" }
}

const configuration = new Configuration({
  basePath: process.env.HYDRA_ADMIN_URL,
  accessToken: process.env.ORY_API_KEY || process.env.ORY_PAT,
  headers: baseOptions.headers,
})

const hydraAdmin = new OAuth2Api(configuration)

export { hydraAdmin }

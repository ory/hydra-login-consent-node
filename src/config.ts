// Copyright © 2023 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, V0alpha2Api } from "@ory/client"

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { "X-Forwarded-Proto": "https" }
}

const configuration = new Configuration({
  basePath: process.env.HYDRA_ADMIN_URL,
  accessToken: process.env.ORY_API_KEY || process.env.ORY_PAT,
  baseOptions,
})

const hydraAdmin = new V0alpha2Api(configuration)

export { hydraAdmin }

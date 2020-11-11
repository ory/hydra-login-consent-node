import { AdminApi } from '@oryd/hydra-client'

const basePath = process.env.HYDRA_ADMIN_URL
const baseOptions: Record<string, unknown> = {}

if (process.env.MOCK_TLS_TERMINATION)
  baseOptions.headers = {
    'X-Forwarded-Proto': 'https',
  }

export const hydraAdmin = new AdminApi({ basePath, baseOptions })

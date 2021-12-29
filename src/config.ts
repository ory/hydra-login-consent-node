import { AdminApi, Configuration } from '@ory/hydra-client'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions
  })
)
interface User {
  id: string,
  roles: Array<string>,
  given_name: string,
  family_name: string,
  email: string,
  ext: {
    roles: Array<string>
  }
}

const users : Array<User> = [
  {
    id: 'antragsteller1',
    roles: ['user'],
    given_name: 'Max und Maria',
    family_name: 'Mustermann',
    email: 'antragsteller1@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2',
    roles: ['user'],
    given_name: 'Jonathan',
    family_name: 'Doe',
    email: 'antragsteller2@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'bewilligungsstelle',
    roles: ['approver'],
    given_name: 'Sachbearbeiter',
    family_name: '',
    email: 'bewilligungsstelle@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  }
]

export { hydraAdmin, users }

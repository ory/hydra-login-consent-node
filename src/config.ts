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
  user_id: string,
  roles: Array<string>,
  given_name: string,
  family_name: string,
  email: string,
  gpNummer?: string,
  ext: {
    roles: Array<string>,
    gpNummer?: string
  }
}

const users : Array<User> = [
  {
    id: 'antragsteller1',
    user_id: 'antragsteller1',
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
    user_id: 'antragsteller2',
    roles: ['user'],
    given_name: 'Jonathan',
    family_name: 'Doe',
    email: 'antragsteller2@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3',
    user_id: 'antragsteller3',
    roles: ['user'],
    given_name: 'Karolin',
    family_name: 'Pfeifer',
    email: 'antragsteller3@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4',
    user_id: 'antragsteller4',
    roles: ['user'],
    given_name: 'Max',
    family_name: 'Walter',
    email: 'antragsteller4@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller5',
    user_id: 'antragsteller5',
    roles: ['user'],
    given_name: 'Owen',
    family_name: 'White',
    email: 'antragsteller5@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller6',
    user_id: 'antragsteller6',
    roles: ['user'],
    given_name: 'Jake',
    family_name: 'Nash',
    email: 'antragsteller6@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller7',
    user_id: 'antragsteller7',
    roles: ['user'],
    given_name: 'Sam',
    family_name: 'Roberts',
    email: 'antragsteller7@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller8',
    user_id: 'antragsteller8',
    roles: ['user'],
    given_name: 'Rachel',
    family_name: 'Sharp',
    email: 'antragsteller8@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller9',
    user_id: 'antragsteller9',
    roles: ['user'],
    given_name: 'Sally',
    family_name: 'Davies',
    email: 'antragsteller9@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller10',
    user_id: 'antragsteller10',
    roles: ['user'],
    given_name: 'Joanne',
    family_name: 'Campbell',
    email: 'antragsteller10@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller11',
    user_id: 'antragsteller11',
    roles: ['user'],
    given_name: 'Andrew',
    family_name: 'Davidson',
    email: 'antragsteller11@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller12',
    user_id: 'antragsteller12',
    roles: ['user'],
    given_name: 'Kimberly',
    family_name: 'Chapman',
    email: 'antragsteller12@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller13',
    user_id: 'antragsteller13',
    roles: ['user'],
    given_name: 'Brian',
    family_name: 'Hart',
    email: 'antragsteller13@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller14',
    user_id: 'antragsteller14',
    roles: ['user'],
    given_name: 'Jake',
    family_name: 'North',
    email: 'antragsteller14@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller15',
    user_id: 'antragsteller15',
    roles: ['user'],
    given_name: 'Rose',
    family_name: 'Piper',
    email: 'antragsteller15@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller16',
    user_id: 'antragsteller16',
    roles: ['user'],
    given_name: 'Jasmine',
    family_name: 'Langdon',
    email: 'antragsteller16@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller17',
    user_id: 'antragsteller17',
    roles: ['user'],
    given_name: 'Lucas',
    family_name: 'Randall',
    email: 'antragsteller17@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller18',
    user_id: 'antragsteller18',
    roles: ['user'],
    given_name: 'Joshua',
    family_name: 'White',
    email: 'antragsteller18@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller19',
    user_id: 'antragsteller19',
    roles: ['user'],
    given_name: 'Alan',
    family_name: 'Clark',
    email: 'antragsteller19@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller20',
    user_id: 'antragsteller20',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller20@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'bewilligungsstelle',
    user_id: 'bewilligungsstelle',
    roles: ['approver', 'dataadmin'],
    given_name: 'Sach',
    family_name: 'Bearbeiter',
    email: 'bewilligungsstelle@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['approver', 'dataadmin']
    }
  },
  {
    id: 'landratsamt_muenchen',
    user_id: 'landratsamt_muenchen',
    gpNummer: '5000207583',
    roles: ['approver'],
    given_name: 'Landratsamt',
    family_name: 'München (5000207583)',
    email: 'landratsamt_muenchen@quadrio-dev-foerderlotse.de',
    ext: {
      gpNummer: '5000207583',
      roles: ['approver']
    }
  },
  {
    id: 'landratsamt_dachau',
    user_id: 'landratsamt_dachau',
    gpNummer: '5000203233',
    roles: ['approver'],
    given_name: 'Landratsamt',
    family_name: 'Dachau (5000203233)',
    email: 'landratsamt_dachau@quadrio-dev-foerderlotse.de',
    ext: {
      gpNummer: '5000203233',
      roles: ['approver']
    }
  },
  {
    id: 'landratsamt_guenzburg',
    user_id: 'landratsamt_guenzburg',
    gpNummer: '5000203356',
    roles: ['approver'],
    given_name: 'Landratsamt',
    family_name: 'Günzburg (5000203356)',
    email: 'landratsamt_guenzburg@quadrio-dev-foerderlotse.de',
    ext: {
      gpNummer: '5000203356',
      roles: ['approver']
    }
  },
  {
    id: 'landeshauptstadt_muenchen',
    user_id: 'landeshauptstadt_muenchen',
    gpNummer: '5000201921',
    roles: ['approver'],
    given_name: 'Landeshauptstadt',
    family_name: 'München (5000201921)',
    email: 'landeshauptstadt_muenchen@quadrio-dev-foerderlotse.de',
    ext: {
      gpNummer: '5000201921',
      roles: ['approver']
    }
  },
  {
    id: 'landratsamt_rosenheim',
    user_id: 'landratsamt_rosenheim',
    gpNummer: '5000207786',
    roles: ['approver'],
    given_name: 'Landratsamt',
    family_name: 'Rosenheim (5000207786)',
    email: 'landratsamt_rosenheim@quadrio-dev-foerderlotse.de',
    ext: {
      gpNummer: '5000207786',
      roles: ['approver']
    }
  },
  {
    id: 'ministerium',
    user_id: 'ministerium',
    roles: ['authority'],
    given_name: 'Staatsministerium',
    family_name: 'Bau',
    email: 'ministerium@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['authority']
    }
  }
]

export { hydraAdmin, users }

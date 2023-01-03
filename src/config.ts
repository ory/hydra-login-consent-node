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
  salutation: string,
  user_id: string,
  roles: Array<string>,
  given_name: string,
  family_name: string,
  phone?: string,
  email: string,
  bpNumber?: string,
  ext: {
    roles: Array<string>,
    bpNumber?: string
  }
}

const users: Array<User> = [
  {
    id: 'antragsteller1',
    user_id: 'antragsteller1',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Max und Maria',
    family_name: 'Mustermann',
    phone: '123456789',
    email: 'antragsteller1@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2',
    user_id: 'antragsteller2',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Jonathan',
    family_name: 'Doe',
    phone: '589437439821',
    email: 'antragsteller2@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3',
    user_id: 'antragsteller3',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Karolin',
    family_name: 'Pfeifer',
    phone: '9857430988',
    email: 'antragsteller3@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4',
    user_id: 'antragsteller4',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Max',
    family_name: 'Walter',
    phone: '123456789',
    email: 'antragsteller4@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller5',
    user_id: 'antragsteller5',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Owen',
    family_name: 'White',
    phone: '123456789',
    email: 'antragsteller5@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller6',
    user_id: 'antragsteller6',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Jake',
    family_name: 'Nash',
    phone: '123456789',
    email: 'antragsteller6@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller7',
    user_id: 'antragsteller7',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Sam',
    family_name: 'Roberts',
    phone: '123456789',
    email: 'antragsteller7@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller8',
    user_id: 'antragsteller8',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Rachel',
    family_name: 'Sharp',
    phone: '123456789',
    email: 'antragsteller8@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller9',
    user_id: 'antragsteller9',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Sally',
    family_name: 'Davies',
    phone: '123456789',
    email: 'antragsteller9@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller10',
    user_id: 'antragsteller10',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Joanne',
    family_name: 'Campbell',
    phone: '123456789',
    email: 'antragsteller10@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller11',
    user_id: 'antragsteller11',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Andrew',
    family_name: 'Davidson',
    phone: '123456789',
    email: 'antragsteller11@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller12',
    user_id: 'antragsteller12',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Kimberly',
    family_name: 'Chapman',
    phone: '123456789',
    email: 'antragsteller12@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller13',
    user_id: 'antragsteller13',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Brian',
    family_name: 'Hart',
    phone: '123456789',
    email: 'antragsteller13@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller14',
    user_id: 'antragsteller14',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Jake',
    family_name: 'North',
    phone: '123456789',
    email: 'antragsteller14@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller15',
    user_id: 'antragsteller15',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Rose',
    family_name: 'Piper',
    phone: '123456789',
    email: 'antragsteller15@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller16',
    user_id: 'antragsteller16',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Jasmine',
    family_name: 'Langdon',
    phone: '123456789',
    email: 'antragsteller16@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller17',
    user_id: 'antragsteller17',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Lucas',
    family_name: 'Randall',
    phone: '123456789',
    email: 'antragsteller17@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller18',
    user_id: 'antragsteller18',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Joshua',
    family_name: 'White',
    phone: '123456789',
    email: 'antragsteller18@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller19',
    user_id: 'antragsteller19',
    salutation: "Herr",
    roles: ['user'],
    given_name: 'Alan',
    family_name: 'Clark',
    phone: '123456789',
    email: 'antragsteller19@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller20',
    user_id: 'antragsteller20',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller20@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'ministerium',
    user_id: 'ministerium',
    salutation: "Herr",
    roles: ['authority'],
    given_name: 'Bau',
    family_name: 'Ministerium',
    phone: '123456789',
    email: 'ministerium@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['authority']
    }
  },
  {
    id: 'bewilligungsstelle',
    user_id: 'bewilligungsstelle',
    salutation: "Herr",
    bpNumber: '5000207564',
    roles: ['approver', 'dataadmin'],
    given_name: 'Sach',
    family_name: 'Bearbeiter',
    phone: '123456789',
    email: 'bewilligungsstelle@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['approver', 'dataadmin'],
      bpNumber: '5000207564'
    }
  },
  {
    id: 'kommune',
    user_id: 'kommune',
    salutation: "Herr",
    bpNumber: '5000203475',
    roles: ['commune'],
    given_name: 'Sach',
    family_name: 'Bearbeiter',
    phone: '123456789',
    email: 'kommune@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['commune'],
      bpNumber: '5000203475'
    }
  },
  {
    id: 'mieter',
    user_id: 'landlord',
    salutation: "Herr",
    bpNumber: '5000203475',
    roles: ['commune'],
    given_name: 'Sach',
    family_name: 'Bearbeiter',
    phone: '123456789',
    email: 'landlord@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['landlord'],
      bpNumber: '5000203475'
    }
  },
  {
    id: 'ute.boex@lra-bt.bayern.de',
    user_id: 'ute.boex@lra-bt.bayern.de',
    salutation: "Frau",
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Ute',
    family_name: 'Böx',
    phone: '123456789',
    email: 'ute.boex@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 'c-siegling@lra-fue.bayern.de',
    user_id: 'c-siegling@lra-fue.bayern.de',
    salutation: "Herr",
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Christian',
    family_name: 'Siegling',
    phone: '123456789',
    email: 'c-siegling@lra-fue.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 'l-wiegel@lra-fue.bayern.de',
    user_id: 'l-wiegel@lra-fue.bayern.de',
    bpNumber: '5000203204',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Lydia',
    family_name: 'Wiegel',
    phone: '123456789',
    email: 'l-wiegel@lra-fue.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 't-nicklas@lra-fue.bayern.de',
    user_id: 't-nicklas@lra-fue.bayern.de',
    salutation: "Herr",
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Thomas',
    family_name: 'Nicklas',
    phone: '123456789',
    email: 't-nicklas@lra-fue.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 'monika.stiel@stadt.nuernberg.de',
    user_id: 'monika.stiel@stadt.nuernberg.de',
    salutation: "Frau",
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Monika',
    family_name: 'Stiel',
    phone: '123456789',
    email: 'monika.stiel@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'eberhard.mathes@stadt.nuernberg.de',
    user_id: 'eberhard.mathes@stadt.nuernberg.de',
    salutation: "Herr",
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Eberhard',
    family_name: 'Mathes',
    phone: '123456789',
    email: 'eberhard.mathes@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'thomas.baumgaertel@stadt.nuernberg.de',
    user_id: 'thomas.baumgaertel@stadt.nuernberg.de',
    salutation: "Herr",
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Thomas',
    family_name: 'Baumgärtel',
    phone: '123456789',
    email: 'thomas.baumgaertel@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'beate.schreiner@stadt.nuernberg.de',
    user_id: 'beate.schreiner@stadt.nuernberg.de',
    bpNumber: '5000202012',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Beate',
    family_name: 'Schreiner',
    phone: '123456789',
    email: 'beate.schreiner@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'elisabeth.wiche@lra-bt.bayern.de',
    user_id: 'elisabeth.wiche@lra-bt.bayern.de',
    bpNumber: '5000203139',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Elisabeth',
    family_name: 'Wiche',
    phone: '123456789',
    email: 'elisabeth.wiche@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: 'gaby.beck@lra-bt.bayern.de',
    user_id: 'gaby.beck@lra-bt.bayern.de',
    salutation: "Frau",
    bpNumber: '5000203139',
    roles: ['approver'],
    given_name: 'Gaby',
    family_name: 'Beck',
    phone: '123456789',
    email: 'gaby.beck@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: 'j.-michael.schulist@lra-bt.bayern.de',
    user_id: 'j.-michael.schulist@lra-bt.bayern.de',
    salutation: "Herr",
    bpNumber: '5000203139',
    roles: ['approver'],
    given_name: 'Michael',
    family_name: 'Schulist',
    phone: '123456789',
    email: 'j.-michael.schulist@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: 'bernd.nelkel@landkreis-hof.de',
    user_id: 'bernd.nelkel@landkreis-hof.de',
    bpNumber: '5000203447',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bernd',
    family_name: 'Nelkel',
    phone: '123456789',
    email: 'bernd.nelkel@landkreis-hof.de',
    ext: {
      bpNumber: '5000203447',
      roles: ['approver']
    }
  },
  {
    id: 'emily.schmidt@landkreis-hof.de',
    user_id: 'emily.schmidt@landkreis-hof.de',
    bpNumber: '5000203447',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Emily',
    family_name: 'Schmidt',
    phone: '123456789',
    email: 'emily.schmidt@landkreis-hof.de',
    ext: {
      bpNumber: '5000203447',
      roles: ['approver']
    }
  },
  {
    id: 'bettina.gruber@lra.landkreis-cham.de',
    user_id: 'bettina.gruber@lra.landkreis-cham.de',
    bpNumber: '5000203170',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Bettina',
    family_name: 'Gruber',
    phone: '123456789',
    email: 'bettina.gruber@lra.landkreis-cham.de',
    ext: {
      bpNumber: '5000203170',
      roles: ['approver']
    }
  },
  {
    id: 'eike.balzar@augsburg.de',
    user_id: 'eike.balzar@augsburg.de',
    bpNumber: '5000028503',
    roles: ['approver'],
    salutation: "Herr",
    given_name: 'Heribert',
    family_name: 'Weigant',
    phone: '123456789',
    email: 'eike.balzar@augsburg.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: 'antje.resch@augsburg.de',
    user_id: 'antje.resch@augsburg.de',
    salutation: "Frau",
    bpNumber: '5000028503',
    roles: ['approver'],
    given_name: 'Antje',
    family_name: 'Resch',
    phone: '123456789',
    email: 'antje.resch@augsburg.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: 'heribert.weigant@augsburg.de',
    user_id: 'heribert.weigant@augsburg.de',
    bpNumber: '5000028503',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Eike',
    family_name: 'Balzar',
    phone: '123456789',
    email: 'heribert.weigant@augsburg.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: 'ilse.kowalke@lra-donau-ries.de',
    user_id: 'ilse.kowalke@lra-donau-ries.de',
    bpNumber: '5000203342',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Ilse',
    family_name: 'Kowalke',
    phone: '123456789',
    email: 'ilse.kowalke@lra-donau-ries.de',
    ext: {
      bpNumber: '5000203342',
      roles: ['approver']
    }
  },
  {
    id: 'anna.maier@lra-donau-ries.de',
    user_id: 'anna.maier@lra-donau-ries.de',
    bpNumber: '5000203342',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Anna',
    family_name: 'Maier',
    phone: '123456789',
    email: 'anna.maier@lra-donau-ries.de',
    ext: {
      bpNumber: '5000203342',
      roles: ['approver']
    }
  },
  {
    id: 'Cornelia.Christ@lramsp.de',
    user_id: 'Cornelia.Christ@lramsp.de',
    bpNumber: '5000203475',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Christ',
    family_name: 'Cornelia',
    phone: '123456789',
    email: 'Cornelia.Christ@lramsp.de',
    ext: {
      bpNumber: '5000203475',
      roles: ['approver']
    }
  },
  {
    id: 'Tanja.Reder@lramsp.de',
    user_id: 'Tanja.Reder@lramsp.de',
    bpNumber: '5000203475',
    salutation: "Frau",
    roles: ['approver'],
    given_name: 'Tanja',
    family_name: 'Reder',
    phone: '123456789',
    email: 'Tanja.Reder@lramsp.de',
    ext: {
      bpNumber: '5000203475',
      roles: ['approver']
    }
  },
  {
    id: 'Stefan.Schwab@lramsp.de',
    user_id: 'Stefan.Schwab@lramsp.de',
    bpNumber: '5000203475',
    roles: ['approver'],
    salutation: "Herr",
    given_name: 'Stefan',
    family_name: 'Schwab',
    phone: '123456789',
    email: 'Stefan.Schwab@lramsp.de',
    ext: {
      bpNumber: '5000203475',
      roles: ['approver']
    }
  },
  {
    id: 'karin.hiller@kitzingen.de',
    user_id: 'karin.hiller@kitzingen.de',
    bpNumber: '5000207564',
    roles: ['approver'],
    salutation: "Frau",
    given_name: 'Karin',
    family_name: 'Hiller',
    phone: '123456789',
    email: 'karin.hiller@kitzingen.de',
    ext: {
      bpNumber: '5000207564',
      roles: ['approver']
    }
  },
  {
    id: '5000203204@bayernlabo.de',
    user_id: '5000203204@bayernlabo.de',
    bpNumber: '5000203204',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203204',
    phone: '123456789',
    email: '5000203204@bayernlabo.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: '5000202012@bayernlabo.de',
    user_id: '5000202012@bayernlabo.de',
    bpNumber: '5000202012',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000202012',
    phone: '123456789',
    email: '5000202012@bayernlabo.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: '5000203139@bayernlabo.de',
    user_id: '5000203139@bayernlabo.de',
    bpNumber: '5000203139',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203139',
    phone: '123456789',
    email: '5000203139@bayernlabo.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: '5000203447@bayernlabo.de',
    user_id: '5000203447@bayernlabo.de',
    salutation: "Herr",
    bpNumber: '5000203447',
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203447',
    phone: '123456789',
    email: '5000203447@bayernlabo.de',
    ext: {
      bpNumber: '5000203447',
      roles: ['approver']
    }
  },
  {
    id: '5000203170@bayernlabo.de',
    user_id: '5000203170@bayernlabo.de',
    bpNumber: '5000203170',
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    salutation: "Herr",
    family_name: '5000203170',
    phone: '123456789',
    email: '5000203170@bayernlabo.de',
    ext: {
      bpNumber: '5000203170',
      roles: ['approver']
    }
  },
  {
    id: '5000028503@bayernlabo.de',
    user_id: '5000028503@bayernlabo.de',
    bpNumber: '5000028503',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000028503',
    phone: '123456789',
    email: '5000028503@bayernlabo.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: '5000203342@bayernlabo.de',
    user_id: '5000203342@bayernlabo.de',
    salutation: "Herr",
    bpNumber: '5000203342',
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203342',
    phone: '123456789',
    email: '5000203342@bayernlabo.de',
    ext: {
      bpNumber: '5000203342',
      roles: ['approver']
    }
  },
  {
    id: '5000203475@bayernlabo.de',
    user_id: '5000203475@bayernlabo.de',
    bpNumber: '5000203475',
    salutation: "Herr",
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203475',
    phone: '123456789',
    email: '5000203475@bayernlabo.de',
    ext: {
      bpNumber: '5000203475',
      roles: ['approver']
    }
  },
  {
    id: '5000207564@bayernlabo.de',
    user_id: '5000207564@bayernlabo.de',
    bpNumber: '5000207564',
    roles: ['approver'],
    salutation: "Herr",
    given_name: 'Bewilligungsstelle',
    family_name: '5000207564',
    phone: '123456789',
    email: '5000207564@bayernlabo.de',
    ext: {
      bpNumber: '5000207564',
      roles: ['approver']
    }
  },
  {
    id: 'renate.wagner@lra-aoe.de',
    user_id: 'renate.wagner@lra-aoe.de',
    bpNumber: '5000202986',
    roles: ['approver'],
    salutation: "Frau",
    given_name: 'Renate',
    family_name: 'Wagner',
    phone: '08671502214',
    email: 'renate.wagner@lra-aoe.de',
    ext: {
      bpNumber: '5000202986',
      roles: ['approver']
    }
  },
  {
    id: 'martina.klement@lra-aoe.de',
    user_id: 'martina.klement@lra-aoe.de',
    bpNumber: '5000202986',
    roles: ['approver'],
    salutation: "Frau",
    given_name: 'Martina',
    family_name: 'Klement',
    phone: '08671502216',
    email: 'martina.klement@lra-aoe.de',
    ext: {
      bpNumber: '5000202986',
      roles: ['approver']
    }
  },
  {
    id: '5000202986@test.de',
    user_id: '5000202986@test.de',
    bpNumber: '5000202986',
    roles: ['approver'],
    salutation: "Frau",
    given_name: 'Bewilligungsstelle',
    family_name: '5000202986',
    phone: '12345678',
    email: '5000202986@test.de',
    ext: {
      bpNumber: '5000202986',
      roles: ['approver']
    }
  },
  {
    id: 'bernhard.loderer@bayernlabo.de',
    user_id: 'bernhard.loderer@bayernlabo.de',
    roles: ['user'],
    given_name: 'Bernhard',
    salutation: "Herr",
    family_name: 'Loderer',
    phone: '123456789',
    email: 'bernhard.loderer@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'michael.grimmer@bayernlabo.de',
    user_id: 'michael.grimmer@bayernlabo.de',
    roles: ['user'],
    salutation: "Herr",
    given_name: 'Michael',
    family_name: 'Grimmer',
    phone: '123456789',
    email: 'michael.grimmer@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'benjamin.rogg@bayernlabo.de',
    user_id: 'benjamin.rogg@bayernlabo.de',
    roles: ['user'],
    salutation: "Herr",
    given_name: 'Benjamin',
    family_name: 'Rogg',
    phone: '123456789',
    email: 'benjamin.rogg@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'benjamin.friesen@bayernlabo.de',
    user_id: 'benjamin.friesen@bayernlabo.de',
    roles: ['user'],
    given_name: 'Benjamin',
    salutation: "Herr",
    family_name: 'Friesen',
    phone: '123456789',
    email: 'benjamin.friesen@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'yvonne.buergel@bayernlabo.de',
    user_id: 'yvonne.buergel@bayernlabo.de',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Yvonne',
    family_name: 'Buergel',
    phone: '123456789',
    email: 'yvonne.buergel@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-fue.bayern.de',
    user_id: 'antragsteller1@lra-fue.bayern.de',
    salutation: "Frau",
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-fue.bayern.de',
    user_id: 'antragsteller2@lra-fue.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lra-fue.bayern.de',
    user_id: 'antragsteller3@lra-fue.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller3@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@stadt.nuernberg.de',
    user_id: 'antragsteller1@stadt.nuernberg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@stadt.nuernberg.de',
    user_id: 'antragsteller2@stadt.nuernberg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@stadt.nuernberg.de',
    user_id: 'antragsteller3@stadt.nuernberg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller3@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4@stadt.nuernberg.de',
    user_id: 'antragsteller4@stadt.nuernberg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller4@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-bt.bayern.de',
    user_id: 'antragsteller1@lra-bt.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-bt.bayern.de',
    user_id: 'antragsteller2@lra-bt.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lra-bt.bayern.de',
    user_id: 'antragsteller3@lra-bt.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller3@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@landkreis-hof.de',
    user_id: 'antragsteller1@landkreis-hof.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@landkreis-hof.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@landkreis-hof.de',
    user_id: 'antragsteller2@landkreis-hof.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@landkreis-hof.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra.landkreis-cham.de',
    user_id: 'antragsteller1@lra.landkreis-cham.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lra.landkreis-cham.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@augsburg.de',
    user_id: 'antragsteller1@augsburg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@augsburg.de',
    user_id: 'antragsteller2@augsburg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@augsburg.de',
    user_id: 'antragsteller3@augsburg.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller3@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-donau-ries.de',
    user_id: 'antragsteller1@lra-donau-ries.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lra-donau-ries.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-donau-ries.de',
    user_id: 'antragsteller2@lra-donau-ries.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@lra-donau-ries.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lramsp.de',
    user_id: 'antragsteller1@lramsp.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lramsp.de',
    user_id: 'antragsteller2@lramsp.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller2@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lramsp.de',
    user_id: 'antragsteller3@lramsp.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller3@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@kitzingen.de',
    user_id: 'antragsteller1@kitzingen.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@kitzingen.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-aoe.de',
    user_id: 'antragsteller1@lra-aoe.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller1@lra-aoe.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-aoe.de',
    user_id: 'antragsteller2@lra-aoe.de',
    roles: ['user'],
    salutation: "Herr",
    given_name: 'Martin',
    family_name: 'Wunderlich',
    phone: '123456789',
    email: 'antragsteller2@lra-aoe.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4@lra-bt.bayern.de',
    user_id: 'antragsteller4@lra-bt.bayern.de',
    roles: ['user'],
    salutation: "Frau",
    given_name: 'Bernadette',
    family_name: 'Watson',
    phone: '123456789',
    email: 'antragsteller4@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  }
]

export { hydraAdmin, users }

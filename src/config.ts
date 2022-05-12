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
    id: 'ministerium',
    user_id: 'ministerium',
    roles: ['user'],
    given_name: 'Bau',
    family_name: 'Ministerium',
    email: 'ministerium@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['authority']
    }
  },
  {
    id: 'bewilligungsstelle',
    user_id: 'bewilligungsstelle',
    bpNumber: '5000207564',
    roles: ['approver', 'dataadmin'],
    given_name: 'Sach',
    family_name: 'Bearbeiter',
    email: 'bewilligungsstelle@quadrio-dev-foerderlotse.de',
    ext: {
      roles: ['approver', 'dataadmin'],
      bpNumber: '5000207564'
    }
  },
  {
    id: 'ute.boex@lra-bt.bayern.de',
    user_id: 'ute.boex@lra-bt.bayern.de',
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Ute',
    family_name: 'Böx',
    email: 'ute.boex@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 'c-siegling@lra-fue.bayern.de',
    user_id: 'c-siegling@lra-fue.bayern.de',
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Christian',
    family_name: 'Siegling',
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
    roles: ['approver'],
    given_name: 'Lydia',
    family_name: 'Wiegel',
    email: 'l-wiegel@lra-fue.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 't-nicklas@lra-fue.bayern.de',
    user_id: 't-nicklas@lra-fue.bayern.de',
    bpNumber: '5000203204',
    roles: ['approver'],
    given_name: 'Thomas',
    family_name: 'Nicklas',
    email: 't-nicklas@lra-fue.bayern.de',
    ext: {
      bpNumber: '5000203204',
      roles: ['approver']
    }
  },
  {
    id: 'monika.stiel@stadt.nuernberg.de',
    user_id: 'monika.stiel@stadt.nuernberg.de',
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Monika',
    family_name: 'Stiel',
    email: 'monika.stiel@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'eberhard.mathes@stadt.nuernberg.de',
    user_id: 'eberhard.mathes@stadt.nuernberg.de',
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Eberhard',
    family_name: 'Mathes',
    email: 'eberhard.mathes@stadt.nuernberg.de',
    ext: {
      bpNumber: '5000202012',
      roles: ['approver']
    }
  },
  {
    id: 'thomas.baumgaertel@stadt.nuernberg.de',
    user_id: 'thomas.baumgaertel@stadt.nuernberg.de',
    bpNumber: '5000202012',
    roles: ['approver'],
    given_name: 'Thomas',
    family_name: 'Baumgärtel',
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
    roles: ['approver'],
    given_name: 'Beate',
    family_name: 'Schreiner',
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
    roles: ['approver'],
    given_name: 'Elisabeth',
    family_name: 'Wiche',
    email: 'elisabeth.wiche@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: 'gaby.beck@lra-bt.bayern.de',
    user_id: 'gaby.beck@lra-bt.bayern.de',
    bpNumber: '5000203139',
    roles: ['approver'],
    given_name: 'Gaby',
    family_name: 'Beck',
    email: 'gaby.beck@lra-bt.bayern.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: 'j.-michael.schulist@lra-bt.bayern.de',
    user_id: 'j.-michael.schulist@lra-bt.bayern.de',
    bpNumber: '5000203139',
    roles: ['approver'],
    given_name: 'Michael',
    family_name: 'Schulist',
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
    roles: ['approver'],
    given_name: 'Bernd',
    family_name: 'Nelkel',
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
    roles: ['approver'],
    given_name: 'Emily',
    family_name: 'Schmidt',
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
    roles: ['approver'],
    given_name: 'Bettina',
    family_name: 'Gruber',
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
    given_name: 'Heribert',
    family_name: 'Weigant',
    email: 'eike.balzar@augsburg.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: 'antje.resch@augsburg.de',
    user_id: 'antje.resch@augsburg.de',
    bpNumber: '5000028503',
    roles: ['approver'],
    given_name: 'Antje',
    family_name: 'Resch',
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
    roles: ['approver'],
    given_name: 'Eike',
    family_name: 'Balzar',
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
    roles: ['approver'],
    given_name: 'Ilse',
    family_name: 'Kowalke',
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
    roles: ['approver'],
    given_name: 'Anna',
    family_name: 'Maier',
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
    roles: ['approver'],
    given_name: 'Christ',
    family_name: 'Cornelia',
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
    roles: ['approver'],
    given_name: 'Tanja',
    family_name: 'Reder',
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
    given_name: 'Stefan',
    family_name: 'Schwab',
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
    given_name: 'Karin',
    family_name: 'Hiller',
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
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203204',
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
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000202012',
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
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203139',
    email: '5000203139@bayernlabo.de',
    ext: {
      bpNumber: '5000203139',
      roles: ['approver']
    }
  },
  {
    id: '5000203447@bayernlabo.de',
    user_id: '5000203447@bayernlabo.de',
    bpNumber: '5000203447',
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203447',
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
    family_name: '5000203170',
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
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000028503',
    email: '5000028503@bayernlabo.de',
    ext: {
      bpNumber: '5000028503',
      roles: ['approver']
    }
  },
  {
    id: '5000203342@bayernlabo.de',
    user_id: '5000203342@bayernlabo.de',
    bpNumber: '5000203342',
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203342',
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
    roles: ['approver'],
    given_name: 'Bewilligungsstelle',
    family_name: '5000203475',
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
    given_name: 'Bewilligungsstelle',
    family_name: '5000207564',
    email: '5000207564@bayernlabo.de',
    ext: {
      bpNumber: '5000207564',
      roles: ['approver']
    }
  },
  {
    id: 'bernhard.loderer@bayernlabo.de',
    user_id: 'bernhard.loderer@bayernlabo.de',
    roles: ['user'],
    given_name: 'Bernhard',
    family_name: 'Loderer',
    email: 'bernhard.loderer@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'michael.grimmer@bayernlabo.de',
    user_id: 'michael.grimmer@bayernlabo.de',
    roles: ['user'],
    given_name: 'Michael',
    family_name: 'Grimmer',
    email: 'michael.grimmer@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'benjamin.rogg@bayernlabo.de',
    user_id: 'benjamin.rogg@bayernlabo.de',
    roles: ['user'],
    given_name: 'Benjamin',
    family_name: 'Rogg',
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
    family_name: 'Friesen',
    email: 'benjamin.friesen@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'yvonne.buergel@bayernlabo.de',
    user_id: 'yvonne.buergel@bayernlabo.de',
    roles: ['user'],
    given_name: 'Yvonne',
    family_name: 'Buergel',
    email: 'yvonne.buergel@bayernlabo.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-fue.bayern.de',
    user_id: 'antragsteller1@lra-fue.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-fue.bayern.de',
    user_id: 'antragsteller2@lra-fue.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lra-fue.bayern.de',
    user_id: 'antragsteller3@lra-fue.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller3@lra-fue.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@stadt.nuernberg.de',
    user_id: 'antragsteller1@stadt.nuernberg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@stadt.nuernberg.de',
    user_id: 'antragsteller2@stadt.nuernberg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@stadt.nuernberg.de',
    user_id: 'antragsteller3@stadt.nuernberg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller3@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4@stadt.nuernberg.de',
    user_id: 'antragsteller4@stadt.nuernberg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller4@stadt.nuernberg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-bt.bayern.de',
    user_id: 'antragsteller1@lra-bt.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-bt.bayern.de',
    user_id: 'antragsteller2@lra-bt.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lra-bt.bayern.de',
    user_id: 'antragsteller3@lra-bt.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller3@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@landkreis-hof.de',
    user_id: 'antragsteller1@landkreis-hof.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@landkreis-hof.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@landkreis-hof.de',
    user_id: 'antragsteller2@landkreis-hof.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@landkreis-hof.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra.landkreis-cham.de',
    user_id: 'antragsteller1@lra.landkreis-cham.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@lra.landkreis-cham.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@augsburg.de',
    user_id: 'antragsteller1@augsburg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@augsburg.de',
    user_id: 'antragsteller2@augsburg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@augsburg.de',
    user_id: 'antragsteller3@augsburg.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller3@augsburg.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lra-donau-ries.de',
    user_id: 'antragsteller1@lra-donau-ries.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@lra-donau-ries.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lra-donau-ries.de',
    user_id: 'antragsteller2@lra-donau-ries.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@lra-donau-ries.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@lramsp.de',
    user_id: 'antragsteller1@lramsp.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller2@lramsp.de',
    user_id: 'antragsteller2@lramsp.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller2@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller3@lramsp.de',
    user_id: 'antragsteller3@lramsp.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller3@lramsp.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller1@kitzingen.de',
    user_id: 'antragsteller1@kitzingen.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller1@kitzingen.de',
    ext: {
      roles: ['user']
    }
  },
  {
    id: 'antragsteller4@lra-bt.bayern.de',
    user_id: 'antragsteller4@lra-bt.bayern.de',
    roles: ['user'],
    given_name: 'Bernadette',
    family_name: 'Watson',
    email: 'antragsteller4@lra-bt.bayern.de',
    ext: {
      roles: ['user']
    }
  }
]

export { hydraAdmin, users }

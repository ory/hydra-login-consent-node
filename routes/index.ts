import * as express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

export default router;

import * as express from 'express';
import { Request, Response, NextFunction} from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import routes from './routes/index';
import login from './routes/login';
import logout from './routes/logout';
import consent from './routes/consent';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/consent', consent);

// catch 404 and forward to error handler
interface ErrorWithStatus extends Error {
  status?: number;
  message: string;
};

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: ErrorWithStatus = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


export default app;

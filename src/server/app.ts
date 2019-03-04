import express from 'express';
import { helmetMiddleware } from './middleware/helmet';
import { sessionMiddleware } from './middleware/session';

const app = express();

app.set('trust proxy', true);

app.use(helmetMiddleware);
app.use(sessionMiddleware);

export { app };

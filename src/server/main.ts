import express from 'express';
import { createServer } from 'http';
import { handler as accessToken } from './access-token/handler';
import { handler as authorize } from './authorize/handler';
import { clientMiddleware } from './middleware/client';
import { exceptionMiddleware } from './middleware/exception';
import { helmetMiddleware } from './middleware/helmet';
import { sessionMiddleware } from './middleware/session';
import { handleErrors } from './utils/handle-errors';

async function bootstrap() {
    const app = express();

    app.set('trust proxy', true);

    app.use(helmetMiddleware);
    app.use(sessionMiddleware);
    app.use(clientMiddleware);

    app.get('/api/authorize', authorize);
    app.get('/api/access-token', handleErrors(accessToken));

    app.use(exceptionMiddleware);

    const port = process.env.PORT || 3000;

    createServer(app).listen(port);

    console.log(`Express is running on http://localhost:${port}`);
}

bootstrap().catch(console.error);

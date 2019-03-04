import { app } from '../app';
import { exceptionMiddleware } from '../middleware/exception';
import { handler } from './handler';

app.get('*', handler);
app.use(exceptionMiddleware);

export default app;

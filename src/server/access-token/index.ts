import { app } from '../app';
import { exceptionMiddleware } from '../middleware/exception';
import { handleErrors } from '../utils/handle-errors';
import { handler } from './handler';

app.get('*', handleErrors(handler));
app.use(exceptionMiddleware);

export default app;

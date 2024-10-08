import cors from 'cors';
import express, { Application } from 'express';
import rootRoutes from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';
import morgan from 'morgan';
import config from './config';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: [config.FRONTEND_URL!] }));

// application routes
app.use('/api/v1', rootRoutes);

//Not Found Route
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;

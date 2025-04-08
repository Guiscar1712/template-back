// app.ts
import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import routes from './interfaces/routes';
import 'reflect-metadata';
import { responseHandler } from './shared/middlewares/response-handler';
import { errorHandler } from './shared/errors/error-handler';

AppDataSource.initialize().then(() => {
  const app: Application = express();
  const port = 3000;

  app.use(express.json());

  app.use(responseHandler());

  app.use(errorHandler);

  app.use('/api/', routes);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
});

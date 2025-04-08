import { Request, Response, NextFunction } from 'express';
import { AppError } from './error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let status = 500;
  let message = 'Erro interno no servidor';

  if (err instanceof AppError) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).json({
    success: false,
    statusCode: status,
    error: message,
  });
};

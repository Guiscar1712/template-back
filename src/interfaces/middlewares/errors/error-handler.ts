import { Request, Response, NextFunction } from 'express';
import { AppError } from './app-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const isAppError = err instanceof AppError;

  const status = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : 'Erro interno no servidor';
  const details = isAppError ? err.details : undefined;

  res.status(status).json({
    success: false,
    statusCode: status,
    error: message,
    ...(details && { details }),
  });
};

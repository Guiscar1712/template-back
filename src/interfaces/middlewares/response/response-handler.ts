import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Response {
      success?: (params: { data: any; statusCode?: number }) => void;
      error?: (params: {
        message: string;
        customError?: string;
        statusCode?: number;
      }) => void;
    }
  }
}

export const responseHandler =
  () => (req: Request, res: Response, next: NextFunction) => {
    res.success = (params: any) => {
      res.status(params.statusCode).json({
        success: true,
        statusCode: params.statusCode,
        data: params.data,
      });
    };

    res.error = (params: any) => {
      res.status(params.statusCode).json({
        success: false,
        statusCode: params.statusCode,
        error: params.message,
        customError: params.customError,
      });
    };

    next();
  };

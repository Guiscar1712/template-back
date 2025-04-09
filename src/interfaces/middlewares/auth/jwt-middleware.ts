import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/app-error';

const secret = process.env.SECRET_KEY;

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const jwtMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ');
    if (!token) {
      return res.error({
        message: 'Token inválido',
        statusCode: 401,
      });
    }

    const decoded = jwt.verify(token[1], secret);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.error({
      message: 'Token inválido',
      customError: error.message,
      statusCode: 401,
    });
  }
};

export default jwtMiddleware;

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = 'c560ed79-2f6b-447a-ba52-e0143c237fbf';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const jwtMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token[1], secret);
    req.user = decoded as JwtPayload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default jwtMiddleware;
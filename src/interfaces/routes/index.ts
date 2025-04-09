import { Router } from 'express';
import userRouter from './user.route';
import authRouter from './auth.route';

/**
 * @jwtMiddleware
 * - Header
 * -- Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIxIjoiMTIzNDU2Nzg5MCIsIm5hbWUiOiJBbGVzc29uIEV2YW5nZWxpc3RhIiwiZW1haWwiOiJlYWxlc3NvbkBnbWFpbC5jb20iLCJwcm9maWxlIjoiQWRtaW4ifQ.mpbxoFt22R_mpIjkFsRyc9AROcLVWXSKmb518ofgC4k
 *
 * Use:
 * import jwtMiddleware from '../middleware/jwtMiddleware';
 * router.use('/users', jwtMiddleware, userRoute)
 */

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;

import { authenticateRequest } from '@clerk/express';
import express from 'express'
import {getUserCreations} from '../controllers/userController.js';
import { getAuth } from '@clerk/express'
import {getPublishedCreations} from '../controllers/userController.js';
import {toggleLikeCreation} from '../controllers/userController.js';

const userRouter = express.Router();
const requireAuthMiddleware = (req, res, next) => {
  const { userId } = getAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

userRouter.get('/get-user-creations', requireAuthMiddleware, getUserCreations)
userRouter.get('/get-published-creations', requireAuthMiddleware, getPublishedCreations)
userRouter.post('/toggle-like-creation', requireAuthMiddleware, toggleLikeCreation)

export default userRouter;
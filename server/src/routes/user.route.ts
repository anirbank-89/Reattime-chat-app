import express from 'express';

// Middlewares
import { validateRequest, requiresUser } from '../middlewares';

// Schemas
import {
  createUserSchema,
  createUserSessionSchema,
  setUserAvatarSchema,
} from '../schemas/user.schema';

// Controllers
import { registerUser, loginUser } from '../controllers/auth.controller';
import { updateUserAvatar } from '../controllers/user.controller';

const router = express.Router();
/** ----------- Routes ----------- */
// Register user
router.post('/', validateRequest(createUserSchema), registerUser);
// Login user
router.post('/session', validateRequest(createUserSessionSchema), loginUser);
router.put(
  '/set-avatar/:id',
  requiresUser,
  validateRequest(setUserAvatarSchema),
  updateUserAvatar
);
/** ------------------------------ */

export default router;

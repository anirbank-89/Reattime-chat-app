import express from 'express';

// Middlewares
import { validateRequest } from '../middlewares';

// Schemas
import {
  createUserSchema,
  createUserSessionSchema,
} from '../schemas/user.schema';

// Controllers
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = express.Router();
/** ----------- Routes ----------- */
// Register user
router.post('/', registerUser);
// Login user
router.post('/session', validateRequest(createUserSessionSchema), loginUser);
/** ------------------------------ */

export default router;

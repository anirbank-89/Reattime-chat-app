import express from 'express';

// Middlewares
import { validateRequest } from '../middlewares';

// Schemas
import { createUserSchema } from '../schemas/user.schema';

// Controllers
import { registerUser } from '../controllers/auth.controller';

const router = express.Router();

router.post('/', validateRequest(createUserSchema), registerUser);

export default router;

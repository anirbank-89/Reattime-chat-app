import express from 'express';

// Middlewares
import { validateRequest, requiresUser } from '../middlewares';

// Schemas
import { addMessageSchema, getMessagesSchema } from '../schemas/message.schema';

// Controllers
import { addMessage, getAllMessages } from '../controllers/message.controller';

const router = express.Router();

/** ----------- Routes ----------- */
router.post('/', requiresUser, validateRequest(addMessageSchema), addMessage);
router.post(
  '/exchanged-messages',
  validateRequest(getMessagesSchema),
  getAllMessages
);
/** ------------------------------ */

export default router;

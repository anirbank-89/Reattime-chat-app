import express from 'express';

import userRoute from './user.route';
import messageRoute from './message.route';

const router = express.Router();

router.use('/api/user', userRoute);
router.use('/api/message', messageRoute);

export default router;

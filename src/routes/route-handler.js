import { Router } from 'express';

// Router imports
import error from '#routes/error.js';
import home from '#routes/home.js';
import secret from '#routes/secret.js';

const router = Router();

// Routers
router.use(home);
router.use(secret);
router.use(error);

export default router;

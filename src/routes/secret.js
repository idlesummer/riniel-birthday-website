import { Router } from 'express';

const router = Router();

router.get('/secret', (req, res) => {
    res.render('secret');
});

export default router;

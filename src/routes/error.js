import { Router } from 'express';

const router = Router();

router.get('/:any', (req, res) => {
    res.render('error');
});

export default router;

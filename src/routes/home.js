import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/home', (req, res) => {
    res.redirect('/');
});

export default router;

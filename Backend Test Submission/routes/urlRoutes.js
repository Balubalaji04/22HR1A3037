import express from 'express';
import { createShortUrl } from '../controllers/shortenController.js';
import { redirectToOriginal } from '../controllers/redirectController.js';
import { getStats } from '../controllers/statsController.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getStats);
router.get('/:shortcode', redirectToOriginal);

export default router;

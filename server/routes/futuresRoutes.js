import express from 'express';
import { getFuturesData } from '../controllers/futures.js';

const router = express.Router();

router.get('/futures/search',getFuturesData);

export default router;
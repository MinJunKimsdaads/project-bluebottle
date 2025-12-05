import express from 'express';
import { getNasdaqData } from '../controllers/nasdaq.js';

const router = express.Router();

router.get('/nasdaq',getNasdaqData);

export default router;

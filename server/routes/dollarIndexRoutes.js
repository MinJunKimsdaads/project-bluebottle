import express from 'express';
import { getDollarIndexData } from '../controllers/dollarIndex.js';


const router = express.Router();

router.get('/dollarIndex/search',getDollarIndexData);

export default router;
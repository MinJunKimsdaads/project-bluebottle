import express from 'express';
import {getSalesData} from '../controllers/sales.js';

const router = express.Router();

router.get('/sales/search',getSalesData);

export default router;
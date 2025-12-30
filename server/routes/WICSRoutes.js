import express from 'express';
import { getWICSData } from '../controllers/WICS.js';

const router = express.Router();

router.get('/WICS/search',getWICSData);


export default router;
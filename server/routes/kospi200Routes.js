import express from 'express';
import {getKospi200Data} from '../controllers/kospi200.js';

const router = express.Router();

router.get('/kospi200/all',getKospi200Data);

export default router;
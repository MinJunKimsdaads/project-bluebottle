import express from 'express';
import { getKospiSectorData } from '../controllers/sector.js';

const router = express.Router();

router.get('/sector/kospi',getKospiSectorData);


export default router;
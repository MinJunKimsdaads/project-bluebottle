import express from 'express';
import { getKospiSectorData, getNasdaqSectorData } from '../controllers/sector.js';

const router = express.Router();

router.get('/sector/kospi',getKospiSectorData);
router.get('/sector/nasdaq',getNasdaqSectorData);


export default router;
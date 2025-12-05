import express from 'express';
import {get5DaysData} from '../controllers/inicator.js';

const router = express.Router();

router.get('/indicator/search',get5DaysData);

export default router;
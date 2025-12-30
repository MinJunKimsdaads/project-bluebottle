import express from 'express';
import cors from 'cors';
import kospi200Routes from './routes/kospi200Routes.js';
import salesRoutes from './routes/salesRoutes.js';
import indicatorRountes from './routes/indicatorRoutes.js';
import nasdaqRoutes from './routes/nasdaqRoutes.js';
import futuresRoutes from './routes/futuresRoutes.js';
import sectorRoutes from './routes/sectorRoutes.js';
import dollarIndexRoutes from './routes/dollarIndexRoutes.js';
import WICSRoutes from './routes/WICSRoutes.js';

const app = express();
const PORT = 4002;

app.use(express.json());
app.use(cors());
app.use('/api',kospi200Routes);
app.use('/api',salesRoutes);
app.use('/api',indicatorRountes);
app.use('/api',nasdaqRoutes);
app.use('/api',futuresRoutes);
app.use('/api',sectorRoutes);
app.use('/api',dollarIndexRoutes);
app.use('/api',WICSRoutes);
app.listen(PORT,()=>{
    console.log(PORT);
    console.log('server running');
});
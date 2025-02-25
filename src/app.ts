import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'module-alias/register';


dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('AppNow API Running'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});



export default app;

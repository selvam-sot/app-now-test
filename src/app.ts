import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'module-alias/register';

dotenv.config();

const app = express();

const corsOptions: any = {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Print request information for debugging
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.path}`);
    next();
});

// Basic route
app.get('/', (req, res) => res.send('AppNow API Running'));

// Health check - original path
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Additional health checks for different potential base paths
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/appointmentnow/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;

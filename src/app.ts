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

// Enhanced debugging middleware
app.use((req, res, next) => {
    console.log(`[DEBUG] Request received: ${req.method} ${req.originalUrl}`);
    console.log(`[DEBUG] Base URL: ${req.baseUrl}`);
    console.log(`[DEBUG] Path: ${req.path}`);
    console.log(`[DEBUG] Headers:`, JSON.stringify(req.headers));
    next();
});

// Basic route
app.get('/', (req, res) => {
    console.log('[DEBUG] Root endpoint hit');
    res.send('AppNow API Running');
});

// Health check - original path
app.get('/health', (req, res) => {
    console.log('[DEBUG] /health endpoint hit');
    res.status(200).json({ status: 'ok' });
});

// Additional health checks for different potential base paths
app.get('/api/health', (req, res) => {
    console.log('[DEBUG] /api/health endpoint hit');
    res.status(200).json({ status: 'ok' });
});

app.get('/appointmentnow/health', (req, res) => {
    console.log('[DEBUG] /appointmentnow/health endpoint hit');
    res.status(200).json({ status: 'ok' });
});

// Add a root-level health check that bypasses any potential route prefixes
app.use((req, res, next) => {
    if (req.path.endsWith('/health')) {
        console.log(`[DEBUG] Catch-all health endpoint hit: ${req.path}`);
        return res.status(200).json({ status: 'ok' });
    }
    next();
});

// Try router-based approach as well
const router = express.Router();
app.use('/api/v1', router);

router.get('/health', (req, res) => {
    console.log('[DEBUG] Router /health endpoint hit');
    res.status(200).json({ status: 'ok' });
});

// Add a catch-all route at the end
app.get('*', (req, res) => {
    console.log(`[DEBUG] Catch-all route hit: ${req.path}`);
    res.status(404).send(`Route not found: ${req.path}`);
});

export default app;

import app from './app';
import logger from './config/logger';

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection:', error);
    process.exit(1);
});

const PORT = Number(process.env.PORT) || 8080;

try {
    app.listen(PORT, '0.0.0.0', () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
} catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
}

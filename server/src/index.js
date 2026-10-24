import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { connectDb, disconnectDb } from './db.js';
import leadsRouter from './routes/leads.js';

const app = express();
const PORT = process.env.PORT || 5000;
const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');

app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:', 'https://images.pexels.com'],
      'media-src': ["'self'", 'https://videos.pexels.com', 'https://images.pexels.com'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': ["'self'"]
    }
  }
}));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use('/api/leads', leadsRouter);
app.use('/api', (req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// in production the API also serves the built React site
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist, { maxAge: '7d', index: false }));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
});

connectDb()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Vorcove API on http://localhost:${PORT}`));
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Close the other server using it, or set a different PORT in server/.env.`);
      } else console.error(err);
      disconnectDb().finally(() => process.exit(1));
    });
    const stop = () => server.close(() => disconnectDb().finally(() => process.exit(0)));
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);
  })
  .catch(err => {
    console.error('Could not start:', err.message);
    process.exit(1);
  });

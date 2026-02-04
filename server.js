import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import prerender from 'prerender-node';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable('x-powered-by');

app.use(
	helmet({
		contentSecurityPolicy: process.env.CONTENT_SECURITY_POLICY === 'false' ? false : true,
	}),
);
const allowedOrigins = process.env.COS_WHITELIST ? process.env.COS_WHITELIST.split(',').map((origin) => origin.trim()) : [];
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
	}),
);

const limiter = rateLimit({
	windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
	max: process.env.RATE_LIMIT_MAX_REQUESTS || 300,
	standardHeaders: true,
	legacyHeaders: false,
	message: 'Too many requests, please try again later.',
});

// Apply to all routes
app.use(limiter);
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN).set('protocol', 'https').set('blacklisted', ['^/api', '\\.js', '\\.css', '\\.png', '\\.jpg', '\\.static']);

app.use(express.static(path.join(__dirname, 'dist')));

app.use(prerender);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

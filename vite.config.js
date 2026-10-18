import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load .env variables into process.env for local development
dotenv.config();

// Custom Vite plugin to execute Vercel serverless API handlers during local development
function vercelDevApiPlugin() {
  return {
    name: 'vercel-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/')) {
          return next();
        }

        const urlPath = url.split('?')[0];
        let handlerModule = null;

        try {
          if (urlPath === '/api/levels-meta') {
            handlerModule = await import('./api/levels-meta.js');
          } else if (urlPath === '/api/submit-answer') {
            handlerModule = await import('./api/submit-answer.js');
          } else if (urlPath === '/api/verify-password') {
            handlerModule = await import('./api/verify-password.js');
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Endpoint not found' }));
          }

          let bodyBuffer = '';
          req.on('data', (chunk) => {
            bodyBuffer += chunk;
          });

          req.on('end', async () => {
            try {
              if (bodyBuffer) {
                try {
                  req.body = JSON.parse(bodyBuffer);
                } catch {
                  req.body = bodyBuffer;
                }
              } else {
                req.body = {};
              }

              // Polyfill Vercel Response helper methods if needed
              if (!res.status) {
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
              }
              if (!res.json) {
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };
              }

              await handlerModule.default(req, res);
            } catch (invokeErr) {
              console.error('[API Dev Error]:', invokeErr);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal Dev API Error', details: invokeErr.message }));
              }
            }
          });
        } catch (err) {
          console.error('[Vite API Middleware Error]:', err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to load API route' }));
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelDevApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});

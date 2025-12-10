// plugins/resolve-fallback/index.js

const path = require('path');

// --- Global Variable to hold the RAG function (Loaded lazily) ---
let askRAG;

module.exports = function (context, options) {
  return {
    name: 'custom-server-middleware', 
    
    // --- 1. Webpack Configuration (Polyfills) ---
    // These polyfills are only for the client-side bundle
    configureWebpack(config, isServer) {
      if (!isServer) {
        return {
          resolve: {
            fallback: {
              vm: require.resolve('vm-browserify'), 
              path: require.resolve('path-browserify'),
              os: require.resolve('os-browserify/browser'),
              crypto: require.resolve('crypto-browserify'),
              stream: require.resolve('stream-browserify'),
              util: require.resolve('util/'),
              buffer: require.resolve('buffer/'),
              url: require.resolve('url/'), 
              fs: false, 
            },
          },
        };
      }
      return {};
    },

    // --- 2. Server Middleware Configuration (API Endpoint) ---
    // This runs on the Node.js development server
    configureServer(app) {
      // Registers the express route handler for /api/rag
      app.use('/api/rag', async (req, res, next) => {
        
        // Load the RAG logic lazily here, inside the function call, 
        // to prevent module-level crashes during server startup.
        if (!askRAG) {
            try {
                // The actual RAG module is required here.
                const ragModule = require(path.resolve(__dirname, '../../src/rag/rag'));
                askRAG = ragModule.askRAG;
                console.log("--- RAG Logic Module Successfully Required ---");
            } catch (error) {
                // If requiring fails (e.g., node_modules issue, missing file)
                console.error("CRITICAL: Failed to load src/rag/rag.js module:", error.message);
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).end(JSON.stringify({ 
                    error: `Server Error: Cannot load RAG module. Check server terminal for error.`
                }));
            }
        }
        
        if (req.method !== 'POST') {
          return res.status(405).send('Method Not Allowed');
        }

        let query = '';
        
        // Manual body parsing for Docusaurus dev server
        try {
          for await (const chunk of req) {
            query += chunk.toString();
          }
          const body = JSON.parse(query);
          query = body.query;

        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON body sent from client.' });
        }
        
        if (!query) {
            return res.status(400).json({ error: 'Missing query parameter in body.' });
        }

        try {
          // Now safely call the loaded function
          const answer = await askRAG(query); 
          res.setHeader('Content-Type', 'application/json');
          res.status(200).end(JSON.stringify({ answer: answer }));
        } catch (err) {
          console.error("RAG Middleware EXECUTION CRASH:", err.message || err); 
          res.setHeader('Content-Type', 'application/json');
          res.status(500).end(JSON.stringify({ 
              error: 'RAG processing failed (Execution crash). Check server console.' 
          }));
        }
      });
    },
  };
};
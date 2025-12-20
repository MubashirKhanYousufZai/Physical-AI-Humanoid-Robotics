// plugins/custom-plugin/index.js

const path = require('path');
const { askRAG } = require(path.resolve(process.cwd(), 'src/rag/rag.js'));

module.exports = function (context, options) {
  return {
    name: 'docusaurus-custom-plugin',

    // 1. Webpack Configuration (Polyfills for client-side bundle)
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

    // 2. Server Configuration (API Endpoint)
    configureServer(app) {
      const getBody = (req) => {
        return new Promise((resolve, reject) => {
          let body = '';
          req.on('data', (chunk) => (body += chunk.toString()));
          req.on('end', () => {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(e);
            }
          });
          req.on('error', (err) => reject(err));
        });
      };

      app.use('/api/book-agent', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        try {
          const { prompt } = await getBody(req);

          if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Prompt is required' }));
          }

          const answer = await askRAG(prompt);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: answer }));

        } catch (error) {
          console.error('RAG API Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: `RAG Error: ${error.message}` }));
        }
      });
    },
  };
};

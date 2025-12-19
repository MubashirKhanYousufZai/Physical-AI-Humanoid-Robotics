const path = require('path');
const { askRAG } = require(path.resolve(process.cwd(), 'src/rag/rag.js'));

module.exports = function (context, options) {
  return {
    name: 'docusaurus-api-plugin',
    configureServer(app) {
      // Helper to parse request body
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

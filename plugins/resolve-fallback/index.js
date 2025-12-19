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

  };
};
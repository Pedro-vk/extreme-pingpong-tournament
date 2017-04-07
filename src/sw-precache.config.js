module.exports = {
  staticFileGlobs: [
    'dist/*.ico',
    'dist/*.html',
    'dist/**/*.bundle.js',
    'dist/**/*.bundle.css',
    'dist/assets/**/*'
  ],
  stripPrefix: 'dist/',
  runtimeCaching: [{
    urlPattern: /^https:\/\/(fonts\.gstatic\.com|fonts\.googleapis\.com).+/,
    handler: 'networkFirst'
  }]
};

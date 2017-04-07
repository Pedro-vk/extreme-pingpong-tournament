module.exports = {
  staticFileGlobs: [],
  runtimeCaching: [{
    urlPattern: /^https:\/\/(fonts\.gstatic\.com|fonts\.googleapis\.com|pedro\-vk\.github\.io\/extreme\-pingpong\-tournament).+/,
    handler: 'networkFirst'
  }]
};

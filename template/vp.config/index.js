module.exports = {
  env: require('./env'),
  webpack: require('./webpack'),

  proxyTargets: {
    // dev: 'http://localhost:8083',   // 本地开发时的转发地址
    // debug: 'http://localhost:8084'  // 联调时的转发地址
  }
}
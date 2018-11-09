module.exports = {
  proxy: process.env.NODE_ENV === 'production' ? '' : {
    base: 'https://localhost:8080',
    auth: 'https://core.api.alpha-myqnapcloud.com',
  },
};

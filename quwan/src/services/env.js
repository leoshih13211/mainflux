module.exports = {
  proxy: process.env.NODE_ENV === 'production' ? '' : {
    // base: 'https://localhost:443',
    base: 'https://5c69d8d3-a573-4bfb-becd-0a79abc56e82.mock.pstmn.io',
    auth: 'https://core.api.alpha-myqnapcloud.com',
  },
};

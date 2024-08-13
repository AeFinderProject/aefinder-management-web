// eslint-disable-next-line @typescript-eslint/no-var-requires
const devConfig = require('./development');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const proConfig = require('./production');

const { NEXT_PUBLIC_NODE_ENV } = process.env;

module.exports = NEXT_PUBLIC_NODE_ENV === 'production' ? proConfig : devConfig;

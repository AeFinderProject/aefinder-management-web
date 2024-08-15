/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');
const { ANALYZE, NODE_ENV } = process.env;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluginConfig = require('./build.config/plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const development = require('./build.config/development');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const production = require('./build.config/production');

const config =
  ANALYZE === 'true' || NODE_ENV === 'production' ? production : development;

module.exports = withPlugins(pluginConfig, config);

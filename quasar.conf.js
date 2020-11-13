const path = require('path');

module.exports = function (/* ctx */) {
  return {
    supportTS: false,

    boot: ['firebase', 'i18n'],

    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'hash',

      env: {
        TEST: process.env.TEST,
      },

      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,

          mixins: path.resolve(__dirname, './src/mixins'),
        };

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        });
      },
    },

    devServer: {
      https: false,
      port: 8080,
      open: true,
    },

    framework: {
      iconSet: 'material-icons',
      lang: 'en-gb',
      config: {},

      importStrategy: 'auto',

      plugins: ['Notify'],
    },

    animations: [],

    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},
      manifest: {
        name: `Mahlzeit`,
        short_name: `Mahlzeit`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
  };
};

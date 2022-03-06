// vue.config.js
// eslint-disable-next-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {  
  server: {
    hmr: {
      host: 'localhost',
      port: 443,
      protocol: 'wss'
    }
  },

    pluginOptions: {
      i18n: {
        locale: "en",
        fallbackLocale: "en",
        localeDir: "locales",
        enableInSFC: true
      }
    },
      module: {
        // Removes these errors: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
        // https://github.com/AnalyticalGraphicsInc/cesium-webpack-example/issues/6
        unknownContextCritical: false,
        rules: [{
          test: /\.pug$/,
          oneOf: [
            // this applies to `<template lang="pug">` in Vue components
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader'],
            },
            // this applies to pug imports inside JavaScript
            {
              use: ['raw-loader', 'pug-plain-loader'],
            },
          ],
        }],
    },
    lintOnSave: false
}
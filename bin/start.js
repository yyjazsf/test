#!/usr/bin/env node

const browserSync = require('browser-sync').create();

const config = require('./bs-config')

config.server = {
  baseDir: process.argv[2] || './',
  routes: {
    "/xx": "../node_modules"  //
  },
}
config.files = `${config.server.baseDir}/**`
browserSync.init(config);

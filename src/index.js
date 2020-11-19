#!/usr/bin/env node

const program = require('commander')
const { version } = require('../package.json')
const { commands } = require('./commands')

program
  .version(version)

commands(program)

program.parse(process.argv)

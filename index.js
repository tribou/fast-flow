#!/usr/bin/env node
'use strict'

const cmd = require('commander')
const exec = require('child_process').exec

cmd
  .arguments('<file>')
  .option('--show-all-errors')
  .option('--json')
  .action((file) => {

    const command = `cat ${file} | flow check-contents --show-all-errors --json`
    exec(command, (error, stdout, stderr) => {

      console.log(stdout)
      const parsed = JSON.parse(stdout)
      if (!parsed.passed) {
        process.exit(1)
      }

    })

  })
  .parse(process.argv)

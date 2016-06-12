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

      if (stderr) {

        console.error(stderr)
        process.exit(1)

      }

      if (error) {

        console.error(error)
        process.exit(1)

      }

      console.log(stdout)
      const parsed = JSON.parse(stdout)
      if (!parsed.passed) {
        process.exit(1)
      }

    })

  })
  .parse(process.argv)

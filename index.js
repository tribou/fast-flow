#!/usr/bin/env node
'use strict'

const program = require('commander')
const exec = require('child_process').exec

program
  .version('0.0.1')

program
  .command('check <file>')
  .option('--show-all-errors')
  .option('--json')
  .action((file, options) => {


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

      // process.stdout.write(stdout)
      const parsed = JSON.parse(stdout)
      if (!parsed.passed) {
        process.stderr.write(stdout)
        process.exit(1)
      }

    })

  })

program.parse(process.argv)

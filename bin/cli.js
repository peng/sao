#!/usr/bin/env node
const cac = require('cac')
const pkg = require('../package')

const cli = cac()

cli
  .command('<generator> [outDir]', 'Run a generator')
  .action((generator, outDir, flags) => {
    const options = Object.assign(
      {
        generator,
        outDir: outDir || '.',
        updateCheck: true
      },
      flags
    )

    if (!options.generator) {
      return cli.showHelp()
    }

    return require('../')(options)
      .run()
      .catch(err => {
        require('..').handleError(err)
      })
  })
  .option(
    '--npm-client <client>',
    `Use a specific npm client ('yarn' or 'npm')`
  )
  .option('-u, --update', 'Update cached generator')
  .option('-c, --clone', 'Clone repository instead of archive download')
  .option('-y, --yes', 'Use the default options')
  .option('--registry <registry>', 'Use a custom registry for npm and yarn')

cli
  .command('set-alias <name> <value>', 'Set an alias for a generator path')
  .action((name, value) => {
    const store = require('../lib/store')
    const { escapeDots } = require('../lib/utils/common')
    const logger = require('../lib/logger')

    store.set(`alias.${escapeDots(name)}`, value)
    logger.success(`Added alias '${name}'`)
  })

cli
  .command('get-alias <name>', 'Get the generator for an alias')
  .action(name => {
    const store = require('../lib/store')
    const { escapeDots } = require('../lib/utils/common')

    console.log(store.get(`alias.${escapeDots(name)}`))
  })

cli.version(pkg.version)
cli.help()

cli.parse()
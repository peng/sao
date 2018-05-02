const path = require('path')
const chalk = require('chalk')

class Logger {
  constructor(options) {
    this.options = {}
    this.setOptions(options)
  }

  setOptions(options) {
    this.options = Object.assign({
      logLevel: 3
    }, this.options, options)
  }

  // level: 3
  info(...args) {
    if (this.options.logLevel < 3) {
      return
    }
    console.log(chalk.cyan('info'), ...args)
    return this
  }

  // level: 2
  warn(...args) {
    if (this.options.logLevel < 2) {
      return
    }
    console.warn(chalk.yellow('warning'), ...args)
  }

  // level: 1
  error(...args) {
    if (this.options.logLevel < 1) {
      return
    }
    process.exitCode = process.exitCode || 1
    console.error(chalk.red('error'), ...args)
  }

  // level: 3
  success(...args) {
    this.status('green', 'success', ...args)
  }

  // level: 3
  tip(...args) {
    this.status('blue', 'tip', ...args)
  }

  info(...args) {
    this.status('cyan', 'info', ...args)
  }

  status(color, label, ...args) {
    if (this.options.logLevel < 3) {
      return
    }
    console.log(chalk[color](label), ...args)
  }

  fileAction(color, type, fp) {
    if (this.options.logLevel < 3) {
      return
    }
    this.info(
      `${chalk[color](type)}${chalk.dim(':')} ${chalk.green(
        path.relative(process.cwd(), fp)
      )}`
    )
  }

  fileMoveAction(from, to) {
    if (this.options.logLevel < 3) {
      return
    }
    this.info(
      `${chalk.blue('Moved')}${chalk.dim(':')} ${chalk.green(
        path.relative(process.cwd(), from)
      )} -> ${chalk.green(path.relative(process.cwd(), to))}`
    )
  }
}

module.exports = new Logger()
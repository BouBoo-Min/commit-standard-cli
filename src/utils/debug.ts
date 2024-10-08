import chalk from 'chalk'
const log = console.log
let debugSwitch = true

/**
 * debug开关，默认开启
 * @param debug boolean
 */
const switchDebug = (debug: boolean) => {
  debugSwitch = debug
}

/**
 * debug 错误信息
 * @param type 类型
 * @param msg 信息
 */
const debugError = (msg: string) => {
  let newMeg = JSON.parse(msg)
  if (typeof newMeg === 'object' && !Array.isArray(newMeg) && newMeg !== null) {
    // 这里是对象
    newMeg = '未知错误'
  }
  debugSwitch && log(chalk.hex('#646cff')(`[commit-standard-cli]: `) + chalk.red(newMeg))
  // 如果出错就退出
  process.exit(0)
}

/**
 * debug 信息
 * @param type 类型
 * @param msg 信息
 */
const debugInfo = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[commit-standard-cli]: `) + chalk.green(msg))
}

/**
 * debug 强调
 * @param type 类型
 * @param msg 信息
 */

const debugprocess = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[commit-standard-cli]: `) + chalk.yellow(msg))
}
/**
 * debug warning信息
 * @param type 类型
 * @param msg 信息
 */
const debugWarning = (msg: string) => {
  log(chalk.hex('#646cff')(`[commit-standard-cli]: `) + chalk.yellow(msg))
}

const debugTxt = (msg: string) => {
  log(chalk.hex('#646cff')(`[commit-standard-cli]: `) + chalk.hex('#5c6d82')(msg))
}

export { switchDebug, debugInfo, debugError, debugWarning, debugprocess, debugTxt }

// 解析命令行参数以及获取脚本运行的路径
import cac from 'cac'
import { setEnv } from './utils/env'
import { start } from './start'
import { dependentInstallModePrompt, mergePrompt } from './utils/prompt'

const cli = cac('commit-standard-cli --particular')

const cliInit = () => {
  cli
    .command('[root]')
    .alias('alias')
    .option('--particular', 'particular')
    .option('--noEmoji', 'noEmoji')
    .action(async (_root, options) => {
      let base: string = options.base
      const { particular, noEmoji } = options

      particular && setEnv('particular', true)
      noEmoji && setEnv('noEmoji', true)

      // prompt交互
      // 是否覆盖已有的eslint配置
      await mergePrompt()
      // 选择依赖安装的方式
      await dependentInstallModePrompt()

      if (!base) {
        // 项目的最终路径
        base = process.cwd()
      }
      setEnv('base', base)
      await start(base)
    })

  cli.help()
  cli.version('1.0.0')
  cli.parse()
}

export default cliInit

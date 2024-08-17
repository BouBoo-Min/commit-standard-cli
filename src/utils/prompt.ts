import { prompt } from 'enquirer'
import { existsSync, setEnv } from './env'
import { dependentInstallModeEnum, mergePromptEnum } from './type'

/**
 * @name 提示用户是否覆盖已有的eslint配置
 */
const mergePrompt = async () => {
  if (existsSync('.eslintrc')) {
    const response: any = await prompt([
      {
        type: 'select', // 交互类型 -- 单选（无序）
        message: '是否覆盖已有eslint配置', // 引导词
        name: 'isMerge', // 自定义的字段名
        choices: ['是', '否（合并配置）'], // 选项列表
      },
    ])
    setEnv('merge', response.isMerge !== mergePromptEnum.true)
  }
}

/**
 * @name 提示用户选择依赖安装的方式
 */
const dependentInstallModePrompt = async () => {
  const response: any = await prompt([
    {
      type: 'select', // 交互类型 -- 单选（无序）
      message: '选择依赖安装方式(建议写入,后续自行安装: npm install or yarn or...', // 引导词
      name: 'dependent', // 自定义的字段名
      choices: ['写入', '安装'], // 选项列表
    },
  ])
  setEnv('dependentInstallMode', response.dependent === dependentInstallModeEnum.writeIn)
}

export { mergePrompt, dependentInstallModePrompt }

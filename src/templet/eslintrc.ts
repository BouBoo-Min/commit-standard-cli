import { defaultEslintrcInit, reactEslintrcInit, vue2EslintrcInit, vue3EslintrcInit } from '../const/eslint'
import { getEnv } from '../utils/env'
import { Obj } from '../utils/type'

export const eslintrcFn = (particular: boolean) => {
  // 默认配置
  let eslintrcInit: Obj = defaultEslintrcInit(particular)

  // react配置
  if (getEnv('isReact')) {
    eslintrcInit = reactEslintrcInit(particular)
  }
  // Vue2配置
  if (getEnv('isVue2')) {
    eslintrcInit = vue2EslintrcInit(particular)
  }
  // Vue3配置
  if (getEnv('isVue3')) {
    eslintrcInit = vue3EslintrcInit(particular)
  }

  return eslintrcInit
}

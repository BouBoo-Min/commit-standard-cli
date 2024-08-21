import fs from 'fs-extra'
import { down, meageEslint, writeInPkg } from '../utils/tool'
import { getPackageJson, getEnv, getEslintrc } from '../utils/env'
import { prettierrcInit } from '../templet/prettierrc'
import { eslintrcFn } from '../templet/eslintrc'
import { getpath } from '../utils/path'
import { eslintBaseDep, reactEslintDep, vue2EslintDep, vue3EslintDep } from '../const/dependent'
import { baseEslintRules } from '../const/eslint'

export const eslintInit = async () => {
  let devDependencies: string[] = eslintBaseDep

  // 判断项目类型，安装不同依赖
  if (getEnv('isVue2')) {
    devDependencies = [...eslintBaseDep, ...vue2EslintDep]
  }
  if (getEnv('isVue3')) {
    devDependencies = [...eslintBaseDep, ...vue3EslintDep]
  }
  if (getEnv('isReact')) {
    devDependencies = [...eslintBaseDep, ...reactEslintDep]
  }

  // 合并操作
  if (getEnv('merge')) {
    const oldEslintConfig = await getEslintrc()
    if (oldEslintConfig) {
      // 存在旧版本eslint
      const nEslint = getEnv('particular') ? baseEslintRules : {}
      const mEslint = meageEslint(oldEslintConfig, nEslint)
      const eslintToString = JSON.stringify(mEslint, null, 2)
      writeEslintConfig(`${eslintToString}`)
    }
    return false
  }

  // 依赖安装方式
  if (getEnv('dependentInstallMode')) {
    // writeInPkg 只是把依赖写入到package中
    await writeInPkg(devDependencies, 'devDependencies')
  } else {
    // 调用down直接可以把依赖安装好
    await down(devDependencies, '-D')
  }
  writeEslintConfig(JSON.stringify(eslintrcFn(getEnv('particular') as boolean), null, 2))

  // 合并 执行一次 eslint 把重复的对象合并
  const eslint2 = await getEslintrc()

  writeEslintConfig(eslint2)

  async function writeEslintConfig(eslintConfig: string) {
    fs.outputFileSync(getpath('./.eslintrc'), eslintConfig)
    fs.outputFileSync(getpath('./.prettierrc'), JSON.stringify(prettierrcInit, null, 2))
    let pkgJson = await getPackageJson()
    if (pkgJson['eslintConfig']) {
      delete pkgJson.eslintConfig
    }
    fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
  }
}

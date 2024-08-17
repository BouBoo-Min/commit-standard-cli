import path from 'path'
import fs from 'fs-extra'
import { checkVueVersion } from './check'
import { envKeys } from './type'

export const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: true,
  isEslint: false,
  merge: false, // 是否覆盖原有eslint 默认覆盖
  particular: false, // 是否详细的eslint配置
  noEmoji: false, // 是否不要表情 默认是要
  dependentInstallMode: true, // 安装依赖的模式 默认是写入
}

/**
 * @name 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never
}
/**
 * @name 获取变量
 */
export const getEnv = (key: envKeys) => {
  return env[key]
}

/**
 * @name 检测是否包含指定文件
 */
export const existsSync = (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  return fs.existsSync(file)
}

/**
 * @name 获取指定文件,并转化为json
 */
export const getFiletoJson = async (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  const res = fs.existsSync(file)
  if (!res) return false
  const json = fs.readJSON(file)
  return json
}
/**
 * @name 把package.json转化为json
 */
export const getPackageJson = async (base: string = getEnv('base') as string) => {
  return getFiletoJson('package.json', base)
}

/**
 * @name 获取eslintrc
 */
export const getEslintrc = async (base: string = getEnv('base') as string) => {
  const file = path.resolve(base, '.eslintrc')
  const res = fs.existsSync(file)
  if (!res) return false
  const eslintStr = await fs.readFile(file, 'utf8')
  return eval(JSON.stringify(eslintStr))
}

/**
 * @name 通过package.json获取项目信息
 * @param pckJson
 * @returns
 */
export const initProjectInfo = async (pckJson: any) => {
  const deps = { ...pckJson.devDependencies, ...pckJson.dependencies }
  // TODO: 待完善
  // vue判断
  if (Object.keys(deps).some(dependency => dependency.toLowerCase().includes('vue'))) {
    setEnv('isVue', true)
    if (checkVueVersion(deps['vue']) === 2) {
      setEnv('isVue2', true)
    }
    if (checkVueVersion(deps['vue']) === 3) {
      setEnv('isVue3', true)
    }
  }
  // react判断
  if (Object.keys(deps).some(dependency => dependency.toLowerCase().includes('react'))) {
    setEnv('isReact', true)
  }
  // eslint判断
  if (deps['eslint']) {
    setEnv('isEslint', true)
  }
  return true
}

// 开始分析项目
import { getEnv, getPackageJson, initProjectInfo } from './utils/env'
import { debugInfo, debugError, debugprocess, debugTxt } from './utils/debug'
import { eslintInit } from './core/eslint'
import { eslintignoreInit } from './core/eslintignore'
// import { huskyInit } from './core/husky';
// import { commitLintInit } from './core/commitlint';
// import { vscodeInit } from './core/vscode';
// import { specialFn } from './core/special';

export const start = async (base: string) => {
  const pckJson = await getPackageJson(base)
  await initProjectInfo(pckJson)
  if (!getEnv('isReact')) {
    debugError('暂不支持除React之外的其他版本,敬请期待···')
  }
  try {
    // 安装 eslint 和 preitter 并自动生成配置文件
    await eslintInit()
    // 添加 eslint 忽略文件
    await eslintignoreInit()
    // 安装 hucky 并自动生成配置文件
    // await huskyInit()
    // 生成.vscode 配置文件 支持自动格式化代码
    // await commitLintInit()
    // await downNodeModules();
    // await specialFn()
    // await vscodeInit()

    debugInfo('success!')
    debugprocess('请重新安装依赖！npm install or yarn or ···')
    debugTxt(`
    😎 请确保您吃饭的家伙是vscode
    😘 推荐安装vscode插件 eslint、prettier-eslint、prettier ···
    `)
  } catch (error) {
    console.error('错误信息:', { error })
    debugError(JSON.stringify(error))
  }
}

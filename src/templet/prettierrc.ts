/**
 * 参考文档
 *  1、https://prettier.nodejs.cn/
 *  2、https://blog.csdn.net/a843334549/article/details/115391605
 */
export const prettierrcInit = {
  // 行尾是否需要有分号
  semi: false,
  // 使用单引号代替双引号
  singleQuote: true,
  // 使用几个空格缩进
  tabWidth: 2,
  // 末尾使用逗号
  trailingComma: 'all',
  // 一行最多多少字符换行
  printWidth: 120,
  // 使用默认的折行标准
  proseWrap: 'never',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
  // 使用tab缩进，默认false
  useTabs: false,
  // JSX标签闭合位置 默认false
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
}

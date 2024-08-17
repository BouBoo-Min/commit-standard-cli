import { env } from "./env"

export enum dependentInstallModeEnum {
  writeIn = '写入',
  down = '安装',
}

export enum mergePromptEnum {
  true = '是',
  false = '否（合并配置）',
}

export interface Obj {
  [key: string]: any
}

export type envKeys = keyof typeof env

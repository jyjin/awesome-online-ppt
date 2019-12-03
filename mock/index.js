/**
 * mock假数据生成
 * 
 * author:  jyjin
 * date:    2019.10.30
 * remark:  2019.11.04 将配置的mock模块独立到mock.js, 不掺杂解析逻辑
 */
import { getModule } from './lib'
import { mock } from './mock'

export default (url, data) => {
  return mock[getModule.call(this, url, mock)](data)
}



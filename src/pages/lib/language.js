
/* eslint-disable */
/***
 * 多语言请求
 * 
 * const Lan = require('XXX/language/index.js')
 * 
 * Lan.queryLanguage('home')                                  // 查询租户模块home的多语言
 * Lan.queryLanguage('home', ['pop.cancel', 'pop.confirm'])   // 查询租户模块home的多语言 及两个弹框的描述维护
 * Lan.queryLanguage('home', [], true)                        // 查询平台层多语言
 *
 */

import LAN from '../i18n';
import { post } from './ajax';
import { devicePrefix } from '../../../config';

// 添加前缀
const prefix = (key, obj) => {
  let newObj = {}
  Object.keys(obj).map(item => {
    newObj[`${key}${key ? '.' : ''}${item}`.toLowerCase()] = obj[item]
  })
  return newObj
}

const prefixRemove = (langSend, langRes, _module, devicePrefix) => {

  // 去除系统前缀
  let newObj = {}
  Object.keys(langRes).map(item => {
    if (item.indexOf(`${devicePrefix}base.`) > -1) {
      newObj[item.replace(`${devicePrefix}base.`, '')] = langRes[item]
    } else {
      newObj[item.replace(`${devicePrefix}${_module ? _module + '.' : ''}`, '')] = langRes[item]
    }
  })

  // 没查到的返回原key值
  Object.keys(langSend).map(key => {
    if (Object.keys(langRes).indexOf(key) === -1) {
      let pureKey = ''
      if (key.indexOf(`${devicePrefix}base.`) > -1) {
        pureKey = key.replace(`${devicePrefix}base.`, '')
      } else {
        pureKey = key.replace(`${devicePrefix}${_module ? _module + '.' : ''}`, '')
      }
      newObj[pureKey] = pureKey
    }
  })
  return newObj
}

// 多语言查询组件
export const queryLanguage = (_module, otherCode = []) => {
  const lang = localStorage.getItem('languageUserSelect')
  let url = `/fnd/v1/applets/prompts/multi/${lang}`
  // 添加系统前缀
  let baseList = prefix(`${devicePrefix}base`, LAN['base'])
  let lanList = prefix(`${devicePrefix}${_module}`, LAN[_module])
  let allLanglist = {
    ...lanList,
    ...baseList
  }
  let requestCode = [...Object.keys(allLanglist), ...otherCode]

  return new Promise(resolve => {
    post(url, requestCode).then((_lang) => {
      if (!_lang) _lang = {}
      resolve(prefixRemove(allLanglist, _lang, _module, devicePrefix))
    })
  })
}
/* eslint-disable */
/**
 * 暴露mock接口假数据
 *     使用方法见注释 step1 => step2
 */

// step1: 加入你的mock数据... 
//          import { XX1, XX2, ... } from './XXX'  
import { menuList } from './menu'
import { callList, callInfo, relateCustomerDetail, realateCustomerList } from './record'

export const mock = {
  // step2: 暴露接口供外部调用...  
  //        '/your/path/${param1}/to/${param2}/outside': XX1
  //        '/your/path/${param1}/to/${param2}/another': XX2
  '/im-manage/v1/${orgId}/im/menu': menuList,
  '/im-manage/v1/${orgId}/im/call/record/list': callList,
  '/im-mange/v1/${orgId}/callinfo': callInfo,
  '/fnd/v1/${data.orgId}/customer/info/info/condition': realateCustomerList,
  '/fnd/v1/${orgId}/customer/info/id/info': relateCustomerDetail,
}
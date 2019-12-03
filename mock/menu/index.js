import Mock from 'mockjs';
import { pickIn } from '../lib';

let Random = Mock.Random

// 注意：这里的数据都是function形式暴露，写成function是为了每次都能produce新的数据

// // 用户列表
// export const menuList = () => Mock.mock({
//   'list|2': [{
//     'id': () => Random.guid(),
//     'parentId': () => Random.guid(),
//     'menuName': () => pickIn(['消息', '通话记录'], 1).join(''),
//     'menuCode': () => pickIn(['', 'record'], 1).join(''),
//     'menuUrl': () => pickIn(['', 'record'], 1).join(''),
//     'sort|+1': 1,
//   }]
// }).list

// 菜单列表
// 菜单接口只返回 具有特定权限code的菜单，这个code就是根据userId查询到的权限code
export const menuList = () => [{
  // 唯一索引
  id: 1,
  // 父级菜单索引
  parentId: 0,
  // 菜单名
  menuName: '消息',
  // 菜单多语言code
  menuCode: 'msg',
  // 菜单地址
  menuUrl: '',
  // 菜单图标
  icon: 'messagechat',
  // 排序位置
  sort: 1,
  // 权限code 
  permissionCode: ['GENERAL_CS', 'MANAGER_CS']
}, {
  id: 2,
  parentId: 0,
  menuName: '通话记录',
  menuCode: 'record',
  menuUrl: 'callrecord',
  icon: 'record',
  sort: 2,
  permissionCode: ['GENERAL_CS', 'CALL_CS', 'MANAGER_CS']
}]
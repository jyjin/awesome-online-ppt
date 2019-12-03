import Mock from 'mockjs';
import { pickIn } from '../lib';

let Random = Mock.Random

// 注意：这里的数据都是function形式暴露，写成function是为了每次都能produce新的数据

// 单个用户数据
export const user = () => Mock.mock({
  'id': () => Random.guid(),
  'name': () => Random.cname() + pickIn([Random.clast()], 1, 0),
  'age|+1': 18,
  'gender|1-3': true,
  'family|3': {
    'id|+1': () => Random.guid(),
    'name': () => Random.cname() + pickIn([Random.clast()], 1, 0),
  },
  'skills': () => pickIn(['唱歌', '书法', '篮球', '网球'])
})

// 用户列表
export const userList = () => Mock.mock({
  'list|1-5': [{
    'id': () => Random.guid(),
    'name': () => Random.cname() + pickIn([Random.clast()], 1, 0),
    'age|+1': 18,
    'gender|1-3': true,
    'family|3': {
      'id|+1': () => Random.guid(),
      'name': () => Random.cname() + pickIn([Random.clast()], 1, 0),
    },
    'skills': () => pickIn(['唱歌', '书法', '篮球', '网球'])
  }]
}).list
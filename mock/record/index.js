import Mock from 'mockjs';
import { pickIn } from '../lib';

let Random = Mock.Random

// 通话记录
export const callList = () => Mock.mock({
  'list|5-15': [{
    'id': () => Random.guid(),
    'customerName': () => Random.cname() + pickIn([Random.clast()], 1, 0),
    'callType': () => pickIn(["0", "1"], 1).join(''),
    'duration': () => Random.integer(1, 500),
    'phoneNumber': () => '1' + pickIn(["3", "5", "7", "8"], 1, 0) + Random.integer(99999999, 1000000000) + '',
    'startTime': () => Random.time(),
  }]
}).list

// 待关联的客户信息列表
export const realateCustomerList = () => Mock.mock({
  'list|5-15': [{
    'id': () => Random.guid(),
    'customerName': () => Random.cname() + pickIn([Random.clast()], 1, 0),
    'email': () => Random.email(),
    'phoneNumber': () => '1' + pickIn(["3", "5", "7", "8"], 1, 0) + Random.integer(99999999, 1000000000) + '',
    'address': () => Random.province() + Random.city() + Random.county(),
    'orgniazationId': () => Random.guid(),
    'projectId': () => Random.guid(),
  }]
}).list


export const relateCustomerDetail = () => Mock.mock({
  'id': () => Random.guid(),
  'email': () => Random.email(),
  'address': () => Random.province() + Random.city() + Random.county(),
  'customerName': () => Random.cname() + pickIn([Random.clast()], 1, 0),
  'phoneNumber': () => '1' + pickIn(["3", "5", "7", "8"], 1, 0) + Random.integer(99999999, 1000000000) + '',
  'customerCode': () => '1' + pickIn(["3", "5", "7", "8"], 1, 0) + Random.integer(99999999, 1000000000) + '',
  'remark': () => Random.cname() + pickIn([Random.clast()], 1, 0),
})


export const callInfo = []
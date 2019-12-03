/* eslint-disable */

/**
 * 根据实际url 查询对应的 _mock的key值url
 * 
 * author: jyjin
 * date:   2019.10.30
 * */

export function getModule(url, _mock) {
  if (typeof _mock !== 'object') {
    throw new Error('getModule第二个参数必须是Object')
  }

  let targetKey = ''
  Object.keys(_mock).map(key => {
    let arr1 = key.split('/')
    let arr2 = url.split('/')
    let indexes = []
    arr1.map((item, index) => {
      if (~item.indexOf('${')) {
        indexes.push(index)
      }
    })
    let realUrl = key
    indexes.map(index => {
      realUrl = realUrl.replace(arr1[index], arr2[index])
    })
    if (url === realUrl) {
      targetKey = key
      // console.log(`${url} \t\t\t【 is the mapping of 】\t\t ${key} `)
    }
    return;
  })
  return targetKey
}
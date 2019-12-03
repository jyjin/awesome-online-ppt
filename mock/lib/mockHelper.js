import Mock from 'mockjs';
let Random = Mock.Random

/**
 * 
 * @param {*} arr 可供选择的选项
 * @param {*} max 最多选几个, default=arr.length
 * @param {*} min 最少选几个, default=1
 */
export let pickIn = (arr, max, min) => {
  if (!arr.length) {
    throw new Error('pickIn 第一个参数必须为非空数组')
  }

  max === undefined && (max = arr.length)
  min === undefined && (min = 1)

  if (max && typeof max !== 'number' || min && typeof min !== 'number') {
    throw new Error('pickIn max/min参数必须为数字')
  }

  let i = min;
  let newArr = []
  let range = Random.integer(min, max)
  while (min === 0 ? i < range : i <= range) {
    i++
    let o = Random.pick(arr)
    if (!~newArr.indexOf(o)) {
      newArr.push(o)
    }
  }

  return newArr

}
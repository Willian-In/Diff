import h from './mysnabbdom/h.js'

// 测试用例
const myNode = h('div', {}, [
  h('p', {}, '牛啊'),
  h('p', {}, '羊啊'),
  h('p', {}, '猪猪'),
  h('p', {}, h('span', {}, '喵喵'))
])

console.log(myNode);
import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'
// 测试用例
const myVnode = h('h1', {}, '欢迎光临')
const myvNode3 = h('ul', {}, '我是一个老的节点, 我就是一串文字, 我没有子节点')
const container = document.getElementById('container')
const btn = document.getElementById('btn')
btn.textContent = '点击改变DOM'
patch(container, myvNode3)

const myvNode4 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
])

const myvNode6 = h('ul', {}, [
  h('li', {key: 'A'}, h('p', {key: 'AB'}, '我是石某人')),
  h('li', {key: 'B'}, '奶狗'),
  h('li', {key: 'C'}, '修狗'),
  h('li', {key: 'D'}, '狼狗'),
  h('li', {key: 'E'}, '猪狗')
])

const myvNode5 = h('ul', {}, '哦哈呦')

// patch(myvNode3, myvNode4)

btn.onclick = () => {
  patch(myvNode4, myvNode6)
}
// console.log(myVnode);

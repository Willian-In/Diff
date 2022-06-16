import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'
// 测试用例
const myVnode = h('h1', {}, '欢迎光临')
const myvNode3 = h('ul', {}, '我是一个老的节点, 我就是一串文字, 我没有子节点')
const container = document.getElementById('container')
const btn = document.getElementById('btn')
btn.textContent = '点击改变DOM'


const myvNode4 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
])

const myvNode6 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'M' }, 'M'),
  h('li', { key: 'N' }, 'N'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'Y' }, 'C'),

])
patch(container, myvNode4)

const myvNode5 = h('ul', {}, '哦哈呦')

// patch(myvNode3, myvNode4)

btn.onclick = () => {
  patch(myvNode4, myvNode6)
}
// console.log(myVnode);

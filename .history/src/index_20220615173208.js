import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'
// 测试用例
const myVnode = h('h1', {}, '欢迎光临')
const myvNode3 = h('ul', {}, [
  h('li', {}, '牛奶'),
  h('li', {}, '奶狗'),
  h('li', {}, '修狗') // 如果子元素有且只有一个可以省略不写数组
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')
btn.textContent = '点击改变DOM'
patch(container, myVnode)

const myvNode4 = h('ul', {}, [
  h('li', {}, '牛奶'),
  h('li', {}, '奶狗'),
  h('li', {}, '修狗') // 如果子元素有且只有一个可以省略不写数组
  h('li', {}, '修狗') // 如果子元素有且只有一个可以省略不写数组
])

btn.onclick = () => {
  patch(myVnode, myvNode3)
}
// console.log(myVnode);

import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const myvNode = h('a', {
  props: {
    href: 'https://www.baidu.com',
    target: '_blank'
  }
}, '百度一下')
// 设置class名
const myvNode2 = h('div', { class: { box: true } }, '我是一个盒子')

// 嵌套使用h函数 
const myvNode3 = h('ul', {}, [
  h('li', {}, '牛奶'),
  h('li', h('p', [
    h('span', '牛啊'),
    h('span', '羊啊')
  ])),
  h('li', {}, h('p', '猪猪')) // 如果子元素有且只有一个可以省略不写数组
])
// 得到下面的虚拟DOM
// { sel: 'ul', data: {… }, children: Array(3), text: undefined, elm: undefined, … }
// children: Array(3)
// 0: { sel: 'li', data: {… }, children: undefined, text: '牛奶', elm: undefined, … }
// 1: { sel: 'li', data: {… }, children: undefined, text: '咖啡', elm: undefined, … }
// 2: { sel: 'li', data: {… }, children: undefined, text: '可乐', elm: undefined, … }
// length: 3
// [[Prototype]]: Array(0)
// data: { }
// elm: undefined
// key: undefined
// sel: "ul"
// text: undefined

console.log(myvNode3);
// 静态文件中必须有一个id为container的元素
const container = document.getElementById("container");

// 让虚拟节点上树
patch(container, myvNode3)
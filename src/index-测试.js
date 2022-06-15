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

console.log(myvNode3, '查看虚拟节点');
// 静态文件中必须有一个id为container的元素
const container = document.getElementById("container");

patch(container, myvNode3)
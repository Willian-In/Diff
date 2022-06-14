import vnode from './vnode.js'
import createElement from './createElement.js';
// export default function (oldVnode, newVnode) {
//   // 1.判断是不是DOM节点
//   if (oldVnode.sel === 'null' || oldVnode.sel === undefined) {
//     // 如果是真实DOM 则将其包装成虚拟节点
//     oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
//     console.log(oldVnode);
//   }

//   // 判断oldVnode和newVnode是不是同一个节点
//   if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
//     // 如果是同一个节点就进行精细比较
//     console.log('是同一个节点');
//   } else {
//     // 不是同一个节点就直接暴力删除，再插入
//     // 将虚拟DOM创建为DOM
//     createElement(newVnode, oldVnode.elm)
//   }
// }
export default function (oldVnode, newVnode) {
  // 1 判断oldVnode 是不是DOM节点
  if (oldVnode.sel === 'null' || oldVnode.sel === undefined) {
    // 如果是真实DOM，则包装成虚拟节点 toLowerCase 转为小学
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    console.log(oldVnode);
  }

  // 2 判断oldVnode 和 newVnode是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 如果是同一个节点进行更新update
  } else {
    // 如果不是同一个节点直接暴力
    // 将虚拟DOM创建为DOM
    let newVnodeElm = createElement(newVnode, oldVnode.elm)
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
  }
}
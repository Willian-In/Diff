import vnode from './vnode.js'
import createElement from './createElement.js';
export default function (oldVnode, newVnode) {
  // 1 判断oldVnode 是不是DOM节点
  if (oldVnode.sel === 'null' || oldVnode.sel === undefined) {
    // 如果是真实DOM，则包装成虚拟节点 toLowerCase 转为小写
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    console.log(oldVnode);
  }

  // 2 判断oldVnode 和 newVnode是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 如果是同一个节点进行更新update
    // 判断新旧节点是不是同一个对象,如果是相同，则不用做什么处理
    console.log('是同一个节点')
    if (oldVnode === newVnode) return
    if (newVnode.text != '' && newVnode.children == undefined || newVnode.children.length == 0) {
      console.log('新的vnode有text属性')
      // 如果newVnode 的text和oldVnode的 text不相同 则直接用老节点innerHHTML插入新节点的text
      if (newVnode.text != oldVnode.text) {
        // console.log(oldVnode);
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      console.log('新的vnode没有text属性')
      // 判断老的节点有没有children 如果没有 而新节点有children的情况下，把新节点的children渲染出来
      // 判断老的节点有没有children
      if (oldVnode.children != undefined && oldVnode.children.length > 0) {
        // 老节点有children 新节点也有children, 最为复杂的情况
        /** update 最为难点 */
        console.log('');










      } else {
        // 首先清空老节点的html
        oldVnode.elm.innerHTML = ''
        // 老节点没有children，新节点有children, 创建成真实dom，然后插入到老节点中
        for (let i = 0; i < newVnode.children.length; i++) {
          let dom = createElement(newVnode.children[i])
          oldVnode.elm.appendChild(dom)
        }
      }
    }

  } else {
    // 如果不是同一个节点直接暴力
    // 将虚拟DOM创建为DOM
    let newVnodeElm = createElement(newVnode, oldVnode.elm)
    // 插入到老节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)

  }
}
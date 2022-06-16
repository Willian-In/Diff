import vnode from './vnode.js'
import createElement from './createElement.js';
import pathVnode from './'
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
import pathVnode from "./pathVnode";
import createElement from "./createElement";
// 判断是不是同一个节点
function checkSameVnode (a, b) {
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren (parentElem, oldCh, newCh) {
  console.log(oldCh, newCh, '★');
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新前节点
  let newStartVnode = newCh[0]
  // 新后节点
  let newEndVnode = newCh[newEndIdx]
  // 开始大的循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) { 
    // 如果新前和旧前 相同，那么对新旧两个节点进行对比，调用pathVnode进行渲染
    // 新前和旧前
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('①新前和旧前命中');
      pathVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
      // 新后和旧后
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('②新后和旧后命中');
      pathVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
      // 新后和旧前
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log('③新后和旧前命中');
      pathVnode(oldStartVnode, newEndVnode)
      // 插入：当③：新后和旧前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
      //            新后和旧前命中，将旧前节点 插入到旧后节点的后面 使用nextSibling 下一个兄弟位置
      // 如何移动节点？？ 只要你插入一个已经在DOM树上的节点，它就会被移动
      parentElem.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
      // 新前和旧后
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log('③新前和旧后命中');
      pathVnode(oldEndVnode, newStartVnode)
      // 插入：当④：新前和旧后命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧前前面
      // 如何移动节点？？ 只要你插入一个已经在DOM树上的节点，它就会被移动
      parentElem.insertBefore(oldEndVnode.elm,  oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 都没有找到的情况之下该做什么
    }
  }
}
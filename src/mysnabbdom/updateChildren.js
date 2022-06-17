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
  // 缓存key
  let keyMap = null
  // 开始大的循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先不是判断①②③④命中，而是要掠过已经加undefined标记得项
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newEndVnode[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 如果新前和旧前 相同，那么对新旧两个节点进行对比，调用pathVnode进行渲染
      // 新前和旧前
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
      parentElem.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 四种规则都没有命中 新前和旧前 新后和旧后 新后和旧前 新前和旧后
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      console.log(keyMap, '----------keyMap');
      // 寻找当前这项（newStartIdx）这项在keyMap中得映射位置
      const idxInOld = keyMap[newStartVnode.key];
      console.log(idxInOld, 'idxInOld');
      if (idxInOld == undefined) {
        // 判断，如果idxInOld是undefined表示这项是全新项
        // 被加入得项 就是newStartVnode这项， 还不是真正得DOM节点
        parentElem.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 如果不是undefined,不是全新得项，而是要移动
        const elmTomove = oldCh[idxInOld]
        console.log(elmTomove.elm.nodeType, '--------');
        if (elmTomove.elm.nodeType == 1) {
          pathVnode(elmTomove, newStartVnode)
          // 把这项设置为undefined,表示我已经处理完这项了
          oldCh[idxInOld] = undefined
          parentElem.insertBefore(elmTomove.elm, oldStartVnode.elm)
        }

      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 当whil结束后 start 还是比end小, 说明还有节点没有处理
  if (newStartIdx <= newEndIdx) {
    console.log('新节点中还有没处理的');
    // 插入标杆 为null 就表示队尾
    // const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
    // 遍历新得newCh,添加到老得没有处理得之前
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // before 为null, insertBefore第二个参数为null时候，会自动识别成插入到队尾中去, 和appendChild是一致了
      parentElem.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old还有剩余节点没有处理');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 批量删除oldStartIdx和oldEndIdx之间得项
      console.log(oldCh[i]);
      if (oldCh[i]) {
        parentElem.removeChild(oldCh[i].elm)
      }
    }
  }
}
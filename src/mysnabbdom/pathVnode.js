/**
 * diff算法的子节点更新策略（重点）
 * 四种命中查找 自上到下测试，有命中就停止，如果都没有命中，就需要循环来寻找 判断语句 while（新前《=新后 && 旧前《= 旧后）
 * ①新前与旧前
 * ②新后与旧后
 * ③新后与旧前
 * ④新前与旧后
 * 
 * 
 * 
 * 讲解：
 * 旧子节点有两个指针： 数组的第一个 叫旧前； 数组的最后一个叫旧后
 * 新子节点有两个指针：数组的第一个叫新前； 数组的最后一个叫新后
 * 
 * 当新前与旧前命中，则新前 旧前指针下移，新节点新后指针向上移动
 * 如果是旧的节点先循环完毕，说明新的节点中剩下的节点都是要新插入的
 * 如果是新节点先循环完毕，如果老节点中还有剩余节点，就是要被删除的节点
 * 
 * 当4情况；新前与旧后命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧前的前面
 * 当3情况：新后与旧前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
 * 有命中就停止，新旧指针下移，如果都没有命中，就需要循环来寻找，新指针要向下移动或者向上移动， 判断语句 while（新前《=新后 && 旧前《= 旧后）
 */



import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function pathVnode (oldVnode, newVnode) {
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
    let un = 0
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 老节点有children 新节点也有children, 最为复杂的情况
      /**最复杂的update */
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)

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
}
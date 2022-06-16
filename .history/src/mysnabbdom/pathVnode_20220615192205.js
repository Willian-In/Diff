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
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 老节点有children 新节点也有children, 最为复杂的情况
      /** update 最为难点 */
      console.log('精细计算');
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = newVnode.children[i];
        for (let j = 0; j < oldVnode.children.length; j++) {
          if (oldVnode[j].data[key] === newVnode[i].data[key]) {
            \
          }
        }
      }

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
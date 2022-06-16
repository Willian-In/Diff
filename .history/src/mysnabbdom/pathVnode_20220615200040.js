import createElement from "./createElement";

export default function pathVnode (oldVnode, newVnode) {
  console.log(oldVnode, '-----老节点');
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
      /** update 最为难点 */
      console.log('精细计算');
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = newVnode.children[i];
        // 再次遍历，
        // 定义一个状态
        let isExist = false
        for (let j = 0; j < oldVnode.children.length; j++) {
          if (oldVnode.children[j].sel == ch.sel && oldVnode.children[j].key == ch.key) {
            // 当找到相同的节点时
            isExist = true
          }
        }
        // 当没有找到有相同的节点时
        if (!isExist) {
          console.log(ch);
          // 这里可以得到新节点中哪些节点和老节点不相同
          let dom = createElement(ch)
          console.log(dom);
          ch.elm = dom
          console.log(oldVnode.children, '--------123');
          oldVnode.elm.insertBefore(dom, oldVnode.children[un],elm)
        } else {
          un++ 
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
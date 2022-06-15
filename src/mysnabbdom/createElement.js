export default function createElement (vnode) {
  console.log(vnode);
  // 将虚拟节点创建成真实DOM插入标杆前
  const domNode = document.createElement(vnode.sel)
  // 判断是有子节点还是有文本
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length === 0)) {
    // 它内部是文字
    domNode.innerText = vnode.text
    // 将孤儿节点上树, 让标杆节点的父元素调用insertBefore方法，将孤儿节点插入到标杆节点之前
    // pivot.parentNode.insertBefore(domNode, pivot)
    // 第二种方案
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 必须使用递归创建真实DOM
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      // chDom是上一层返回的elm
      console.log(ch);
      let chDom = createElement(ch)
      // vnode.elm.appendChild往当前vnode的子节点插入dom
      console.log(chDom, '-----1234');
      domNode.appendChild(chDom)
    } 
  }
  vnode.elm = domNode
  return vnode.elm
}
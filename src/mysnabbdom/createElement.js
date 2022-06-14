export default function (vnode) {
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
    vnode.elm = domNode
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 必须使用递归创建真实DOM 
    let ch = vnode.children
    for (let i = 0; i < ch.length; i++) {
      console.log(ch[i]);

    }
  }

  return vnode.elm
}
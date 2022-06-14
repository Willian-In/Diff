import vnode from './vnode.js';
console.log(vnode('div', 1, 2, 3, 4));

/**
 * 低配版本的H函数,接受3个参数
 * 形态1: h('div', {}, '文字'),
 * 形态2: h('div', {}, [])
 * 形态3: h('div', {}, h())
 */

// js 重载功能较弱
// export default function (sel, data, c) {
//   //  检查参数的个数
//   if (arguments.length != 3) throw new Error('低配版h函数,必须传入3个参数')
//   // 检查参数c的类型
//   if (typeof c == 'string' || typeof c == 'number') {
//     return vnode(sel, data, undefined, c, undefined)
//   } else if (Array.isArray(c)) {
//     let children = []
//     // 编写形态2的h函数
//     for (let i = 0; i < c.length; i++) {
//       if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
//         throw new Error('传入的数组此参数中有项不是h函数')
//       // 对c[i]进行手机 放在children内
//       children.push(c[i])
//     }
//     // 循环结束  children 收集完毕, 返回children
//     return vnode(sel, data, children, undefined, undefined)
//   } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
//     // 编写形态2的h函数
//     let children = [c]
//     return vnode(sel, data, children, undefined, undefined)
//   } else {
//     throw new Error('传入的第三个参数类型不对')
//   }
// }

export default function (sel, data, c) {
  // 做一个只能接收三个参数得h函数
  if (arguments.length != 3) throw new Error('低配版h函数只接收三个参数')
  // 判断第三个参数是否是文字
  if (typeof c == 'string' || typeof c == 'number') {
    return vnode(sel, data, undefined, c, undefined)
    // 当第三个参数是一个数组的时候
  } else if (Array.isArray(c)) {
    let children = []
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
        throw new Error('请确认您传的是否是一个h函数')
      children.push(c[i])
    }
    // 将收及的信息返回出去
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入的第三个参数类型不对')
  }
}

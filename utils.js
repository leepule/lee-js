/*
 * @Author: your name
 * @Date: 2020-07-21 13:42:15
 * @LastEditTime: 2020-07-22 10:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /le-js/utils.js
 */

/**
 * 表单序列化
 *
 * @param {*} data
 * @return {*} 
 */
const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

/**
 * 获取对象的类型
 *
 * @param {*} obj
 * @return {*} 
 */
const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 *
 * @param {*} data
 * @return {*} 
 */
const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 判断路由是否相等
 *
 * @param {*} obj1
 * @param {*} obj2
 * @return {*} 
 */
const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下标：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

/**
 * 递归寻找子类的父类
 *
 * @param {*} menu
 * @param {*} id
 * @return {*} 
 */
const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 *
 * @param {*} url
 */
const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 根据字典的value查找对应的index
 *
 * @param {*} dic
 * @param {*} value
 * @return {*} 
 */
const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}

/**
 * 根据字典的value显示label
 *
 * @param {*} dic
 * @param {*} value
 * @return {*} 
 */
const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number' || typeof (value) === 'boolean') {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}

/**
 * 生成随机len位数字
 *
 * @param {*} len
 * @param {*} date
 * @return {*} 
 */
const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 解决ie9不兼容placeholder问题
 *
 */
function compatiblePlaceholder() {
  if (!('placeholder' in document.createElement('input'))) {
    // 将返回的nodeList对象转为数组
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[placeholder]'))
    nodes.forEach(function (item, index) {
      if (item.nextElementSibling) {

      } else {
        item.addEventListener('focus', function () {
          this.nextSibling.style.display = 'none'
        })
        item.addEventListener('blur', function () {
          if (!this.value) {
            this.style.display = 'none'
            this.nextSibling.style.display = 'inline'
          }
        })
        var cloneNode = item.cloneNode()
        // 如果[type='password']类型，则转为text
        if (cloneNode.getAttribute('type').toLowerCase() === 'password') {
          cloneNode.setAttribute('type', 'text')
        }
        cloneNode.setAttribute('value', cloneNode.getAttribute('placeholder'))
        cloneNode.style.display = 'none'
        item.insertAdjacentHTML('afterend', cloneNode.outerHTML)
        item.nextSibling.addEventListener('focus', function () {
          this.style.display = 'none'
          this.previousSibling.style.display = 'inline'
          this.previousSibling.focus()
        })
        if (!item.value) {
          item.style.display = 'none'
          item.nextSibling.style.display = 'inline'
        }
      }

    })
  }
}

/**
 * 精度丢失转换（ 乘法）
 *
 * @param {*} arg1
 * @param {*} arg2
 * @return {*} 
 */
function accMul(arg1, arg2) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

/**
 * 节流函数，在一段时间内，回调函数只执行一次
 * 
 * @param {Function} fun 需要节流的函数
 * @param {number} delay 节流的时间，单位为毫秒
 */
function throttle(fun, delay) {
  let valid = true;
  return function () {
    let context = this;
    let args = arguments;
    if (!valid) {
      return;
    }
    valid = false;
    setTimeout(() => {
      fn.apply(context, args);
      valid = true;
    }, delay);
  }
}

/**
 *防抖函数,多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行
 *
 *@param fn 事件触发的操作
 *@param delay 多少毫秒内连续触发事件，不会执行
 *@returns {Function}
 */
function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function () {
    let context = this,
      args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

/**
 * 计算时间和当前时间的差值
 *
 * @param {*} atime
 * @return {*} 
 */
const spaceTime = function (atime) {
  atime = atime.replace(/-/g, '/'); //IE出现兼容问题，带“-”格式的时间无法被new Date()转成时间格式，返回NaN.
  let byTime = [365 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
  let unit = ["年", "天", "小时", "分钟", "秒钟"];
  var ct = new Date().getTime() - new Date(atime).getTime();
  if (ct <= 1000) {
    // return "时间数据出错!"
    return "刚刚"
  }
  var sb = [];
  for (var i = 0; i < byTime.length; i++) {
    if (ct < byTime[i]) {
      continue;
    }
    var temp = Math.floor(ct / byTime[i]);
    ct = ct % byTime[i];
    if (temp > 0) {
      sb.push(temp + unit[i]);
    }


    /*一下控制最多输出几个时间单位：
     一个时间单位如：N分钟前
     两个时间单位如：M分钟N秒前
     三个时间单位如：M年N分钟X秒前
    以此类推
    */
    if (sb.length >= 1) {
      break;
    }
  }
  return (sb.join("") + "前");
}

/**
 * 获取当前年月
 *
 * @return {*} 
 */
const getNowFormatDate = function () {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month;
  return currentdate;
}

/**
 * 获取指定时间年月日
 *
 * @param {*} data
 * @return {*} 
 */
const getFormatDate = function (data) {
  var date = new Date(data);
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + strDate;
  return currentdate;
}

/**
 * 获取距离当前时间多久的时间
 * 
 * @param type year年/month月/week周/day日 
 * @param number -为之前/+为之后
 */
const getBeforAfterTime = function (type = null, number = 0) {
  var nowdate = new Date();
  switch (type) {
    case "day": //取number天前、后的时间
      nowdate.setTime(nowdate.getTime() + (24 * 3600 * 1000) * number);
      var y = nowdate.getFullYear();
      var m = nowdate.getMonth() + 1;
      var d = nowdate.getDate();
      var retrundate = y + '/' + m + '/' + d;
      break;
    case "week": //取number周前、后的时间
      nowdate.setTime(nowdate.getTime() + (7 * 24 * 3600 * 1000) * number);
      var y = nowdate.getFullYear();
      var m = nowdate.getMonth() + 1;
      var d = nowdate.getDate();
      var retrundate = y + '/' + m + '/' + d;
      break;
    case "month": //取number月前、后的时间
      nowdate.setMonth(nowdate.getMonth() + number);
      var y = nowdate.getFullYear();
      var m = nowdate.getMonth() + 1;
      var d = nowdate.getDate();
      var retrundate = y + '/' + m + '/' + d;
      break;
    case "year": //取number年前、后的时间
      nowdate.setFullYear(nowdate.getFullYear() + number);
      var y = nowdate.getFullYear();
      var m = nowdate.getMonth() + 1;
      var d = nowdate.getDate();
      var retrundate = y + '/' + m + '/' + d;
      break;
    default: //取当前时间
      var y = nowdate.getFullYear();
      var m = nowdate.getMonth() + 1;
      var d = nowdate.getDate();
      var retrundate = y + '/' + m + '/' + d;
  }
  return retrundate;
}

/**
 * 连字符转驼峰 toCamelCase('hello-world') // helloWorld
 *
 * @param {string} [str='']
 * @param {string} [separator='-']
 * @return {*} 
 */
const toCamelCase = (str = '', separator = '-') => {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string')
  }
  if (str === '') {
    return str
  }
  const newExp = new RegExp('\\-\(\\w\)', 'g')
  return str.replace(newExp, (matched, $1) => {
    return $1.toUpperCase()
  })
}

/**
 * 驼峰转连字符  fromCamelCase('helloWorld') // hello-world
 *
 * @param {string} [str='']
 * @param {string} [separator='-']
 * @return {*} 
 */
const fromCamelCase = (str = '', separator = '-') => {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string')
  }
  if (str === '') {
    return str
  }
  return str.replace(/([A-Z])/g, `${separator}$1`).toLowerCase()
}

/**
 * 获取指定范围内的随机数 getRandom(1, 100)
 *
 * @param {number} [min=0]
 * @param {number} [max=100]
 * @return {*} 
 */
const getRandom = (min = 0, max = 100) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Argument(s) is illegal !')
  }
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 文件尺寸格式化 formatSize('10240') // 10KB  formatSize('10240000') // 9.77MB
 *
 * @param {*} size
 * @return {*} 
 */
const formatSize = size => {
  if (typeof + size !== 'number') {
    throw new Error('Argument(s) is illegal !')
  }
  const unitsHash = 'B,KB,MB,GB'.split(',')
  let index = 0
  while (size > 1024 && index < unitsHash.length) {
    size /= 1024
    index++
  }
  return Math.round(size * 100) / 100 + unitsHash[index]
}

/**
 * constrcut 方法
 * 根据提供的 id, pid 和 children 将一个个节点构建成一棵或者多棵树
 * @param nodes 节点对象
 * @param config 配置对象
 */
const construct = (nodes, config) => {
  const id = config && config.id || 'id'
  const pid = config && config.pid || 'parentid'
  const children = config && config.children || 'children'

  const idMap = {}
  const jsonTree = []

  nodes.forEach((v) => {
    v && (idMap[v[id]] = v)
  })
  nodes.forEach((v) => {
    if (v) {
      let parent = idMap[v[pid]]
      if (parent) {
        !parent[children] && (parent[children] = [])
        parent[children].push(v)
      } else {
        jsonTree.push(v)
      }
    }
  })

  return jsonTree
}

/**
 * destruct 方法
 * 根据配置的 id, pid 和 children 把解构化的树型对象拆解为一个个节点
 * @param forest 单个或者多个树型对象
 * @param config 配置
 */
const destruct = (forest, config) => {
  const id = config && config.id || 'id'
  const pid = config && config.pid || 'pid'
  const children = config && config.children || 'children'

  function flatTree(tree) {
    const queue = [tree]
    const result = []
    while (queue.length) {
      let currentNode = queue.shift()
      if (currentNode.hasOwnProperty(id)) {
        if (!currentNode.hasOwnProperty(pid)) {
          currentNode = {
            ...currentNode,
            [pid]: null
          }
        }
        if (currentNode[children]) {
          currentNode[children].forEach((v) => {
            v && queue.push({
              ...v,
              [pid]: currentNode[id]
            })
          })
        }
        result.push(currentNode)
        delete currentNode[children]
      } else {
        throw new Error('you need to specify the [id] of the json tree')
      }
    }
    return result
  }
  if (Array.isArray(forest)) {
    return forest.map((v) => flatTree(v)).reduce((pre, cur) => pre.concat(cur))
  } else {
    return flatTree(forest)
  }
}

/**
 * 深拷贝
 *
 * @param {*} origin
 * @return {*} 
 */
const deepClone = (origin) => {
  var isObject = any => typeof any === 'object' && any !== null
  var isArray = any => Object.prototype.toString.call(any) === '[object Array]'
  if (!isObject(origin)) {
    return origin
  }
  var target = isArray(origin) ? [] : {}
  for (var prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      var value = origin[prop]
      if (isObject(value)) {
        target[prop] = deepClone(value)
      } else {
        target[prop] = value
      }
      //if...else...可换成三目运算符
      //target[prop] = isObject(value) ? deepClone(value) : value
    }
  }
  return target
}

/**
 * 隐藏中间四位数的电话号码
 *
 * @param {*} phone
 * @return {*} 
 */
const hidePhone = (phone) => {
  var tel = phone;
  tel = '' + tel;
  var ary = tel.split('');
  console.log(ary);
  ary.splice(3, 4, '****');
  var tel1 = ary.join('');
  return tel1
}

/**
 * 比较两个日期的大小
 *
 * @param {*} date1
 * @param {*} date2
 * @return {*} 
 */
const compareDate = (date1, date2) => {
  date1 = date1.replace(/-/g, '/');
  date2 = date2.replace(/-/g, '/');
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate1.getTime() > oDate2.getTime()) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * 判断是否为空对象、 空数组等
 *
 * @param {*} obj
 * @return {*} 
 */
const isEmpty = (obj) => {
  //检验null和undefined和''
  if (!obj && obj !== 0) {
    return true;
  }
  //检验数组
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true;
  }
  //检验对象
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

/**
 * 判断两个数组是否有相同的值
 *
 * @param {*} a1
 * @param {*} a2
 * @return {*} 
 */
const ExistsSameValues = (a1, a2) => {
  let exists = false;
  if (a1 instanceof Array && a2 instanceof Array) {
    for (var i = 0, iLen = a1.length; i < iLen; i++) {
      for (var j = 0, jLen = a2.length; j < jLen; j++) {
        if (a1[i] === a2[j]) {
          return true;
        }
      }
    }
  }
  return exists;
}


const parseTime = (date, fmt) => {
  let ret;
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt;
}

/**
 * 产生任意长度随机字母数字组合 randomFlag - 是否任意长度 min - 任意长度最小位[固定位数] max - 任意长度最大位
 *
 * @param {*} randomFlag
 * @param {*} min
 * @param {*} max
 * @return {*} 
 */
const randomWord = (randomFlag, min, max) => {
  var str = '',
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
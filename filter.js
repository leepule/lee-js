/** 
 * main.js 引入全局
 * 
 import * as filters from '@/utils/filters';
 Object.keys(filters).forEach((key) => {
   Vue.filter(key, filters[key]);
 });
*/

/**
 * 日期格式化 {{ data | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
 *
 * @export
 * @param {*} time
 * @param {*} pattern
 * @return {*} 
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  // time = time.replace(/-/g, '/');
  time = time.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 数字格式化 千分号加逗号
 *
 * @export
 * @param {*} money
 * @param {*} num
 * @return {*} 
 */
export function moneyFormat(money, num) {
  if (isNaN(money) || !money) {
    return !money ? '' : money;
  } else {
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
    var l = money.split('.')[0].split('').reverse(),
      r = money.split('.')[1];
    var t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  }
}

/**
 * 千分号去掉逗号
 *
 * @export
 * @param {*} num
 * @return {*} 
 */
export function delNumFormat(num) {
  return num.replace(/,/g, '');
}
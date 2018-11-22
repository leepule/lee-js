Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'D+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()  // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

new Date().Format('年份yyyy 月份MM 日期DD 小时hh 分钟mm 秒ss 季度q 毫秒S')


if(newNumber.indexOf('.')!=-1&&newNumber.match(/\./g).length>=2){
    //不能有两个小数点
}else if(newNumber.length==1&&newNumber=="."){
    //第一个数不能为小数点
}else if(newNumber.length==2&&newNumber[0]=='0'&&newNumber[1]!='.'){
    //第一位是0，第二位必须是小数点
}else if(newNumber.indexOf('.')!=-1&&newNumber.split('.')[1].length>options.point){
    //小数点之后的位数不能大于参数中的point
}else if(parseFloat(newNumber)<0){
    //不能为负数
}else if(options.hasOwnProperty('max')&&parseFloat(newNumber)>options.max){
    //最大值不能超过参数中的max
}else if(!options.point&&newNumber.indexOf('.')!=-1){
    //如果参数中的小数点之后的位数要求是0，则不能输入小数点
}else{
    //可以输入
};

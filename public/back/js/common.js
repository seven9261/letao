


//4 实现进度条功能
// NProgress.start(); 进度条开启
//NProgress.done();    进度条关闭
// ajax全局事件
// 1. ajaxComplete() 每个ajax请求完成时调用 (不管成功还是失败都会调用)
// 2. ajaxError()   每个ajax失败时调用
// 3. ajaxSend()    每个ajax发送前调用
// 4. ajaxStart()   第一个ajax请求被发送时调用
// 5. ajaxStop()    全部的ajax请求完成时调用
// 6. ajaxSuccess() 每个ajax成功时调用

//在ajax发送请求的时候  显示进度条
//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
// 所有ajax 结束  进度条结束
$(document).ajaxStop(function () {
  NProgress.done();
}

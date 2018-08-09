// import { template } from "handlebars";


$(function(){

 
  var firstPage = 1;  // 当前页
  var pageSize = 5;  // 每页条数
  render() 
  function render() {
    $.ajax({
      url : "/category/queryTopCategoryPaging",
      type : "get",
      dataType : " json ",
      data : {
        page :  firstPage  ,
        pageSize :pageSize
      },
      success : function (info){
          console.log(info);
          // 加入模板引擎
          $('tbody').html(template('first-tpl' , info ));
  
  
          // 进行分页
          $('#paginator').bootstrapPaginator({
            // 指定bootstrap版本
            bootstrapMajorVersion: 3,
            // 总页数
            totalPages: Math.ceil( info.total / info.size ),
            // 当前第几页
            currentPage: info.page,
            // 注册按钮点击事件
            onPageClicked: function( a, b, c, page ) {
              // 更新当前页
              firstPage = page;
              // 重新渲染
              render();
            }
          })
          
      }
    })

  };


  // 点击添加分类按钮 弹出模态框
  $('#first-addBtn').click(function(){
    $('#firstModal').modal('show');//模态框显示
  });


  // // 使用表单校验插件 ,实现 表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }
  });


  // // 
  $('#form').on("success.form.bv" , function(e){
    e.preventDefault();

    // 通过ajax进行提交
    $.ajax({
      url: "/category/addTopCategory",
      type : "post",
      dataType :"json",
      data : $('#form').serialize(),
      success : function(info){
        console.log(info);
        if(  info.success  ){
            // 添加成功
            // 1 关闭模态框
            $('#firstModal').modal('hide');//模态框隐藏
            // 页面重新渲染时让用户看到第一页
            firstPage = 1;
            render();
            // 3. 重置模态框, resetForm(true) true不仅重置校验状态, 还重置表单内容
            $('#form').data("bootstrapValidator").resetForm(true);
        }
        
      }
      

    })




  })







})
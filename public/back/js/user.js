// import { template } from "handlebars";


$(function(){

  // page 页码
  // pageSize 每页的条数
  var userpage = 1 ;//页码
  var pageSize = 5; //每页条数
  var userId;//记录当前所选用户id
  var isDelete;//记录按钮状态

  render();//一进页面 就发送ajax 渲染页面
  function render() {
    $.ajax({
      type : "get",
      url  :  "/user/queryUser",
      data : {
        page : userpage,
        pageSize :  pageSize 
      },
      dataType : "json",
      success : function ( info ){
        console.log(info);
        $('tbody').html(template('usul-tpl' ,  info ));


        // 分页初始化
        $('#paginator').bootstrapPaginator({ 
          // 配置 bootstrap 版本
          bootstrapMajorVersion: 3,
          // 配置总页数
          totalPages : Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 当页码被点击时调用的回调函数
          onPageClicked: function( a, b, c, page ) {
            // 同规格有 page 获取当前点击的页码

            // 更新当前页
            userpage = page ;
            // 重新渲染
            render();

          }



        });
        
      }
    })

  };



  // 点击禁用按钮 显示模态框
  $('tbody').on("click" , ".btn" , function(){
    $('#usertModal').modal("show");

    userId = $(this).parent().data("id");//记录当前点击的id

    // 改变按钮的状态 切换 启用 或者 禁用
   isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
   
  });
  
  // 点击确认按钮 放ajax请求 修改对应的用户状态
  $('#userBtn').click(function(){
    
     console.log(  "用户状态 :"  + isDelete);
     console.log( "用户id :"  +  userId);
     $.ajax({
        url : "/user/updateUser",
        type: "post",
        data: {
          id : userId,
          isDelete :isDelete
        },
        dataType :"json",
        success : function (info){
          console.log(info);
          if( info.success){
              // 关闭模态框
              $('#usertModal').modal("hide");

              // 重新渲染页面
              render();
          }
          
        }


     });
  })


})
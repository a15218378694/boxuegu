
	// NProgress.start();
  //
	// NProgress.done();
  //
	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

  // function fn(){
  //
  // }


	define(['jquery','cookie','template','nprogress'],function ($,cookie,template,NProgress){
    //登陆的功能
  if(!$.cookie('PHPSESSID')&&location.pathname!='/login'){   //如果自己当前就是login页面的话，就不需要再跳转了，只有不是login页面的时候，才需要跳转
      location.href='login';
    }

    //登陆之后渲染头像和用户名
    // 渲染模板    login页面是不需要用户名和头像渲染的，需要排除掉
    if(location.pathname!='/login'&&location.pathname!='/dashboard/login'&&location.pathname!='/views/dashboard/login'){
      var tcInfo = JSON.parse($.cookie('tcInfo')); // 把字符串转换成对象
      var htmlStr = template('tp_aside_avatar',tcInfo);  // 拼接模板字符串
      $('.aside>.profile').html(htmlStr); //渲染模板
    }
          //退出功能
          $('#logoutBtn').on('click',function (){
          // alert(123);
          $.ajax({
            url:'/api/logout',
            type:'post',
            success:function (info){
              if(info.code ==200){
                alert('退出成功');
                //退出成功之跳转到登陆页面
                location.href = '/login';
              }
            }
        })
    })

    //侧边栏的交互功能
    $('.navs a+ul').prev().on('click',function (){
        $(this).next().slideToggle();
    })


    //所有的页面跳转都会执行，因此需要 添加在common.js当中
    NProgress.start();
    NProgress.done();

    //如果想让每一次的请求也有这个效果的话，则需要添加上
    $(document).ajaxStart(function (){
      NProgress.start();
    });
    $(document).ajaxStop(function (){
      NProgress.done();
    })
	});

/**
 * Created by Administrator on 2017/7/17.
 */
define(['utils','jquery','template','bootstrap','form'],function (utils,$,template,bt){
    // 根据url中的id，去数据库查询数据，获取值
   var id = utils.queryString().cs_id;
   // 点到lesson那里是有动态内容的 所以一开始就用了ajax
  renderLesson();

  //2. 当我们单击添加按钮的时候，要显示模态框(自己设置对象,里面包括actionUrl:接口地址), 直接用自己设置的数据渲染
  $('.steps').on('click','#addLesson',function (){
      var htmlStr = template('cs_modal_tpl',{
        title:'课时添加',
        savaBtnText:'添加',
          //只是设置了路径  这次渲染没经过后台
        actionUrl:'/api/course/chapter/add'
      });
        //数据要放入模态框内部  看结构
      $('#editPanel').html(htmlStr);
        //因为一开始是什么都没有的  所以要显示最大的模态框
         $('#lesson').modal();
  });
  var id = utils.queryString().cs_id;
  renderLesson();
  $('.steps').on('click','#addLesson', function () {
    var htmlStr = template('cs_modal_tpl',{
      title:'课时添加'
    })
  })
  //3. 当我们单击编辑按钮的时候，要显示当前课程的所有信息在模态框上
  $('.steps').on('click','#editBtn',function (){
         //把当前章节的内容 信息，渲染在模板 上  添加按钮就一个  编辑多个肯定要绑定id 结构那里给父元素设置了id
    var ct_id = $(this).parent().attr('data-id');
      $.ajax({
        //点编辑的时候出现的模态框是有数据的 而点添加出现的模态框都是相同而且没数据的  所以上面的模态框渲染无需ajax  而下面要
        url:'/api/course/chapter/edit',
        type:'get',
        data:{
          ct_id:ct_id
        },
        success:function (info){
          //下面的模板这样设置是为了吧后台数据和自己设置的一起拼接模板,下面只是给了指向  还没真正第二次发送请求
          info.result.title = '课时编辑';
          info.result.savaBtnText = '保存';
          //modify 修改课时
          info.result.actionUrl = '/api/course/chapter/modify'
           if(info.code==200){
             var htmlStr= template('cs_modal_tpl',info.result);
             $('#editPanel').html(htmlStr);

             //显示模态框
             $('#lesson').modal();
           }
        }
      });
  })

  //4. 单击保存按钮的时候，要把当前的信息内容提交给服务器
  $('#editPanel').on('click','#saveBtn',function (){
    var ct_is_free  =Number($('#ct_is_free').prop('checked')); //将复选框的状态，转换成number类型
         // ct  chapter 章节
    $('form').ajaxSubmit({
      //点保存的时候没必要设置url了  因为上面设置了actionUrl
      // url:'/api/course/chapter/add',
      type:'post',
      data:{
        ct_is_free:ct_is_free,
        //最终把表中数据提交到后台  这个不是为了区分按钮的  是区分课程的  所以用总id
        ct_cs_id:id
      },
      success:function (info){
        if(info.code==200){
          alert('操作成功');

          // 重新渲染页面
          renderLesson();
          //渲染完后隐藏模态框
          $('#lesson').modal('hide');
        }

      }
    })
  });//on


  /**
   * 封装了一个刷新当前页面的函数
   */
  function renderLesson(){
    $.ajax({
      url:'/api/course/lesson',
      type:'get',
      data:{
        cs_id:id
      },
      success:function (info){
        // 渲染模板
        var htmlStr = template('cs_lesson_tpl',info.result);
        $('.steps').html(htmlStr);
      }
    })
  }
})
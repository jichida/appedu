﻿Router.route('/', function () {
  console.log("index html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  this.render('home', {to: 'content'});
});

Router.route('/login', function () {
  this.redirect("/login/0");
});


Router.route('/login/:id',function(){
  console.log("login html");
  this.render('login',{data:{id:this.params.id}});
});

var getchildrenfromuser = function(userid){
  var mychildlist = [];

  dbUserchildren.find({userid:userid}).forEach(
    function(userchildren){
      var child = dbChildren.findOne(userchildren.childid);
        if(child){
          var schoolname = '';
          var classtermname = '';
          var schoolid = child.schoolid;
          var curclasstermid = child.curclasstermid;
          if(schoolid){
            schoolname = dbSchools.findOne(schoolid).name;
          }
          if(curclasstermid){
            classtermname = dbClassterms.findOne(curclasstermid).name;
          }

          mychildlist.push({
            childid:userchildren.childid,
            releationshipname:userchildren.releationshipname,
            schoolname:schoolname,
            classtermname:classtermname,
            schoolid:schoolid,
            curclasstermid:curclasstermid,
            childname:child.truename
          });
        }
      });
      console.log("mychildlist:" + EJSON.stringify(mychildlist));
      return mychildlist;
};

Router.route('/loginselectchild',function(){
  var mychildlist = getchildrenfromuser(Meteor.userId());
  this.render('loginselectchild',{data:{mychildlist:mychildlist}});
});

Router.route('/loginselectclassterm',function(){
  this.render('loginselectclassterm');
});

Router.route('/createclasstermsetschool/:returnurl',function(){
  var data = {
    returnurl: this.params.returnurl,
  };
  this.render('createclasstermsetschool', {data: data});
});

Router.route('/createclasstermsetclassterm/:schoolid/:returnurl',function(){
  var classterms = [];
  var schoolname = '';
  var schoolid =  this.params.schoolid;
  if(schoolid){
    schoolname = dbSchools.findOne(schoolid).name;
  }
  dbclassterms = dbClassterms.find({schoolid:schoolid});
  dbclassterms.forEach(function(cls){
    classterms.push(cls);
  });
  var data = {
    schoolname:schoolname,
    classterms:classterms,
    returnurl: this.params.returnurl,
    schoolid: schoolid,
  };
  this.render('createclasstermsetclassterm', {data: data});
});

//================================================================

Router.route('/register/:id',function(){//注册
  console.log("register html");
  // this.layout('mainlayout');
  // this.render('navbar', {to: 'navbar'});
  // this.render('login', {to: 'content'});
  if(this.params.id == "0"){
    this.render('register',{data:{isparentversion:true,id:this.params.id}});
  }
  else{
    this.render('register',{data:{isteacherversion:true,id:this.params.id}});
  }

});

Router.route('/retrievepassword/:id',function(){//忘记密码
    this.render('retrievepassword',{data:{id:this.params.id}});
});


Router.route('/profile', function () {
    if (Meteor.user()) {
      console.log("判断角色登录 login");
      if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
        console.log("parent(家长) login");
      }
      if (Roles.userIsInRole(Meteor.user(), ['schoolmaster'])) {
        console.log("schoolmaster(园长) login");
      }
      if (Roles.userIsInRole(Meteor.user(), ['teacher'])) {
        console.log("teacher(老师) login");
      }
      if (Roles.userIsInRole(Meteor.user(), ['headerteacher'])) {
        console.log("headerteacher(班主任) login");
      }

      var truename = Meteor.user().username;
      if(Meteor.user().profile){
        truename = Meteor.user().profile.truename;
      }
      var data = {
        username:truename
      };
      this.layout('mainlayout');
      this.render('navbar', {to: 'navbar'});
      this.render('profile', {to: 'content',data:data});
    }
    else{
      this.redirect("/login");
    }
});

Router.route('/parentsletters',function(){
  //家长信首页
  console.log("parentsletters html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  var parentslettersrecv = [];
  var parentsletterssend = [];

  var lrecvlst = dbparentslettersrecv.find({recvuserid:Meteor.userId()});
  lrecvlst.forEach(function(dbrv){
        parentslettersrecv.push(dbrv);
  });

  var lsendlst = dbparentsletterssend.find({createuserid:Meteor.userId()});
  lsendlst.forEach(function(dbsd){
        parentsletterssend.push(dbsd);
  });

  var data ={
    parentslettersrecv:parentslettersrecv,
    parentsletterssend:parentsletterssend
  }
  console.log("parentsletters:"+EJSON.stringify(data));
  this.render('parentsletters', {to: 'content',data:data});
});

Router.route('/sendletter',function(){
  this.render('sendletter');
});

Router.route('/sendletter/:id',function(){
  //新建家长信
  var data = {
      recvid : this.params.id,
  };
  this.render('sendletter', {data: data});
});

Router.route('/parentsletterssendinfo/:id',function(){
  //新建家长信
  var data = dbparentsletterssend.findOne({_id:this.params.id});
  this.render('parentsletterssendinfo', {data: data});
});

Router.route('/parentslettersrecvinfo/:id',function(){
  //新建家长信
  var data = dbparentslettersrecv.findOne({_id:this.params.id});
  this.render('parentslettersrecvinfo', {data: data});
});


Router.route('/changepassword');//修改密码

//我的孩子列表
Router.route('/childlist',function(){
    var childlist = getchildrenfromuser(Meteor.userId());
    var data = {
      childlist:childlist,
    }
    console.log("children:" + EJSON.stringify(data));
    this.render('childlist', {data: data});
});


//------------------------------------------------------------
//新增孩子
Router.route('/newchild/:returnurl',function(){
	var data = {
		returnurl: this.params.returnurl,
	};
	this.render('newchild', {data: data});
});

Router.route('/newchildsetschool/:childid/:returnurl',function(){
	var data = {
		returnurl: this.params.returnurl,
    childid:this.params.childid,
	};
	this.render('newchildsetschool', {data: data});
});

Router.route('/newchildsetclassterm/:childid/:schoolid/:returnurl',function(){
	var data = {
		returnurl: this.params.returnurl,
    childid:this.params.childid,
    schoolid:this.params.schoolid,
	};
	this.render('newchildsetclassterm', {data: data});
});

Router.route('/editchild/:childid/:returnurl',function(){
  var child = dbChildren.findOne(this.params.childid);
	var data = {
		returnurl: this.params.returnurl,
    childid:this.params.childid,
	};
  data = _.extend(child,data);
	this.render('editchild', {data: data});
});
//------------------------------------------------------------


//--------------------------------
Router.route('/myclassterm',function(){
  //<----------------
  // <td>{{classname}}</td>
  // <td>{{schoolname}}</td>
  this.render('myclassterm');
});

// Router.route('/createclassterm',function(){
//   var schools = [];
//   var dbschools = dbSchools.find();
//   dbschools.forEach(function(sc){
//     schools.push(sc);
//   });
//   var data = {
//     schools:schools,
//   };
//
//   console.log("createclassterm:" + EJSON.stringify(data));
//   this.render('createclassterm', {data: data});
// });

Router.route('/studentslist',function(){
  console.log("studentslist:" + EJSON.stringify(Session.get('curclassterm')));

  var classtermid = Meteor.user().profile.curclasstermid;
  var classtermname = dbClassterms.findOne(classtermid).name;

    console.log("classtermname:" + classtermname);
    var studentslist = dbClassterms.findOne(classtermid).studentslist;
    var children = [];
    if(studentslist){
      for ( var i = 0;i < studentslist.length; i++){
         var student = studentslist[i];
         var child = {
           childid:student.childid,
           childname:student.childname,
           parentname:student.parentlist[i].truename,
           parentuser:student.parentlist[i].username,
         };
         children.push(child);
      }
    }



  var data = {
    classtermname:classtermname,
    classtermid:classtermid,
    children:children
  };
  console.log("studentslist:" + EJSON.stringify(data));
  this.render('studentslist', {data: data});
});
Router.route('/basicinfo');

Router.route('/teachplan',function(){

  var getteachplanlist = function(offsetweekdays){
    var teachplanlist = [];
    var mcurdate = moment();
    var curweekdate = mcurdate.day();
    if(curweekdate == 0){
      curweekdate = 7;
    }

    if(offsetweekdays < 0){
      var thisweekbegin = moment().subtract({days:curweekdate+6});
      var thisweekend = moment().subtract({days:curweekdate});
    }
    else if(offsetweekdays == 0){
      var thisweekbegin = moment().subtract({days:curweekdate-1});
      var thisweekend = moment().add({days:7-curweekdate});
    }
    else{
      var thisweekbegin = moment().add({days:curweekdate+6});
      var thisweekend = moment().add({days:14-curweekdate});
    }

    var curdate = mcurdate.format('YYYY-MM-DD');
    var startdate =  thisweekbegin.format('YYYY-MM-DD');
    var enddate = thisweekend.format('YYYY-MM-DD');
    console.log("curdate:"+curdate +",curweekdate:"+curweekdate+",thisweekbegin:" + startdate + ",thisweekend:"+ enddate);
  //  .add(1, 'day');
   var schoolid = Meteor.user().profile.curschoolid;
   var classtermid = Meteor.user().profile.curclasstermid;


    var querycondition =
    {
      schoolid:schoolid,
      classtermid:classtermid,
      teachdate:{
        $gte:startdate,
        $lte:enddate,
      }
    };
    var weekdaysFull= [ '星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日'];
    console.log("query:" + EJSON.stringify(querycondition));
    dbTeachplans.find(querycondition).forEach(function(plan){

      var dayindexweekdate = moment(plan.teachdate).day();
      if(dayindexweekdate == 0){
        dayindexweekdate = 7;
      }
      //weekname/teachername/teachcontent
      teachplanlist.push({
        index:dayindexweekdate,
        weekname:weekdaysFull[dayindexweekdate-1],
        teachername:plan.teachername,
        teachcontent:plan.teachcontent
      });
    });
    console.log("teachplanlist:" + EJSON.stringify(teachplanlist));
    return teachplanlist;
  };
//------------------------------------------------------------------------
  var data = {
    lasteachplanlist:getteachplanlist(-7),
    thiseachplanlist:getteachplanlist(0),
    nexteachplanlist:getteachplanlist(7),
  }
  console.log("teachplan:" + EJSON.stringify(data));
  this.render('teachplan', {data: data});
});
//Router.route('/profile');
//Router.route('/parentsletters');
Router.route('/evaluation');
Router.route('/checkinout');

Router.route('/activities',function(){
  var activitylist = [];
  var schoolid = Meteor.user().profile.curschoolid;
  var classtermid = Meteor.user().profile.curclasstermid;

  console.log("schoolid:" + schoolid +",classid:" + classtermid);
  //下面有很多过滤条件，学校和班级
  dbActivities.find({schoolid:schoolid}).forEach(function(act){
    if(act == 'class'){
      if ( act.classtermid == 'classtermid'){
        activitylist.push(act);
      }
    }
    else{
      activitylist.push(act);
    }

  });
  var data = {
    returnurl:'',
    activitylist:activitylist
  }
  this.render('activities', {data: data});
});

Router.route('/activityinfo/:id',function(){
  var actinfo = dbActivities.findOne(this.params.id);
  this.render('activityinfo', {data: actinfo});
});

Router.route('/newactivity',function(){
  var data = {
    returnurl:'activities'
  }
  this.render('newactivity', {data: data});
});
//-------------------------------------------------------------
Router.route('/foods',function(){

  var getfoodlist = function(offsetweekdays){
    var foodlist = [];
    var mcurdate = moment();
    var curweekdate = mcurdate.day();
    if(curweekdate == 0){
      curweekdate = 7;
    }

    if(offsetweekdays < 0){
      var thisweekbegin = moment().subtract({days:curweekdate+6});
      var thisweekend = moment().subtract({days:curweekdate});
    }
    else if(offsetweekdays == 0){
      var thisweekbegin = moment().subtract({days:curweekdate-1});
      var thisweekend = moment().add({days:7-curweekdate});
    }
    else{
      var thisweekbegin = moment().add({days:curweekdate+6});
      var thisweekend = moment().add({days:14-curweekdate});
    }

    var curdate = mcurdate.format('YYYY-MM-DD');
    var startdate =  thisweekbegin.format('YYYY-MM-DD');
    var enddate = thisweekend.format('YYYY-MM-DD');
    console.log("curdate:"+curdate +",curweekdate:"+curweekdate+",thisweekbegin:" + startdate + ",thisweekend:"+ enddate);
  //  .add(1, 'day');
    var schoolid = Meteor.user().profile.curschoolid;
    var classtermid = Meteor.user().profile.curclasstermid;

    var querycondition =
    {
      schoolid:schoolid,
      fooddate:{
        $gte:startdate,
        $lte:enddate,
      }
    };
    var weekdaysFull= [ '星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日' ];
    console.log("query:" + EJSON.stringify(querycondition));
    dbFoods.find(querycondition).forEach(function(food){

      var dayindexweekdate = moment(food.fooddate).day();
      if(dayindexweekdate == 0){
        dayindexweekdate = 7;
      }
      //weekname/teachername/teachcontent
      foodlist.push({
        index:dayindexweekdate,
        weekname:weekdaysFull[dayindexweekdate-1],
        foodname:food.foodname,
        content:food.content
      });
    });
    console.log("foodlist:" + EJSON.stringify(foodlist));
    return foodlist;
  };
//------------------------------------------------------------------------
  var data = {
    lastfoodlist:getfoodlist(-7),
    thisfoodlist:getfoodlist(0),
    nextfoodlist:getfoodlist(7),
  }
  console.log("foodlist:" + EJSON.stringify(data));
  this.render('foods', {data: data});

});

Router.route('/foodinfo/:id',function(){
  var food = foodlist.findOne(this.params.id);
  this.render('foodinfo', {data: food});
});

Router.route('/newfood',function(){
  var data = {
    returnurl:'foods'
  }
  this.render('newfood', {data: data});
});
//---------------------------------------------
Router.route('/classmanagement');
Router.route('/cxw');
//Router.route('/memberindex');
//Router.route('/register');
Router.route('/qaxq');
Router.route('/growth');
Router.route('/studentslistxq');
Router.route('/studentslistxg');

Router.route('/personal');
//Router.route('/sendletter');
Router.route('/publish');
Router.route('/activitiesfb');

Router.route('/classxz');
//Router.route('/changepassword');
Router.route('/questionnaire');
Router.route('/news');
Router.route('/mischiefxz');

Router.route('/redflowerslist',function(){
    console.log("redflowerslist.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    this.render('redflowerslist', {to: 'content'});
});

Router.route('/redflowerslistxq/:id',function(){
    console.log("redflowerslist.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    var flowerslist = dbRedflowerslist.findOne({'_id':this.params.id});
    var data = {
        'flowerlistid':this.params.id,
        'childname':flowerslist.childname,
        'flowerscount':flowerslist.redflowerlist.length,
        'redflowerslist':flowerslist.redflowerlist
    };
    this.render('redflowerslistxq', {to: 'content', data : data});
});

Router.route('/redflowerslistxz/:id',function(){
    console.log("redflowerslist.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    var data = {
        'flowerlistid':this.params.id,
        'happendtime':'2015-09-15 20:30:00'
    };
    this.render('redflowerslistxz', {to: 'content',data : data});
});

Router.route('/mischief',function(){
    console.log("mischief.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    this.render('mischief', {to: 'content'});
});

Router.route('/mischiefxq/:id',function(){
    console.log("mischiefxq.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    var flowerslist = dbRedflowerslist.findOne({'_id':this.params.id});
    var data = {
        'flowerlistid':this.params.id,
        'childname':flowerslist.childname,
        'flowerscount':flowerslist.blackflowerlist.length,
        'blackflowerslist':flowerslist.blackflowerlist
    };
    this.render('mischiefxq', {to: 'content', data : data});
});

Router.route('/mischiefxz/:id',function(){
    console.log("mischiefxz.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    var data = {
        'flowerlistid':this.params.id,
        'happendtime':'2015-09-15 20:30:00'
    };
    this.render('mischiefxz', {to: 'content',data : data});
});

Router.route('/qa',function(){
    console.log("qa.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    this.render('qa', {to: 'content'});
});

Router.route('/question',function(){
    console.log("question.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    this.render('question', {to: 'content'});
});

Router.route('/qaxq/:id',function(){
    console.log("qa.html");
    this.layout('mainlayout');
    this.render('navbar', {to: 'navbar'});
    var data = {
        'qaid':this.params.id
    };
    this.render('qaxq', {to: 'content',data : data});
});

Router.route('/sp');
Router.route('/dlls');

Router.route('/', function () {
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

Router.route('/loginselectchild',function(){
  var mychildlist = [];
  var children = Meteor.user().children;
  if(children){
    for( var i=0;i <children.length; i++){
      var curclasstermid = dbChildren.findOne(children[i].childid).curclasstermid;
      var child = {
        childid:children[i].childid,
        childtruename:children[i].childname,
        curclasstermname:dbClassterms.find(curclasstermid).name,
      }
      mychildlist.push(child);
    }
  }
  this.render('loginselectchild',{data:{mychildlist:mychildlist}});
});

Router.route('/loginselectclassterm',function(){
  var classtermlist = [];
  // var curclasstermid = Meteor.user().curclasstermid;
  // var children = Meteor.user().curclasstermid;
  // for( var i=0;i <children.length; i++){
  //   var curclasstermid = dbChildren.findOne(children[i].childid).curclasstermid;
  //   var child = {
  //     childtruename:children[i].childname,
  //     curclasstermname:dbClassterms.find(curclasstermid).name,
  //   }
  //   mychildlist.push(child);
  // }
  this.render('loginselectclassterm',{data:{classtermlist:classtermlist}});
});


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
        if(Meteor.user().children){
          console.log("parent(家长) children:" + EJSON.stringify(Meteor.user().children));
          if(Meteor.user().children.length){
            var childid = Meteor.user().children[0].childid;
            Meteor.subscribe("curclassterm",childid,function(){
                Session.set('curclassterm',dbClientClassterm.findOne());
                console.log("loginin,get session:" + EJSON.stringify(Session.get('curclassterm')));
            });
          }
        }
      }
      if (Roles.userIsInRole(Meteor.user(), ['schoolmaster'])) {
        console.log("schoolmaster(园长) login");
      }
      if (Roles.userIsInRole(Meteor.user(), ['teacher'])) {
        console.log("teacher(老师) login");
      }
      if (Roles.userIsInRole(Meteor.user(), ['headerteacher'])) {
        console.log("headerteacher(班主任) login");
        Meteor.subscribe("curclassterm","",function(){
          Session.set('curclassterm',dbClientClassterm.findOne());
          console.log("loginin,get session:" + EJSON.stringify(Session.get('curclassterm')));
        });
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
    var childreninfo = [];
    if(Meteor.user().children){
      var  children = Meteor.user().children;
      for (var i =0 ;i < children.length; i++){
        var childinfo = {
          childname:children[i].childname,
          schoolname:'',
        }
        childreninfo.push(childinfo);
      }
    }
    var data = {
      childreninfo:childreninfo,
    }
    console.log("children:" + EJSON.stringify(data));
    this.render('childlist', {data: data});
});

//新增孩子
Router.route('/newchild/:returnurl',function(){
  var schools = [];
  var classterms = [];
  var dbschools = dbSchools.find();
  dbschools.forEach(function(sc){
    schools.push(sc);
  });
  dbclassterms = dbClassterms.find();
  dbclassterms.forEach(function(cls){
    classterms.push(cls);
  });

  var data = {
    returnurl:this.params.returnurl,
    schools:schools,
    classterms:classterms,
  };

  console.log("new child:" + EJSON.stringify(data));
  this.render('newchild', {data: data});
});

Router.route('/myclassterm',function(){
  //<----------------
  // <td>{{classname}}</td>
  // <td>{{schoolname}}</td>
  var classtermname = '';
  var schoolname = '';
  if(Session.get('curclassterm')){
    classtermname = Session.get('curclassterm').classtermname;
    schoolname = Session.get('curclassterm').schoolname;
  }
  var data = {
    classname:classtermname,
    schoolname:schoolname,
  }
  this.render('myclassterm', {data: data});
});

Router.route('/createclassterm',function(){
  var schools = [];
  var dbschools = dbSchools.find();
  dbschools.forEach(function(sc){
    schools.push(sc);
  });
  var data = {
    schools:schools,
  };

  console.log("createclassterm:" + EJSON.stringify(data));
  this.render('createclassterm', {data: data});
});

Router.route('/studentslist',function(){
  console.log("studentslist:" + EJSON.stringify(Session.get('curclassterm')));

  var classtermname = '';
  var classtermid = '';
  if(Session.get('curclassterm')){
    classtermname = Session.get('curclassterm').classtermname;
    classtermid = Session.get('curclassterm').classtermid;

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

Router.route('/teachplan');
//Router.route('/profile');
//Router.route('/parentsletters');
Router.route('/evaluation');
Router.route('/checkinout');

Router.route('/activities',function(){
  var activitylist = [];
  //下面有很多过滤条件，学校和班级
  dbActivities.find().forEach(function(act){
    activitylist.push(act);
  });
  var data = {
    returnurl:'',
    activitylist:activitylist
  }
  this.render('activities', {data: data});
});

Router.route('/newactivity',function(){
  var data = {
    returnurl:'activities'
  }
  this.render('newactivity', {data: data});
});

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

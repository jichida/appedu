Router.route('/', function () {
  console.log("index html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  this.render('home', {to: 'content'});
});

Router.route('/login',function(){
  console.log("login html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  this.render('login', {to: 'content'});
});

Router.route('/profile', function () {
    if (Meteor.user()) {
      console.log("判断角色登录 login");
      if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
        if(Meteor.user().children){
          console.log("parent(家长) children:" + EJSON.stringify(Meteor.user().children));
          if(Meteor.user().children.length){
            var childid = Meteor.user().children[0]._id;
            console.log("child:" + childid);
            var child = dbChildren.find({_id:childid});
            if(child){
              Session.set('classtermid',child.curclasstermid);
            }
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
      }

      var data = {
        username:Meteor.user().username,
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

  var dbparentslettersrecv = dbparentslettersrecv.find();
  dbparentslettersrecv.forEach(function(dbrv){
        parentslettersrecv.push(dbrv);
  });

  var dbparentsletterssend = dbparentsletterssend.find();
  parentsletterssend.forEach(function(dbsd){
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
  var data = {
    classtermid : parent('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/sendletter/:id',function(){
  //新建家长信
  var data = {
      recvid : this.params.id,
      classtermid : parent('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/parentslettersinfo/:id',function(){
  //新建家长信
  var data = {
      recvid : this.params.id,
      classtermid : parent('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/studentslist');
Router.route('/teachplan');
Router.route('/redflowerslist');
Router.route('/qa');
//Router.route('/profile');
//Router.route('/parentsletters');
Router.route('/parentscommunity');
Router.route('/evaluation');
Router.route('/checkinout');
Router.route('/activities');
Router.route('/classmanagement');
Router.route('/cxw');
//Router.route('/memberindex');
Router.route('/register');
Router.route('/question');
Router.route('/qaxq');
Router.route('/growth');
Router.route('/redflowerslistxq');
Router.route('/studentslistxq');
Router.route('/studentslistxg');

Router.route('/personal');
//Router.route('/sendletter');
Router.route('/publish');
Router.route('/activitiesfb');
Router.route('/mischief');
Router.route('/mischiefxq');
Router.route('/retrievepassword');
Router.route('/classxz');
//Router.route('/mischiefxz');
Router.route('/changepassword');
Router.route('/redflowerslistxz');
Router.route('/questionnaire');
Router.route('/news');
Router.route('/mischiefxz');

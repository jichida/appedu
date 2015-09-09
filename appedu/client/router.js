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

Router.route('/partentsletters',function(){
  //家长信首页
  console.log("partentsletters html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  this.render('partentsletters', {to: 'content'});
});

Router.route('/sendletter',function(){
  var data = {
    classtermid : Session.get('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/sendletter/:id',function(){
  //新建家长信
  var data = {
      recvid : this.params.id,
      classtermid : Session.get('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/partentslettersinfo/:id',function(){
  //新建家长信
  var data = {
      recvid : this.params.id,
      classtermid : Session.get('classtermid'),
  };
  this.render('sendletter', {data: data});
});

Router.route('/studentslist');
Router.route('/teachplan');
Router.route('/redflowerslist');
Router.route('/qa');
//Router.route('/profile');
//Router.route('/partentsletters');
Router.route('/partentscommunity');
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
Router.route('/sendletter');
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

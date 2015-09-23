Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',

});

Router.route('/', function () {
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminorders', {to: 'admincontent'});
});

Router.route('/changepassword',function(){
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('changepassword', {to: 'admincontent'});
});

//管理端首页
Router.route('/admin', function () {
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminorders', {to: 'admincontent'});
});

//新建幼儿园
// Router.route('/admin/addschool', function () {
//   console.log("admin addschool html");
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('addschool', {to: 'admincontent'});
//  // this.render('adminproductadd');
//  });
//
//
//  //新建班级
//  Router.route('/admin/addclassterm', function () {
//   console.log("admin addclassterm html");
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('addclassterm', {to: 'admincontent'});
//  //  this.render('addredpackage');
//  });
//
//    //修改幼儿园
//   Router.route('/admin/updateschool/:id', function () {
//   console.log("admin updateschool html,id:" + this.params.id);
//   var curschool = dbSchools.findOne({_id:this.params.id});
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('updateschool', {to: 'admincontent',data:{curredpackage:curredpackage}});
//
//  });
//
//  //老师详情
//   Router.route('/admin/adminuserinfo/:id', function () {
//   console.log("admin adminuserinfo html");
//   // this.render('addcoupon');
//   var curuser =  Meteor.users.findOne(this.params.id);
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('adminuserinfo', {to: 'admincontent',data:{curuser:curuser}});
//   //this.render('adminuserinfo',{data:{curuser:curuser}});
//  });

//==========================================================================
//幼儿园列表页面
Router.route('/admin/myschool', function () {
    console.log("admin myschool html");


    console.log("展示幼儿园");

   this.layout('adminmainlayout');
   this.render('adminnavbar', {to: 'adminnavbar'});
   this.render('myschool', {to: 'admincontent'});
});

//班级列表页面
Router.route('/admin/classterms', function () {
  console.log("admin navorders html");

  var classtermlist = [];
  console.log("展示订单:" + EJSON.stringify(classtermlist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('classterms', {to: 'admincontent',data:{classtermlist:classtermlist}});
});

//班主任列表页面
Router.route('/admin/headerteachers', function () {
  console.log("admin navusers html");
  var users = [];
  Meteor.users.find().forEach(function(ur){
      users.push(ur);
  });
  console.log("展示班主任:" + EJSON.stringify(users));
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('headerteachers', {to: 'admincontent',data:{users:users}});
});

//活动列表页面
Router.route('/admin/activities', function () {
  var activitylist = [];
  // SalesPromotions.find().forEach(function(sp){
  //     salespromotions.push(sp);
  // });
  console.log("展示活动:" + EJSON.stringify(activitylist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('activities', {to: 'admincontent',data:{activitylist:activitylist}});
});

//食谱列表页面
Router.route('/admin/foods', function () {
  var foods = [];
  // SalesPromotions.find().forEach(function(sp){
  //     salespromotions.push(sp);
  // });
  console.log("展示食谱:" + EJSON.stringify(foods));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('foods', {to: 'admincontent',data:{foods:foods}});
});
//转让所有者列表
// Router.route('/admin/navcoupons', function () {
//   var coupons = [];
//   Coupons.find().forEach(function(cn){
//       coupons.push(cn);
//   });
//   console.log("展示优惠券:" + EJSON.stringify(coupons));
//
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('admincoupons', {to: 'admincontent',data:{coupons:coupons}});
// });
//
// //我的申诉
// Router.route('/admin/navredpackages', function () {
//
//   var redpackages = [];
//   SystemRedPackages.find().forEach(function(rk){
//       redpackages.push(rk);
//   });
//   console.log("展示红包:" + EJSON.stringify(redpackages));
//
//   this.layout('adminmainlayout');
//   this.render('adminnavbar', {to: 'adminnavbar'});
//   this.render('adminredpackages', {to: 'admincontent',data:{redpackages:redpackages}});
// });


Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('login');
  }
  else {
    if(Roles.userIsInRole(Meteor.user(), ['headerteachers'])){
        this.next();
    }
    else{
      this.render('login');
    }
  }
});

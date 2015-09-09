
// 用户（家长，班主任，老师，园长）
// 园长新建幼儿园
// 班主任新建学期班级，挂靠在幼儿园
// 老师加入到班级
// 家长新建孩子
// 家长让孩子加入到该班级

// 家长：
// 用户名：partenttest
// 密码：123456
//
// 园长：
// 用户名：schoolmastertest
// 密码：123456
//
// 老师：
// 用户名：teachertest
// 密码：123456
//
//班主任：
//用户名：headerteachertest
//密码：123456
if(Meteor.isServer){

//var prerun = function(){
  //如果已经存在数据，想从头开始初始化，可以进入工程目录执行：meteor reset(清空数据库)
  if(Meteor.users.find().count() == 0){
    //<-----------------------------------------
    //新建用户
    var users =
      [
        {
          username:'parenttest',
          password:'123456',
          roles:['partent'],
        },
        {
          username:'schoolmastertest',
          password:'123456',
          roles:['schoolmaster'],
        },
        {
          username:'teachertest',
          password:'123456',
          roles:['teacher'],
        },
        {
          username:'headerteachertest',
          password:'123456',
          roles:['headerteacher'],
        },

      ];
      for(var i = 0;i < users.length; i++){
         var userid =  Accounts.createUser(users[i]);
         if (users[i].roles.length > 0) {
           Roles.addUsersToRoles(userid, users[i].roles);
         }
         console.log("create user ok:" + userid);
      }
    };

    if(dbSchools.find().count() == 0){
      //<---------------------------------------------
      var usrschoolmaster = Meteor.users.findOne({username:'schoolmastertest'});
      //1>园长新建幼儿园
      var schoolDoc = {
        name:'常州武进锦绣幼儿园',
        address:'常州武进永胜中路100号',
        createdate:'2011-02-12',
        createuserid:usrschoolmaster._id,
        createusername:usrschoolmaster.username
      };
      Meteor.call('insertSchool', schoolDoc);
    }

    if(dbClassterms.find().count() == 0){
       //2>班主任新建学期班级，挂靠在幼儿园
        var usrheaderteacher = Meteor.users.findOne({username:'headerteachertest'});
        var schoolId = dbSchools.findOne()._id;
        var classtermDoc = {
          name:'小三班上半学期',
          termbegin:'2015-02-03',
          termend:'2015-06-30',
          headerteacherid:usrheaderteacher._id,
          headerteachername:usrheaderteacher.username,
          childrencount:0,
          schoolid:schoolId,
          schoolname:schoolDoc.name,
          createuserid:usrheaderteacher._id,
        };
        Meteor.call('insertClassterm', classtermDoc);
        //老师。班主任加入班级
        var curclasstermid = dbClassterms.findOne()._id;
        var workroom = [
          {
            schoolid:workroom,
            classterms:
              [
                { classtermsid:curclasstermid }
              ]


          }
        ];
        //todo
      }

      if(dbChildren.find().count() == 0){
        //家长新建孩子
        var usrparent = Meteor.users.findOne({username:'parenttest'});
        var childDoc = {
          truename:'张倩',
          sex:'female',
          birthday:'2015-06-23',
          curclasstermid:curclasstermid,
          archiveclassterms:[],
          createuserid:usrparent._id,
          createusername:usrparent.username
        }
        Meteor.call('insertChild', childDoc);
    }
//};
//prerun();
};

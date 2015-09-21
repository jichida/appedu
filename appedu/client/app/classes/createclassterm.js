Template.createclassterm.events({
    "click #btncreateclass": function () {
      console.log("click btn btncreateclass");
      event.preventDefault();

      var selschooltypestring = $("#selschool").find("option:selected").text();
      var selschooltypevalue = $("#selschool").val();

      var classtermname = $("#classtermname").val();

      var classtermDoc = {
        name:classtermname,
        termbegin:'2015-06-07',
        termend:'2015-10-23',
        headerteacherid:Meteor.userId(),
        headerteachername:Meteor.user().profile.truename,
        childrencount:0,
        schoolid:selschooltypevalue,
        schoolname:selschooltypestring,
        createuserid:Meteor.userId(),
      };
      Meteor.call('insertClassterm',Meteor.user(),classtermDoc, function(error,result){
        if(error){
          alert(error.reason);
        }
        else{
          Meteor.subscribe("curclassterm","",function(){
            Session.set('curclassterm',dbClientClassterm.findOne());
            console.log("loginin,get session:" + EJSON.stringify(Session.get('curclassterm')));
            Router.go('/myclassterm');//登录成功
          });          
        }
      });
    //teacherwithclassterm

        // var username =  $('#username').val();
        // var password =  $('#password').val();
        // Meteor.loginWithPassword(username,password, function (error) {
        //   if(error){
        //      alert(error.reason);
        //      console.log(error.reason);
        //     // FlashMessages.sendError(error.reason);
        //   }
        //   else{
        //     Router.go('/profile');//登录成功
        //   }
        // });
    },
  });

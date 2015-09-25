Template.loginselectchild.events({
    "click #btnenter": function () {
      console.log("click btn sign");
      event.preventDefault();
      Router.go('/profile');//登录成功
      // var username =  $('#username').val();
      // var password =  $('#password').val();
      // Meteor.loginWithPassword(username,password, function (error) {
      //   if(error){
      //      alert(error.reason);
      //      console.log(error.reason);
      //     // FlashMessages.sendError(error.reason);
      //   }
      //   else{
      //     if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
      //       Router.go('/loginselectchild');//登录成功
      //     }
      //     else if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])) {
      //       Router.go('/loginselectclassterm');//登录成功
      //     }
      //   }

    },
    'click #btnselectchild':function(){
        console.log("select child:" + this.childid + ",this childtruename:" + this.childtruename);
    }
  });

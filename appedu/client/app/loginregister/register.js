Template.register.events({
    "click #btngetauthcode": function () {
      console.log("click btn btngetauthcode");
      event.preventDefault();
      var phonenumber =  $('#phonenumber').val();
      Meteor.call('getauthcode',phonenumber,function(error, result){
        if(error){
          alert(error.reason);
        }
        else{
          console.log("getauthcode:" +EJSON.stringify(result));
          Session.set('registerauthcode',result);
        }

      });
    },
    "click #btnregisterparent": function () {
      console.log("click btn sign");
      event.preventDefault();
      var truename =  $('#truename').val();
      var phonenumber =  $('#phonenumber').val();
      var authcode = $('#authcode').val();
      var password = $('#password').val();
      var sessionauthcode = Session.get('registerauthcode');
      if(sessionauthcode){
        if(sessionauthcode.phonenumber == phonenumber && sessionauthcode.authcode == authcode ){

        }
        else{
          alert("验证码错误，请重新获取");
          return;
        }
      }
      else{
        alert("请先获取验证码");
        return;
      }

      var newuser =
      {
        username:phonenumber,
        password:password,
        truename:truename,
      };
      Meteor.call('createuser',newuser,['parent'], function(error,result){
        if(error){
          alert(error.reason);
        }
        else{
          Router.go('/profile');//登录成功
        }
      });

    },
    "click #btnregisterheadteacher": function () {
      console.log("click btn sign");
      event.preventDefault();
      var truename =  $('#truename').val();
      var phonenumber =  $('#phonenumber').val();
      var authcode = $('#authcode').val();
      var password = $('#password').val();
      var sessionauthcode = Session.get('registerauthcode');
      if(sessionauthcode){
        if(sessionauthcode.phonenumber == phonenumber && sessionauthcode.authcode == authcode ){

        }
        else{
          alert("验证码错误，请重新获取");
          return;
        }
      }
      else{
        alert("请先获取验证码");
        return;
      }

      var newuser =
      {
        username:phonenumber,
        password:password,
        truename:truename,
      };

      Meteor.call('createuser',newuser,['headerteacher'], function(error,result){
        if(error){
          alert(error.reason);
        }
        else{
          Router.go('/profile');//登录成功
        }
      });

    },
  });
Template.register.onRendered(function () {
	//单选框
	var l = $('.jcd_form_selone')
});

Meteor.methods({
    'getauthcode': function(phonenumber){
       var authcode = "";
       for (var i=0;i<6;i++){
         authcode += Random.choice("0123456789");
       }
       console.log("手机号:【"+phonenumber+"】获得的验证码为：【"+authcode+"】请勿泄露");
       return {
         phonenumber:phonenumber,
         authcode:authcode
       };
    },
  });

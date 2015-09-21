Meteor.methods({
    'getauthcode': function(phonenumber){
       var authcode = "";
       for (var i=0;i<4;i++){
         authcode += Random.choice("0123456789");
       }
       console.log("手机号:【"+phonenumber+"】获得的验证码为：【"+authcode+"】请勿泄露");
       return {
         phonenumber:phonenumber,
         authcode:authcode
       };
    },
    'createuser':function(userdoc,roles){
        var userid = Accounts.createUser(userdoc);
        console.log("userid:" + userid + ",doc:" + EJSON.stringify(userdoc) + ",roles:"+ EJSON.stringify(roles) );
        Roles.addUsersToRoles(userid,roles);
        Meteor.users.update({_id:userid}, { $set:{"profile.truename":userdoc.truename}} )

    },
  });

Template.addschool.events({
    'click #btnaddschool':function(){
      var name =  $("#name").val();
      var address =  $("#address").val();

      var schoolDoc = {
          name:name,
          address:address,
          createuserid:Meteor.user()._id,
          createuername:Meteor().user.profile.truename,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert schoolDoc:" + EJSON.stringify(schoolDoc));
      Meteor.call("insertSchool",schoolDoc);

      Router.go("/admin/myschool");

    }
});

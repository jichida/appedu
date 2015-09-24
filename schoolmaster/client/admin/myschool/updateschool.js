Template.updateschool.events({
    'click #btnupdateschool':function(){
      event.preventDefault();

      var name =  $("#name").val();
      var address =  $("#address").val();

      var schoolDoc = {
          name:name,
          address:address,
          createuserid:Meteor.user()._id,
          createusername:Meteor.user().profile.truename,
      }
      console.log("update schoolDoc:" + EJSON.stringify(schoolDoc));
      Meteor.call("updateSchool",this._id,schoolDoc);

      Router.go("/admin/myschool");

    }
});

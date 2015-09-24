Template.updatefood.events({
    'click #btnupdatefood':function(){
      event.preventDefault();

      var foodname =  $("#foodname").val();
      var fooddate =  $("#fooddate").val();
      var content =  $("#content").val();

      var schoolid =  dbSchools.findOne({createuserid:Meteor.user()._id})._id;
      var foodDoc = {
          foodname:foodname,
          fooddate:fooddate,
          content:content,
          schoolid:schoolid,
          createuserid:Meteor.user()._id,
      }
      console.log("update foodDoc:" + EJSON.stringify(foodDoc));
      Meteor.call("updatefood",this._id,foodDoc);

      Router.go("/admin/foods");

    }
});

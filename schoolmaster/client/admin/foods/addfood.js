Template.addfood.events({
    'click #btnaddfood':function(){
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
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert foodDoc:" + EJSON.stringify(foodDoc));
      Meteor.call("insertfood",foodDoc);

      Router.go("/admin/foods");

    }
});

Template.addfood.rendered=function() {
    $('#fooddate').pickadate();
}

Template.updateclassterm.events({
    'click #btnupdateclassterm':function(){
      event.preventDefault();

      var name =  $("#name").val();
      var termbegin =  $("#termbegin").val();
      var termend =  $("#termend").val();
      var headerteacherid = $("#headerteachertype").find("option:selected").text();
      var headerteachername = $("#headerteachertype").val();
      var schoolid =  dbSchools.findOne({createuserid:Meteor.user()._id})._id;
      var schoolname =  dbSchools.findOne({createuserid:Meteor.user()._id}).name;

      var classtermDoc = {
          name:name,
          termbegin:termbegin,
          termend:termend,
          headerteacherid:headerteacherid,
          headerteachername:headerteachername,
          createuserid:Meteor.user()._id,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
          schoolid:schoolid,
          schoolname:schoolname,
      }
      console.log("insert classtermDoc:" + EJSON.stringify(classtermDoc));
      Meteor.call("updateclassterm",this._id,classtermDoc);

      Router.go("/admin/classterms");

    }
});

Template.updateclassterm.rendered=function() {
  $('#termbegin').pickadate();
  $('#termend').pickadate();
}

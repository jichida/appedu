Template.addactivity.events({
    'click #btnaddactivity':function(){
      event.preventDefault();

      var title =  $("#title").val();
      var activitydate =  $("#activitydate").val();
      var content =  $("#content").val();

  //    var visiblerange = $("#visiblerange").find("option:selected").text();
      var visiblerange = $("#visiblerange").val();
      var schoolid =  dbSchools.findOne({createuserid:Meteor.user()._id})._id;
      var activityDoc = {
          title:title,
          activitydate:activitydate,
          content:content,
          visiblerange:visiblerange,
          schoolid:schoolid,
          createuserid:Meteor.user()._id,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert activityDoc:" + EJSON.stringify(activityDoc));
      Meteor.call("insertactivity",activityDoc);

      Router.go("/admin/activities");

    }
});

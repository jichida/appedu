Template.newchild.events({
    "click #btnaddclass": function () {
      console.log("click btn btnaddclass");
      event.preventDefault();
      var truename =  $('#truename').val();

      var selschooltypestring = $("#selschool").find("option:selected").text();
      var selschooltypevalue = $("#selschool").val();

      var selclasstypestring = $("#selclass").find("option:selected").text();
      var selclasstypevalue = $("#selclass").val();

      var childDoc = {
        truename:truename,
        sex:'female',
        birthday:'2015-06-23',
        curclasstermid:selclasstypestring,
        archiveclassterms:[],
        createuserid:Meteor.userId(),
        createusername:Meteor.user().username
      }
      Meteor.call('insertChild',Meteor.user(), childDoc);

    },
  });

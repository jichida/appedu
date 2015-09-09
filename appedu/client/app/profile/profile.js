Template.profile.events({
    "click #btnlogout": function(event){
        event.preventDefault();
        Meteor.logout();

      },
  });

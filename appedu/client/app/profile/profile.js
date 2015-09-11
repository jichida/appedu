Template.profile.events({
    "click #btnlogout": function(event){
        event.preventDefault();
        Meteor.logout();

      },
  });

  Template.profile.helpers({
    'isparent':function(){
      return  Roles.userIsInRole(Meteor.user(), ['parent']);
    },
    'isheaderteacher':function(){
      return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
    }
  });

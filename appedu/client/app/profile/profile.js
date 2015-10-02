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
    },
    'newrecvcount':function(){
      return dbparentslettersrecv.find({
        recvuserid:Meteor.userId(),
        isreaded:false
      }).count();
    }
  });

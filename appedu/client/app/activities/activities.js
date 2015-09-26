Template.activities.helpers({
  'isheaderteacher':function(){
    return Roles.userIsInRole(Meteor.user(), ['headerteacher']);
  },
  'visiblerangeisclass':function(){
    return this.visiblerange == 'class';
  }
});

Meteor.methods({
  'setSelChildid':function(selchildid,user){
      if (Roles.userIsInRole(user, ['parent'])) {
        var child = dbChildren.findOne(userchildren.childid);
        if(child){
          var schoolid = child.schoolid;
          var curclasstermid = child.curclasstermid;
          Meteor.users.update(user._id, { $set:
            {
              'profile.curschoolid':schoolid,
              'profile.curclasstermid':curclasstermid,
              'profile.curchildid':selchildid
            }} );
        }
      }
  },
  'setSelClasstermid':function(selclasstermid,user){
      if (Roles.userIsInRole(user, ['headerteacher'])) {
        var classterm = dbClassterms.findOne(selclasstermid);
        if(classterm){
          var schoolid = classterm.schoolid;
          Meteor.users.update(user._id, { $set:
            {
              'profile.curschoolid':schoolid,
              'profile.curclasstermid':selclasstermid,
            }} );
        }
      }
  },
});

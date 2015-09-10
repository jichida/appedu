Meteor.methods({
    'insertClassterm': function(user,classtermDoc){
       console.log("insertClassterm:" + EJSON.stringify(classtermDoc));
       var curclasstermid = dbClassterms.insert(classtermDoc);
       if (Roles.userIsInRole(user, ['headerteacher'])) {
         Meteor.users.update(user._id, {$set: {curclasstermid: curclasstermid}});
       }
     },
	});

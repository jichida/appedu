Meteor.methods({
    'insertChild': function(childDoc){
       console.log("insertchildDoc:" + EJSON.stringify(childDoc));
       var childid = dbChildren.insert(childDoc);
       //把孩子放入自己信息中
       if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
         var children = [];
         if(Meteor.user().children){
           children = Meteor.user().children;
         }
         var child = {
           childid:childid,
           childname:childname.truename,
         };
         children.push(child);
         Meteor.users.update(Meteor.userId(), {$set: {children: children}});
       }

     },
	});

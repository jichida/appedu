Meteor.methods({
    'insertChild': function(user,childDoc){
       console.log("insertchildDoc:" + EJSON.stringify(childDoc));
       var childid = dbChildren.insert(childDoc);
       //把孩子放入自己信息中
       if (Roles.userIsInRole(user, ['parent'])) {
         var children = [];
         if(user.children){
           children = user.children;
         }
         var child = {
           childid:childid,
           childname:childDoc.truename,
         };
         children.push(child);
         Meteor.users.update(user._id, {$set: {children: children}});
       }

     },
	});

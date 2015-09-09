Meteor.methods({
    'insertChild': function(childDoc){
       console.log("insertchildDoc:" + EJSON.stringify(childDoc));
       dbChildren.insert(childDoc);
     },
	});

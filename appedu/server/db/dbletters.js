Meteor.methods({
    'insertLetter': function(letterDoc){
       console.log("letterDoc:" + EJSON.stringify(letterDoc));
       dbparentsletterssend.insert(letterDoc);
     },
	});

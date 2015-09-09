Meteor.methods({
    'insertLetter': function(letterDoc){
       console.log("letterDoc:" + EJSON.stringify(letterDoc));
       dbPartentsletterssend.insert(letterDoc);
     },
	});

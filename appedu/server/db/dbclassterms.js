Meteor.methods({
    'insertClassterm': function(classtermDoc){
       console.log("insertClassterm:" + EJSON.stringify(classtermDoc));
       dbClassterms.insert(classtermDoc);
     },
	});

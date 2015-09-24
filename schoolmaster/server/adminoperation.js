Meteor.methods({
  'insertSchool': function(schoolDoc){
		console.log("insertSchool:" + EJSON.stringify(schoolDoc));
		dbSchools.insert(schoolDoc);
	},
  'updateSchool': function(id,schoolDoc){
		console.log("updateSchool:" + EJSON.stringify(schoolDoc));
		dbSchools.update(id,{$set: schoolDoc});
	},
  'insertclassterm':function(classtermDoc){
    console.log("insertclassterm:" + EJSON.stringify(classtermDoc));
		dbClassterms.insert(classtermDoc);
  },
  'updateclassterm':function(id,classtermDoc){
    console.log("updateclassterm:" + EJSON.stringify(classtermDoc));
		dbClassterms.update(id,{$set:classtermDoc});    
  },

});

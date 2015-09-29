Template.newchildsetclassterm.events({
	"click #btnaddclass": function () {
		console.log(EJSON.stringify(this.schools));
		console.log("click btn btnaddclass");
		event.preventDefault();

		var selclasstypestring = $("#selclass").find("option:selected").text();
		var selclasstypevalue = $("#selclass").val();
		var classtermid = selclasstypevalue;

		Meteor.call('addChildtoclassterm',classtermid, Meteor.user(), this.childid);
		Router.go('/' + this.returnurl);
	}

});

Template.newchildsetclassterm.helpers({
	'classterms':function(){
    var classterms = [];
		var schoolid = this.schoolid;
  	dbclassterms = dbClassterms.find({schoolid:schoolid});
  	dbclassterms.forEach(function(cls){
  		classterms.push(cls);
  	});
		return classterms;
	}
})

Template.newchild.events({
	"click #btnaddchild": function (event, tmpl) {
		console.log(EJSON.stringify(this.schools));
		console.log("click btn btnaddclass");
		event.preventDefault();
		var truename =  $('#truename').val();
		var sex = tmpl.find('input:radio[name=gender]:checked').value;
		var birthday =  $('#birthday').val();
		var childDoc = {
			truename:truename,
			sex:sex,
			birthday:birthday,
			archiveclassterms:[],
			createuserid:Meteor.userId(),
			createusername:Meteor.user().username
		}
		Meteor.call('insertChild', Meteor.user(), childDoc,function(error,result){
			if(!error){
				Router.go('/newchildsetschool/' + result +"/" + this.returnurl);
			}
			else{
				alert(error.reason);
			}
		});
	}
});

Template.newchild.rendered=function() {
    $('#birthday').pickadate();
}

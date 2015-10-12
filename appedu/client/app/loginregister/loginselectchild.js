Template.loginselectchild.events({
	"click #btnenter": function () {
		console.log("click btn sign");
		event.preventDefault();
		//var selclasstypestring = $("#selchild").find("option:selected").text();	
		//var selclasstypevalue = $("#selchild").val();
		//var selchildid = selclasstypestring;	
		var selchildid = $('#childId').val();
		Meteor.call('setSelChildid',selchildid, Meteor.user());
		Router.go('/' + this.returnurl);
	},
	'click #btnselectchild':function(){
		console.log("select child:" + this.childid + ",this childtruename:" + this.childtruename);
	},
	'click .jcd_btnselectchild li':function(){
		var id = this.childid;
		$('.jcd_btnselectchild li').removeClass('sel');
		$('.selchild_'+id).addClass('sel');
		$('#childId').val(id);
	}
});

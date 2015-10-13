Template.loginselectclassterm.events({
    'click #btncreateclassterm':function(){
        console.log("click btn btncreateclassterm");
        event.preventDefault();
        Router.go('/createclasstermsetschool/loginselectclassterm');
    },
    "click #btnenter": function () {
      console.log("click btn btnenter");
      event.preventDefault();

      var selclasstypestring = $("#selclass").find("option:selected").text();
      var selclasstypevalue = $("#selclass").val();
      var selclasstermid = selclasstypestring;

      Meteor.call('setSelClasstermid',selclasstermid, Meteor.user());
      Router.go('/');
    },
	'click .jcd_btnselectchild li':function(){
		var id = this.childid;
		$('.jcd_btnselectchild li').removeClass('sel');
		$('.selchild_'+id).addClass('sel');
		$('#selschoolid').val(id);
	}
  });

  Template.loginselectclassterm.helpers({
    'classtermlist':function(){
      var classtermlist = [];
      dbClassterms.find({headerteacherid:Meteor.userId()}).forEach(function(cls){
          var cls = {
            name:cls.name,
            schoolname:cls.schoolname,
          }
          classtermlist.push(cls);
      });
      return classtermlist;
    }
  })

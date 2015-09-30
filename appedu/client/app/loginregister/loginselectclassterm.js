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

Template.createclasstermsetclassterm.events({
    'click #btnaddclass':function(){
      event.preventDefault();
      var selschooltypestring = $("#selclass").find("option:selected").text();
      var selschooltypevalue = $("#selclass").val();
      var selclasstermid = selschooltypevalue;
      Meteor.call('setclasstermidtomyself',selclasstermid,Meteor.user());
      Router.go('/' + this.returnurl);//登录成功
    },
    "click #btncreateclass": function () {
      console.log("click btn btncreateclass");
      event.preventDefault();

     var classtermname = $("#classtermname").val();

      var classtermDoc = {
        name:classtermname,
        termbegin:'2015-06-07',
        termend:'2015-10-23',
        headerteacherid:Meteor.userId(),
        headerteachername:Meteor.user().profile.truename,
        childrencount:0,
        schoolid:this.schoolid,
        schoolname:this.schoolname,
        createuserid:Meteor.userId(),
      };
      Meteor.call('insertClassterm',Meteor.user(),classtermDoc, function(error,result){
        if(error){
          alert(error.reason);
        }
        else{
          Router.go('/' + this.returnurl);//登录成功
        }
      });
    },
  });

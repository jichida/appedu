Template.basicinfo.events({
    "click #btnmodify": function(event){
        event.preventDefault();
        //上传头像
        var truename = $("#truename").val();
        Meteor.call('settruename',truename);
        Router.go('profile');
      },
  });

  Template.basicinfo.helpers({
      "truename": function(event){
          return Meteor.user().profile.truename;
        },
    });

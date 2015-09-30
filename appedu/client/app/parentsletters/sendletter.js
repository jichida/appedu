Template.sendletter.helpers({
  'isparent':function(){
    return  Roles.userIsInRole(Meteor.user(), ['parent']);
  },
  'isheaderteacher':function(){
    return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
  },
  'sendusers':function(){
    var classtermid = Meteor.user().profile.curclasstermid;
    if(Roles.userIsInRole(Meteor.user(), ['parent'])){
      return [{
        userid: dbClassterms.findOne(classtermid).headerteacherid,
        truename:dbClassterms.findOne(classtermid).headerteachername,
      }];
    }
    if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])){
      //找到本班级所有孩子
      var users = [];
      dbChildren.find({curclasstermid:classtermid}).forEach(function(child){
          dbUserchildren.find({childid:child._id}).forEach(function(userchild){
            console.log("users:" + userchild.userid + ",childid:" + child._id);
            var usershowname = Meteor.users.findOne(userchild.userid).profile.truename + "(" + child.truename + userchild.releationshipname + ")";
              var user = {
                userid:userchild.userid,
                truename:usershowname
              }
              users.push(user);
          });
      });


      return users;
    }
    return [];
  },
  fileUploadedCallback: function() {
    return {
        finished: function(index, fileInfo, context) {

          Session.set("imagePath","uploads/"+fileInfo.name);
          console.log(fileInfo + ","+Session.get('imagePath'));
        }
    }
  },
});
Template.sendletter.events({
  'click #btnsendletter': function(event) {
     event.preventDefault();

	   var title= $('#title').val();
	   var content= $('#content').val();
     var createuserid = Meteor.userId();
     var createusername = Meteor.user().username;
     var createtruename = Meteor.user().profile.truename;
     //to users:todo
     var touserid =  $("#specialrecvuser").val();
     var totruename =  $("#specialrecvuser").find("option:selected").text();
     var recvid = this.recvid;
     var classtermid = Meteor.user().profile.curclasstermid;

     var images = [];

     var letterDoc ={
       title:title,
       content:content,
       createuserid:createuserid,
       createusername:createusername,
       createtruename:createtruename,
       tousers:[],
       images:images,
       touserid:touserid,
       totruename:totruename,
       classtermid:classtermid,
       recvid:recvid,
     }
     Meteor.call('insertLetter', letterDoc);

     console.log("insertLetter doc:"+EJSON.stringify(letterDoc));
     Router.go("/parentsletters");
  },

});

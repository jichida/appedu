Template.sendletter.helpers({
  'isparent':function(){
    return  Roles.userIsInRole(Meteor.user(), ['parent']);
  },
  'isheaderteacher':function(){
    return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
  },
  'sendusers':function(){
    if(Roles.userIsInRole(Meteor.user(), ['parent'])){
      return [{
        userid:Session.get('curclassterm').headerteacherid,
        truename:Session.get('curclassterm').headerteachername,
      }];
    }
    if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])){
      return Session.get('curclassterm').parentlist;
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
//      title
// content
// createtime
// images
// createuserid
// createusername
// tousers
// touserid
// tousername
// recvid
// classtermid

	   var title= $('#title').val();
	   var content= $('#content').val();
     var createuserid = Meteor.userId();
     var createusername = Meteor.user().username;
     var createtruename = Meteor.user().profile.truename;
     //to users:todo
     var touserid =  $("#specialrecvuser").val();
     var totruename =  $("#specialrecvuser").find("option:selected").text();
     var recvid = this.recvid;
     var classtermid = Session.get('curclassterm').classtermid;

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

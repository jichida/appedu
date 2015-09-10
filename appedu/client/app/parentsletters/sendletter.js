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
        username:Session.get('curclassterm').headerteachername,
      }];
    }
    if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])){
      return Session.get('curclassterm').parentlist;
    }
    return [];
  }
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
     var createusername = "user"; //Meteor.user().username;
     //to users:todo
     var recvid = this._recvid;
     var classtermid = this._classtermid;


     var letterDoc ={
       title:title,
       content:content,
       createuserid:createuserid,
       createusername:createusername,
       recvid:recvid,
       classtermid:classtermid
     }
     Meteor.call('insertLetter', letterDoc);

     console.log("insertLetter doc:"+EJSON.stringify(letterDoc));
     Router.go("/parentsletters");
  },

});

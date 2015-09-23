Template.sendcommunity.events({
    'click #btnsendcommunity': function(event) {
      event.preventDefault();
      var title= $('#title').val();
      var content= $('#content').val();
      var visiblerange = $('#visiblerange').val();
      var createuserid = Meteor.user()._id;
      var createusername = Meteor.user().username;
      if(title!='' && content!=''){
        var communityDoc ={
          title:title,
          content: content,
          visiblerange: visiblerange,
          createuserid: createuserid,
          createusername: createusername,
          love: [],
          reply: []
        }
        console.log(communityDoc)
        Meteor.call('insertParentscommunity', communityDoc);
        Router.go("/parentscommunity");
     }else{
      if(title=='') alert('取一个响亮的标题吧');
      else if(content=='') alert('内容部分不能为空');
      return false;
     }
  },
    'change #addImgInput': function(event){
        var f = $("#addImgInput").get(0).files;
        Meteor.call('addimgs', f);
        /*

        var files = event.target.files;

          for (var i = 0, ln = files.length; i < ln; i++) {
            Images.insert(files[i], function (err, fileObj) {
              console.log(files);
              console.log(files._id);
            });
          }

        */
    }
  /*
   console.log($("#addImgInput").get(0).files[0])
   var fileObj = Images.insert(file);
   var interval = Meteor.setInterval( function() {
   if (fileObj.hasStored('images')) {
   var imageURL = "/cfs/files/images/" + fileObj._id;
   Meteor.call('dbImages', imageURL, function (error, result) {
   Meteor.clearInterval(interval);
   });
   }
   },50)
   */
  /*
  'click .addImg' : function(event){
    event.preventDefault();
    MeteorCamera.getPicture('100','100',100, function(err, data){
      alert(data)
    })
  }
  */

});
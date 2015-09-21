Meteor.methods({
    'insertLetter': function(letterDoc){
       var sendDoc = _.extend(letterDoc,  {
         createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
       });
       console.log("sendDoc:" + EJSON.stringify(sendDoc));
       dbparentsletterssend.insert(letterDoc);

       var recvDoc = {
          title:sendDoc.title,
          content:sendDoc.content,
          createtime:sendDoc.createtime,
          images:sendDoc.images,
          recvuserid:sendDoc.touserid,
          recvtruename:sendDoc.totruename,
          fromuserid:sendDoc.createuserid,
          fromtruename:sendDoc.createtruename,
          classtermid:sendDoc.classtermid
       };
       dbparentslettersrecv.insert(recvDoc);
       //
     },
	});

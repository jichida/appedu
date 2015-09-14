Meteor.methods({
    'insertChild': function(user,childDoc){
       console.log("insertchildDoc:" + EJSON.stringify(childDoc));
       var childid = dbChildren.insert(childDoc);
       //把孩子放入自己信息中
       if (Roles.userIsInRole(user, ['parent'])) {
         var children = [];
         if(user.children){
           children = user.children;
         }
         var child = {
           childid:childid,
           childname:childDoc.truename,
         };
         children.push(child);
         Meteor.users.update(user._id, {$set: {children: children}});

         if(childDoc.curclasstermid){
             Meteor.call('addChildtoclassterm',childDoc.curclasstermid,user,childid);
             Meteor.call('insertFlowerslist',{
                 'classtermid':childDoc.curclasstermid,
                 'childid':childid,
                 'childname':childDoc.truename,
                 'redflowerlist':[],
                 'blackflowerlist':[]
             });
         }

       }

     },
     'addChildtoclassterm':function(classtermid,parentuser,childid){
       if (Roles.userIsInRole(parentuser, ['parent'])) {
          //把学生和自己放入班级中
          var child = dbChildren.findOne(childid);
          var classterm = dbClassterms.findOne(classtermid);
          if(classterm && child){
            var studentslist = [];
            if(classterm.studentslist){
              studentslist = classterm.studentslist;
            }
            var student = {
              childid:childid,
              childname :child.truename,
              parentlist:[
                {
                  parentid : parentuser._id,
                  username : parentuser.username,
                }
              ]
            };
            studentslist.push(student);
            dbClassterms.update(classtermid, {$set: {studentslist: studentslist}});

            console.log("addChildtoclassterm:" + EJSON.stringify(dbClassterms.findOne(classtermid)));
          }
       }
     }
	});

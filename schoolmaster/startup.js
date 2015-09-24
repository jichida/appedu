

Meteor.startup(function(){
    console.log("start up");
    if(Meteor.isClient){
        console.log("client start...0");
        Meteor.subscribe("users");
        Meteor.subscribe("schools");
        Meteor.subscribe("classterms");
    }

    if(Meteor.isServer){
    //===================================================================
    //
     //
     Meteor.publish("users", function () {
        return Meteor.users.find();
     });
     Meteor.publish("schools", function () {
        return dbSchools.find();
     });
     Meteor.publish("classterms", function () {
        return dbClassterms.find();
     });

 }
});

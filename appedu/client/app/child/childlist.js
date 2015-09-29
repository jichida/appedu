Template.childlist.events({
    // "click #btneditchild": function () {
    //   console.log("click btn btneditchild");
    //   event.preventDefault();
    //   Rout
    // },
    "click #btnexitclass": function () {
      console.log("click btn btnexitclass");
      event.preventDefault();
    },

    "click #btnexitschool": function () {
      console.log("click btn btnexitschool");
      event.preventDefault();
    },

    "click #btndeletechild": function () {
      console.log("click btn btndeletechild");
      event.preventDefault();
    },
  });

Template.childlist.helpers({
  'isinclassterm:':function(){
    return this.classtermid != null && this.classtermid!="";
  },
  'isinschool':function(){
    return this.schoolid != null && this.schoolid!="";
  }
})

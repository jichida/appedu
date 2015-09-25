Template.newchild.events({
    "click #btnaddclass": function () {
      console.log(EJSON.stringify(this.schools));

      console.log("click btn btnaddclass");
      event.preventDefault();
      var truename =  $('#truename').val();

      var selschooltypestring = $("#selschool").find("option:selected").text();
      var selschooltypevalue = $("#selschool").val();

      var selclasstypestring = $("#selclass").find("option:selected").text();
      var selclasstypevalue = $("#selclass").val();

      var childDoc = {
        truename:truename,
        sex:'female',
        birthday:'2015-06-23',
        curclasstermid:selclasstypevalue,
        archiveclassterms:[],
        createuserid:Meteor.userId(),
        createusername:Meteor.user().username
      }
      Meteor.call('insertChild',Meteor.user(), childDoc);
      Router.go('/' + this.returnurl);

    },


  });

Template.newchild.onRendered(function () {
  console.log(EJSON.stringify(this.schools));
  //alert($('#ddd').html())
  console.log($('input[name=province]').val())
  //var provincelist = $('input[name=province]').val().split(',');
  //var J_province = $('#J_province');.

    //for(var i=0;i<provincelist.length;i++){
     // var addOption=new Option("文本","值");//生成一个选项
      //obj.add(addOption);    //这个只能在IE中有效
      //obj.options.add(addOption); //这个兼容IE与firefox
    //}

})

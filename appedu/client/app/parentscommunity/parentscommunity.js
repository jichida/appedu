Template.parentscommunity.events({
  'click #tabone1':function(event,template){
    event.preventDefault();
    template.$('#tabone2').removeClass('hover');
    template.$('#tabone1').addClass('hover');
    template.$('#con_one_1').css({'display':'block'});
    template.$('#con_one_2').css({'display':'none'});
    console.log("click tab1");
  },
  'click #tabone2':function(event,template){
    event.preventDefault();
    template.$('#tabone1').removeClass('hover');
    template.$('#tabone2').addClass('hover');
    template.$('#con_one_2').css({'display':'block'});
    template.$('#con_one_1').css({'display':'none'});
    console.log("click tab2");
  },
  'click .jzq_zan':function(event,template){
    event.preventDefault();
    var dom = $(".parentscommunity_list_"+this._id).find('.jzq_zan');
    var uname = Meteor.user().username;
    var uid = Meteor.user()._id;
    var reply = {
      uname : uname,
      uid : uid,
    }
    Meteor.call('loveParentscommunity', reply, this._id);
    Router.go("/parentscommunity");
    //FlashMessages.sendInfo("<p style='line-height:40px;'>ddd<p><p style='line-height:40px;'>ddd<p>");
  },
  'click .jzq_ly':function(event,template){
    /*
    event.preventDefault();
    var dom = $(".parentscommunity_list_"+this._id).find('.jzq_ly');
    var uname = Meteor.user().username;
    var uid = Meteor.user()._id;
    var reply = {
      uname : uname,
      uid : uid,
    }
    Meteor.call('updataPartentscommunity', reply, this._id);
    Router.go("/parentscommunity");
    //FlashMessages.sendInfo("<p style='line-height:40px;'>ddd<p><p style='line-height:40px;'>ddd<p>");
    */
  },
});
/*
Template.parentscommunity.onRendered(function () {
  this.find('.jzq_zan')._uihooks = {
    click: function (node, next) {
      $(node).hide();
    }
  }
});
*/

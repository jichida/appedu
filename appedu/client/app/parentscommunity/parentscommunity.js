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
  //点赞操作
	'click .jzq_zan':function(event,template){
		event.preventDefault();
		var dom = $(".parentscommunity_list_"+this._id).find('.jzq_zan');
		var uname = Meteor.user().profile.truename;
		var uid = Meteor.userId();
		var reply = {
			uname : uname,
			uid : uid,
		}
		Meteor.call('loveParentscommunity', reply, this._id);
		Router.go("/parentscommunity");
		//FlashMessages.sendInfo("<p style='line-height:40px;'>ddd<p><p style='line-height:40px;'>ddd<p>");
	},
	//展开回复对话框
	'click .jzq_ly':function(event,template){
		$("#jzq_reply_"+this._id).slideToggle(100);
	},
	//回复操作
	'click .replyLnk':function(event,template){
		var cont = $("#jzq_reply_"+this._id).children('textarea').val();
		var uname = Meteor.user().profile.truename;
		var uid = Meteor.user()._id;
		var reply = {
			uname : uname,
			uid : uid,
			cont : cont
		}
		$("#jzq_reply_"+this._id).hide();
		$("#jzq_reply_"+this._id).children('textarea').val('');
		Meteor.call('replyParentscommunity', reply, this._id);
		Router.go("/parentscommunity");
	},
});

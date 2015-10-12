//家长圈首页
Router.route('/parentscommunity', function () {
	console.log("parentscommunity");
	var community = [];
	//家长圈帖子
	dbparentscommunity.find().forEach(function(data){
		var difference = parseInt(new Date().getTime()) - parseInt(data.createtime);
		var createtimeString = new Date(parseInt(data.createtime));
		data.createtimeString = moment(data.createtime).fromNow();
		data.createtime = moment(data.createtime).format("YYYY-MM-DD h:mm:ss a");
		data.replybox = data.reply.length>0 || data.love.length>0;
		community.push(data);
	})
	this.layout('mainlayout');
	this.render('navbar', {to: 'navbar'});
	this.render('parentscommunity', {
		to: 'content',
		data:{
			community: community,
			love: community.love
		}
	});
});
//家长圈子发送帖子
Router.route('/sendcommunity');

//家长圈首页
Router.route('/parentscommunity', function () {
  console.log("parentscommunity");
  var community = [];
  //家长圈帖子
  dbparentscommunity.find().forEach(function(data){
    community.push(data);
  })

  console.log("community:" + EJSON.stringify(community));

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

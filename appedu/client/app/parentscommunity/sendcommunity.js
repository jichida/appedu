var _imgsz_parentscommunity = new ReactiveVar([]);
Template.sendcommunity.events({
	'click #btnsendcommunity': function(event) {
		event.preventDefault();
		var title= $('#title').val();
		var content= $('#content').val();
		var visiblerange = $('#visiblerange').val();
		var createuserid = Meteor.user()._id;
		var createusername = Meteor.user().username;
		var createtime = new Date().getTime();//获取当前时间的时间戳
		if(title!='' && content!=''){
			var communityDoc ={
				title:title,
				content: content,
				visiblerange: visiblerange,
				createuserid: createuserid,
				createusername: createusername,
				createtime: createtime,
				images:_imgsz_parentscommunity.get(),
				love: [],
				reply: []
			}		
			console.log(communityDoc)
			Meteor.call('insertParentscommunity', communityDoc);
			Router.go("/parentscommunity");
			}else{
				if(title=='')
				alert('取一个响亮的标题吧');
			else if(content=='')
				alert('内容部分不能为空');
			return false;
		}
	},
    'change #addImgInput': function(event){
		console.log("change image...");
		var self = this;
		FS.Utility.eachFile(event, function(file){
			var image = Images.insert(file, function(err, fileObj){
				if(err){
					console.log("error:" + EJSON.stringify(err));
					alert("图片尺寸过大或这文件格式不正确！");
				} else {
					var imgsz = _imgsz_parentscommunity.get();
					imgsz.push({imageid:image._id});
					_imgsz_parentscommunity.set(imgsz);
				}
			});
		});
	}
});
Template.sendcommunity.helpers({
  'imagefile':function(){
    return _imgsz_parentscommunity.get();
  }
});
//当模版关闭的时候
Template.sendcommunity.destroyed = function(){
	_imgsz_parentscommunity = new ReactiveVar([]);//清空上传图片缓存
}
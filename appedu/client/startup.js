Meteor.startup(function(){

Meteor.subscribe('schools');//幼儿园
Meteor.subscribe('classterms');//班级、学期
Meteor.subscribe('childrelationships');//亲属关系
Meteor.subscribe('children');//孩子
Meteor.subscribe('childrenarchives');//成长档案
Meteor.subscribe('images');//图片
Meteor.subscribe('activities');//活动表
Meteor.subscribe('checkinouts');//离校入校
Meteor.subscribe('parentscommunity');//家长圈
Meteor.subscribe('parentsletterssend');//家长信（发送）
Meteor.subscribe('parentslettersrecv');//家长信（接受）
Meteor.subscribe('redflowerslist');//红花榜、捣蛋榜
Meteor.subscribe('qa');//问答
Meteor.subscribe('evaluations');//测评
Meteor.subscribe('questionbank');//题库
Meteor.subscribe('teachplans');//教学计划
Meteor.subscribe('userData');
Meteor.subscribe("foods");
Meteor.subscribe('constaddress');
Meteor.subscribe('userchildren');
Meteor.subscribe('questionnaire');//问卷调查
Meteor.subscribe('qnfeedback');//问卷调查反馈

Session.set("MeteorToys_display", true);


});

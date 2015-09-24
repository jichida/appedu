dbSchools = new Mongo.Collection('schools');//幼儿园
dbClassterms = new Mongo.Collection('classterms');//班级、学期
dbActivities  = new Mongo.Collection('activities');//活动表
dbFoods = new Mongo.Collection('foods');
//=========================================================

dbChildrelationships = new Mongo.Collection('childrelationships');//亲属关系
//SalesPromotions = new Mongo.Collection('users');//用户表，使用系统默认
dbChildren = new Mongo.Collection('children');//孩子
dbChildrenarchives = new Mongo.Collection('childrenarchives');//成长档案
dbImages = new Mongo.Collection('images');//图片

dbCheckinouts = new Mongo.Collection('checkinouts');//离校入校
dbRedflowerslist = new Mongo.Collection('redflowerslist');//红花榜、捣蛋榜
dbQa = new Mongo.Collection('qa');//问答
dbEvaluations = new Mongo.Collection('evaluations');//测评
dbQuestionbank = new Mongo.Collection('questionbank');//题库
dbTeachplans = new Mongo.Collection('teachplans');//教学计划

dbConstaddress = new Mongo.Collection('constaddress');


// 用户（家长，班主任，老师，园长）
// 园长新建幼儿园
// 班主任新建学期班级，挂靠在幼儿园
// 老师加入到班级
// 家长新建孩子
// 家长让孩子加入到该班级

// 家长：
// 用户名：parenttest
// 密码：123456
//
// 园长：
// 用户名：schoolmastertest
// 密码：123456
//
//
//班主任：
//用户名：headerteachertest
//密码：123456

//注：为简单期间，本版本只考虑班主任，不考虑任课老师
Meteor.startup(function(){
  //===================================================================
  //发布数据库
  //发布用户数据
Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId});
    } else {
        this.ready();
    }
 });

  Meteor.publish("constaddress",function(){
      return dbConstaddress.find();
  });

  Meteor.publish("schools",function(){
      return dbSchools.find();
  });
  Meteor.publish("classterms",function(){
      return dbClassterms.find();
  });
  Meteor.publish("childrelationships",function(){
      return dbChildrelationships.find();
  });
  Meteor.publish("children",function(){
      return dbChildren.find();
  });
  Meteor.publish("childrenarchives",function(){
      return dbChildrenarchives.find();
  });
  Meteor.publish("images",function(){
      return dbImages.find();
  });
  Meteor.publish("activities",function(){
      return dbActivities.find();
  });
  Meteor.publish("checkinouts",function(){
      return dbCheckinouts.find();
  });
  Meteor.publish("parentscommunity",function(){
      return dbparentscommunity.find();
  });
  Meteor.publish("parentsletterssend",function(){
      return dbparentsletterssend.find();
  });
  Meteor.publish("parentslettersrecv",function(){
      return dbparentslettersrecv.find();
  });
  Meteor.publish("redflowerslist",function(){
      return dbRedflowerslist.find();
  });
  Meteor.publish("qa",function(){
      return dbQa.find();
  });
  Meteor.publish("evaluations",function(){
      return dbEvaluations.find();
  });
  Meteor.publish("questionbank",function(){
      return dbQuestionbank.find();
  });
  Meteor.publish("teachplans",function(){
      return dbTeachplans.find();
  });
  Meteor.publish("questionnaire",function(){
      return dbQuestionnaire.find();
  });
  Meteor.publish("qnfeedback",function(){
      return dbQnfeedback.find();
  });


  //===================================================================
  if(dbConstaddress.find().count() == 0){
    var province=['北京','上海','天津','福建','海南','浙江','江西','广西','广东','重庆','宁夏','河北','陕西','辽宁','吉林','江苏','山东','湖南','四川','云南','甘肃','青海','安徽','贵州','山西','湖北','西藏','河南','新疆','澳门','香港','台湾','内蒙古','黑龙江','海外','其他'];
    var cities = {
'北京' : ['东城区','西城区','崇文区','宣武区','朝阳区','丰台区','石景山区','海淀区','门头沟区','房山区','通州区','顺义区','昌平区','大兴区','怀柔区','平谷区','密云县','延庆县'],
'上海' : ['黄浦区','卢湾区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','金山区','松江区','青浦区','南汇区','奉贤区','崇明县'],
'天津' : ['和平区','河东区','河西区','南开区','河北区','红桥区','塘沽区','汉沽区','大港区','东丽区','西青区','津南区','北辰区','武清区','宝坻区','宁河县','静海县','蓟县'],
'广西' : ['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','南宁','柳州'],
'福建' : ['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德'],
'海南' : ['海口','三亚','其他'],
'浙江' : ['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水'],
'江西' : ['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶'],
'广东' : ['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'],
'重庆' : ['万州区','涪陵区','渝中区','大渡口区','江北区','沙坪坝区','九龙坡区','南岸区','北碚区','万盛区','双桥区','渝北区','巴南区','黔江区','长寿区','綦江县','潼南县','铜梁县','大足县','荣昌县','璧山县','梁平县','城口县','丰都县','垫江县','武隆县','忠县','开县','云阳县','奉节县','巫山县','巫溪县','石柱土家族自治县','秀山土家族苗族自治县','酉阳土家族苗族自治县','彭水苗族土家族自治县','江津市','合川市','永川区','南川市'],
'宁夏' : ['银川','石嘴山','吴忠','固原'],
'河北' : ['石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水'],
'黑龙江' : ['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭'],
'陕西' : ['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛'],
'澳门' : ['澳门'],
'辽宁' : ['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'],
'吉林' : ['长春','吉林','四平','辽源','通化','白山','松原','白城','延边朝鲜族自治州'],
'江苏' : ['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁'],
'山东' : ['济南','青岛','淄博','枣庄','东营','烟台','潍坊','济宁','泰安','威海','日照','莱芜','临沂','德州','聊城','滨州','菏泽'],
'湖南' : ['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西土家族苗族自治州'],
'四川' : ['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','眉山','宜宾','广安','达州','雅安','巴中','资阳','阿坝','甘孜','凉山'],
'云南' : ['昆明','曲靖','玉溪','保山','昭通','楚雄','红河','文山','思茅','西双版纳','大理','德宏','丽江','怒江','迪庆','临沧'],
'甘肃' : ['兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南'],
'青海' : ['西宁','海东','海北','黄南','海南','果洛','玉树','海西'],
'安徽' : ['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城'],
'香港' : ['香港'],
'贵州' : ['贵阳','六盘水','遵义','安顺','铜仁','黔西南','毕节','黔东南','黔南'],
'台湾' : ['台北','高雄','其他'],
'山西' : ['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'],
'湖北' : ['武汉','黄石','十堰','宜昌','襄樊','鄂州','荆门','孝感','荆州','黄冈','咸宁','随州','恩施土家族苗族自治州'],
'西藏' : ['拉萨','昌都','山南','日喀则','那曲','阿里','林芝'],
'内蒙古' : ['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','兴安盟','锡林郭勒盟','乌兰察布盟','巴彦淖尔盟','阿拉善盟'],
'河南' : ['郑州','开封','洛阳','平顶山','安阳','鹤壁','新乡','焦作','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店'],
'新疆' : ['乌鲁木齐','克拉玛依','吐鲁番','哈密','昌吉','博尔塔拉','巴音郭楞','阿克苏','克孜勒苏','喀什','和田','伊犁','塔城','阿勒泰'],
'海外' : ['美国','英国','法国','俄罗斯','加拿大','巴西','澳大利亚','印尼','泰国','马来西亚','新加坡','菲律宾','越南','印度','日本','其他'],
'其他' : [''],
 };
  var address = {
    province:province,
    cities:cities,
  };
  dbConstaddress.insert(address);

  }
//var prerun = function(){
  //如果已经存在数据，想从头开始初始化，可以进入工程目录执行：meteor reset(清空数据库)
  if(Meteor.users.find().count() == 0){
    //<-----------------------------------------
    //新建用户
    var users =
      [
        // {
        //   username:'parenttest',
        //   password:'123456',
        //   roles:['parent'],
        // },
        // {
        //   username:'headerteachertest',
        //   password:'123456',
        //   roles:['headerteacher'],
        // },

        {
          username:'schoolmastertest',
          password:'123456',
          roles:['schoolmaster'],
        },

      ];
      for(var i = 0;i < users.length; i++){
         var userid =  Accounts.createUser(users[i]);
         if (users[i].roles.length > 0) {
           Roles.addUsersToRoles(userid, users[i].roles);
         }
         console.log("create user ok:" + userid);
      }
    };

    if(dbSchools.find().count() == 0){
      //<---------------------------------------------
      var usrschoolmaster = Meteor.users.findOne({username:'schoolmastertest'});
      //1>园长新建幼儿园
      var schoolDoc = {
        name:'常州武进锦绣幼儿园',
        address:'常州武进永胜中路100号',
        createdate:'2011-02-12',
        createuserid:usrschoolmaster._id,
        createusername:usrschoolmaster.username
      };
      Meteor.call('insertSchool', schoolDoc);
    }

    // if(dbClassterms.find().count() == 0){
    //    //2>班主任新建学期班级，挂靠在幼儿园
    //     var usrheaderteacher = Meteor.users.findOne({username:'headerteachertest'});
    //     var schoolId = dbSchools.findOne()._id;
    //     var classtermDoc = {
    //       name:'小三班上半学期',
    //       termbegin:'2015-02-03',
    //       termend:'2015-06-30',
    //       headerteacherid:usrheaderteacher._id,
    //       headerteachername:usrheaderteacher.username,
    //       schoolid:schoolId,
    //       schoolname:schoolDoc.name,
    //       createuserid:usrheaderteacher._id,
    //     };
    //     Meteor.call('insertClassterm', usrheaderteacher,classtermDoc);
    //     //班主任加入班级
    //
    //   }
    //
    //   if(dbChildren.find().count() == 0){
    //     //家长新建孩子
    //     var curclasstermid = dbClassterms.findOne()._id;
    //     var usrparent = Meteor.users.findOne({username:'parenttest'});
    //     var childDoc = {
    //       truename:'张倩',
    //       sex:'female',
    //       birthday:'2015-06-23',
    //       curclasstermid:curclasstermid,
    //       archiveclassterms:[],
    //       createuserid:usrparent._id,
    //       createusername:usrparent.username
    //     }
    //     Meteor.call('insertChild',usrparent, childDoc);
    //
    //
    // }

});

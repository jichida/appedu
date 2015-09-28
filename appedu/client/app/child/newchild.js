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
		Meteor.call('insertChild', Meteor.user(), childDoc);
		Router.go('/' + this.returnurl);
	}
	,'change #J_province':function(){
		var cy = dbConstaddress.findOne();
		var cy_cities = cy.cities;
		var province = $('#J_province').val();
		var citiesList = [];
		var citiesArr = cy_cities[province];
		for(var i=0; i<citiesArr.length; i++){
			var city_list = {
				'name': citiesArr[i],
				'id' : i
			}
			citiesList.push(city_list);
		}
		$("#J_city").empty();
		$("#J_city").append("<option value='0'>-请选择-</option>"); 
		for(var i=0;i<citiesList.length;i++){			
			$("#J_city").append("<option value='"+citiesList[i].name+"'>"+citiesList[i].name+"</option>"); 
		}
	}
});

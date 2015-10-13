/**
 * Created by Luforn on 2015/9/24.
 */



Template.questionnairexz.events({
    'blur #qnairetitle': function(event,element) {
        event.preventDefault();
        if($(event.target).val()==""){
            alert('标题不能为空！');
			$('#qnairetitle').focus();
            $(event.target).addClass('noempty');
        }else{
            $(event.target).removeClass('noempty');
        }
		
    },
    'click #qnconfirmbtn':function(event){
        event.preventDefault();
        if($("input[class='noempty']").length>0){
            alert("请注意检查是否有未完整填写选项！");
            return ;
        }
        var qnDoc = {
            'qnairetitle':$('#qnairetitle').val(),
            'createuserid':Meteor.userId(),
            'createusername':Meteor.user().username,
            'createtime':moment().format('YYYY-MM-DD'),
            'classtermid':Meteor.user().profile.curclasstermid
        };
        var questionlist = [];
        $("div[class='fb_con']").each(function() {
            var question = {
                'questionid': Random.id(),
                'questioncontent': $("input[name='questioncontent']", this).val()
            };
            var answerlist = [];
            $("input[name^='option']",this).each(function (i,element) {
                var answer = {
                    'index':Math.pow(2,i),
                    'answercontent':$(element).val(),
                    'checkcount':0
                };
                answerlist.push(answer);
            });
            question['answerlist'] = answerlist;
            questionlist.push(question);
        });
        qnDoc['questionlist'] = questionlist;
        Meteor.call('insertQuestionnaire', qnDoc);
        Router.go("/questionnaire");
    },
    'click .gift_btn': function(event) {
        event.preventDefault();
        var questionitem = $("<div class='fb_con'></div>");
        questionitem.append("<input name='questioncontent' type='text' class='input_200 noempty' placeholder='问题内容'/>");
        var questionoptions = $("<div class='fb_m'></div>");
        $('<label for="option_a"><span>选项A: </span><input class="noempty" name="option_a" type="input" /></label>').appendTo(questionoptions);
        $('<label for="option_b"><span>选项B: </span><input class="noempty" name="option_b" type="input" /></label>').appendTo(questionoptions);
        $('<label for="option_c"><span>选项C: </span><input class="noempty" name="option_c" type="input" /></label>').appendTo(questionoptions);
        $('<label for="option_d"><span>选项D: </span><input class="noempty" name="option_d" type="input" /></label>').appendTo(questionoptions);
        questionitem.append(questionoptions);
        $(".gift_btn").before(questionitem);
    }

});

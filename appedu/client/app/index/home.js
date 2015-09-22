Template.home.events({
  'click .over_layer':function(){
    $(".category_h_nav").click();
  },
  'click .category_h_nav':function(){
    var val_res  = $(".category_h_nav").attr("data") == "1";
    var w_height = $(document).height();
    var w_width  = $(window).width();
    var doc_height = $(".product-category a span").height() * $(".product-category a span").size() + $(".navbg").height();
    doc_height = doc_height>w_height? doc_height: w_height;
    $(".product-category").css({"width":w_width,"overflow":"hidden","position":"relative","height":doc_height});
    //alert(w_width);
    if(val_res){
      $(".category_h_nav").attr("data","0");
      $(".product-category .content.pad").css({"position":"relative"});
      $(".product-category .content.pad").stop();
      $(".product-category .content.pad").animate({"left":"-40%"},500);
      $(".category_two_nav").stop();
      $(".category_two_nav").show().animate({right:"0"}, 500).css({"height":"100%"});
      $(".over_layer").show().css({"width":"100%","height":"100%"}).addClass("over_layer_bg");
    }else{
      $(".category_h_nav").attr("data","1");
      $(".product-category .content.pad").css({"position":"relative"});
      $(".product-category .content.pad").stop();
      $(".product-category .content.pad").animate({"left":"0"},500);
      $(".category_two_nav").stop();
      $(".category_two_nav").animate({right:"-40%"}, 500);
      //$(".category_two_nav").hide();
      $(".over_layer").hide();
      $(".product-category").css({"width":w_width,"overflow":"hidden","position":"relative","height":"auto"});
    }
  },
});

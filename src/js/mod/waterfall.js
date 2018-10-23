var WaterFall = (function(){
    var $ct;
    var $items;
  
    function render($c){
      $ct = $c;
      $items = $ct.children(); //找到子元素
  
      var nodeWidth = $items.outerWidth(true), //定义单个node的宽度
        colNum = parseInt($(window).width()/nodeWidth),//视口 浏览器窗口是单个node宽度的倍数
        colSumHeight = [];
  
      for(var i = 0; i<colNum;i++){
        colSumHeight.push(0);
      }
  
      $items.each(function(){
        var $cur = $(this);  //子元素
  
        //colSumHeight = [100, 250, 80, 200]
  
        var idx = 0,
          minSumHeight = colSumHeight[0];
  
        for(var i=0;i<colSumHeight.length; i++){
          if(colSumHeight[i] < minSumHeight){//找到最小宽度距离
            idx = i;
            minSumHeight = colSumHeight[i];
          }
        }
  
        $cur.css({
          left: nodeWidth*idx, //第几个离左边距离最小  就设置left为相应的距离
          top: minSumHeight  //高度是最小高度
        });
        colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
      });//记录下加上子元素高度 的高度  为实际距离top的高度
    }
  
  
    $(window).on('resize', function(){
      render($ct);
    })
  
  
    return {
      init: render
    }
  })();
  
  module.exports = WaterFall
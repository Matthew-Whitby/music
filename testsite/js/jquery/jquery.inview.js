!function(e){
  "function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)
}
(function($){
  function e(){
    var e,t,n={height:f.innerHeight,width:f.innerWidth};
    return n.height||(e=l.compatMode,!e&&$.support.boxModel||(t="CSS1Compat"===e?a:l.body,n={height:t.clientHeight,width:t.clientWidth})),n
  }
  function t(){
    return{top:f.pageYOffset||a.scrollTop||l.body.scrollTop,left:f.pageXOffset||a.scrollLeft||l.body.scrollLeft}
  }
  function n(){
    if(i.length){
      var n=0,l=$.map(i,function(e){
        var t=e.data.selector,n=e.$element;
        if(t){
          for(var i=n.find(t),o=[],r=0;r<i.length;r++)o.push($(i[r]));
          return o
        }
        return n
      });
      for(o=o||e(),r=r||t();n<l.length;n++)if($.contains(a,l[n][0])){
        var f=$(l[n]),h={height:f[0].offsetHeight,width:f[0].offsetWidth},d=f.offset(),u=f.data("inview");
        if(!r||!o)return;
        d.top+h.height>r.top&&d.top<r.top+o.height&&d.left+h.width>r.left&&d.left<r.left+o.width?u||f.data("inview",!0).trigger("inview",[!0]):u&&f.data("inview",!1).trigger("inview",[!1])
      }
    }
  }
  var i=[],o,r,l=document,f=window,a=l.documentElement,h;$.event.special.inview={add:function(e){
    i.push({data:e,$element:$(this),element:this}),!h&&i.length&&(h=setInterval(n,250))},remove:function(e){
      for(var t=0;t<i.length;t++){
        var n=i[t];
        if(n.element===this&&n.data.guid===e.guid){
          i.splice(t,1);
          break
        }
      }
      i.length||(clearInterval(h),h=null)
    }
  },
  $(f).on("scroll resize scrollstop",function(){
    o=r=null
  }),
  !a.addEventListener&&a.attachEvent&&a.attachEvent("onfocusin",function(){r=null})
});

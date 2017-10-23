//simpleTabs API:http://www.imsole.net/jqueryPlugs/simpletabs%20V2.0.html
(function($){$.fn.simpleTabs=function(o){var defs={current:"now",action:"mouseover",target:"",easing:"toggle",direction:"left",autoPlay:0,speed:3000,time:400,btnPrev:"",btnNext:""};var obj=this;var opt=$.fn.extend({},defs,o);var now=opt.current;var action=opt.action;var $target=$(opt.target);var easing=opt.easing;var direction=opt.direction;var autoPlay=opt.autoPlay;var speed=opt.speed;var time=opt.time;var btnPrev=$(opt.btnPrev);var btnNext=$(opt.btnNext);var oTarget_num="";var oTarger_len=$target.length;var sStr="";var num=0;var timer=null;if(easing=="slide"){if(direction=="left"){sStr="width";oTarget_num=$target.eq(0).outerWidth(true)}else{sStr="height";oTarget_num=$target.eq(0).outerHeight(true)}}else{$(obj).eq(0).addClass(now).siblings().removeClass(now);$target.hide().eq(0).show()}btnNext.click(function(){num=obj.parent().children(".now").index();num++;if(num>=oTarger_len)num=0;setTimeout(fnMove,200)});btnPrev.click(function(){num=obj.parent().children(".now").index();num--;if(num<0)num=oTarger_len-1;setTimeout(fnMove,200)});function fnMove(){obj.eq(num).addClass(now).siblings().removeClass(now);if(easing=="fade"){$target.hide().eq(num).fadeIn(time)}else if(easing=="slide"){$target.parent("ul").css(sStr,oTarget_num*oTarger_len);if(direction=="left"){$target.parent().animate({"left":-num*oTarget_num},time)}else{$target.parent().animate({"top":-num*oTarget_num},time)}}else if(easing=="toggle"){$target.hide().eq(num).show()}else{alert("sorry, without this parameter!\ndefaults:toggle | slide | fade")}}obj.mouseover(function(){clearInterval(timer)}).mouseout(function(){if(autoPlay){timer=setInterval(function(){num++;if(num>=oTarger_len)num=0;fnMove()},speed)}});if(autoPlay){timer=setInterval(function(){num++;if(num>=oTarger_len)num=0;fnMove()},speed)}return this.each(function(i){$(this).bind(action,function(){clearInterval(timer);num=i;setTimeout(fnMove,200)})})};$.fn.simpleTabs.version="2.0"})(jQuery);

//设为首页+添加收藏+联系我们 webTools("#setHome", "#addFav")
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6 w(g,9){h 7=v.u,2=0.i.t,5=0.i.5;$(g).d(6(){3{f.s.y="B(#A#c)";f.z(2)}4(e){C(0.a){3{a.m.r.q("p")}4(e){8("此操作被浏览器拒绝！\\n请在浏览器地址栏输入“o:k”并回车\\n然后将 [l.x.O]的值设置为\'T\',双击即可。")}h b=j.S[\'@R.Q/V-E;1\'].W(j.U.P);b.I(\'H.G.c\',2)}F{8("此操作被浏览器拒绝！\\n请手动将 "+5+" 设为首页。")}}});$(9).d(6(){3{0.J.K(2,7)}4(e){3{0.N.M(7,2,"")}4(e){8("加入收藏失败，请使用L+D进行添加")}}})}',59,59,'window||locahref|try|catch|host|function|ititle|alert|addFav|netscape|prefs|homepage|click||this|setHome|var|location|Components|config|signed|security||about|UniversalXPConnect|enablePrivilege|PrivilegeManager|style|href|title|document|webTools|applets|behavior|setHomePage|default|url|if||service|else|startup|browser|setCharPref|external|addFavorite|Ctrl|addPanel|sidebar|codebase_principal_support|nsIPrefBranch|org|mozilla|classes|true|interfaces|preferences|getService'.split('|'),0,{}))

function tScrollTop(obj){
	if($(obj).offset() == null) return false;
	var otop = $(obj).offset().top;
	$(window).scroll(function(){
		var scroll_top = parseInt($(window).scrollTop());
		if( scroll_top > otop ){
			$(obj).css("display","block");
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
				$(obj).css({position:"absolute", right:"30px", bottom:"50px"});
			}else{
				$(obj).css({position:"fixed", right:"30px", bottom:"50px"});
			}
		}else{
			//$(obj).css({position:"static", top:""});
			$(obj).css("display","none");
		}
	 });
}

function tScrollTo(obj, targets){
	$(obj).each(function(i){
		$(this).click(function(){
			if($(targets).eq(i).offset() == null) return false;
			var target = $(targets).eq(i).offset().top;
			$("html, body").animate({ scrollTop: target }, 500);
		});
	});
}

function tScroll(list, prev, next){
	var prev = $(prev);
	var next = $(next);
	var list = $(list);
	list.html(list.html()+list.html());
	var _w = list.children().eq(0).outerWidth(true);
	var _n = list.children().length;
	var _l =0;
	list.css("width",_w*_n);
	
	var timer = setInterval(move_l, 3000);
	prev.click(function(){
		clearInterval(timer);
		timer = setInterval(move_l, 3000);
	});
	next.click(function(){
		clearInterval(timer);
		timer = setInterval(move_r, 3000);
	});

	function move_l(){
		_l = parseInt(list.css("left"));
		if(-_l >= _w*_n/2){
			list.css("left","0");
			_l = 0;
		}
		list.animate({left: _l-_w+"px"}, 400);
	}
	function move_r(){
		_l = parseInt(list.css("left"));
		if(_l >= 0){
			list.css("left",-_w*_n/2);
			_l = -_w*_n/2;
		}
		list.animate({left: _l+_w+"px"}, 400);
	}
}

function tSelect(obj, target, list, setVal, setInput){
	var timer = "";
	$(obj).click(function(){
		clearTimeout(timer);
		$(target).show();
		$(list).click(function(){
			$(setVal).html($(this).text()+"<i></i>");
			$(setInput).val($(this).text());
			$(target).hide();
		});
	}).mouseout(myOut);

	$(target).mouseover(function(){
		clearTimeout(timer);
		$(target).show();
		
	}).mouseout(myOut);

	function myOut(){
		timer = setTimeout(function(){
			$(target).hide();
		}, 300);
	}
}
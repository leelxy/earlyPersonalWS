window.onload = function(){
	var oDiv = document.getElementById("div");
	var oUl = oDiv.getElementsByTagName("ul")[0];
	var oOl = oDiv.getElementsByTagName("ol")[0];
	var aLi = oUl.children;
	var aSpan = oOl.getElementsByTagName("span");
	var width = aLi[0].offsetWidth;
	var aBtn = oOl.children;

	oUl.style.width = width*aLi.length + "px";
	var iNow = 0;
	var time = 1000;
	var pause = false;

	next();
	function next(){
		doMove(aSpan[iNow],{width:80},{time:time,type:Tween.Linear,end:function(){
			iNow++;
			iNow = (iNow == aLi.length) ? 0 : iNow;
			doMove(oUl,{left:-width*iNow},{time:time,type:Tween.Linear,end:function(){
				for(var i = 0; i < aLi.length; i++){
					aSpan[i].style.width = 0;
				}
				!pause && next();
			}});
		}});
	}
	oDiv.onmouseover = function(){
		aSpan[iNow].style.width = 0;
		pause = true;
		clearInterval(aSpan[iNow].timer);
	};
	oDiv.onmouseout = function(){
		pause = false;
		next();
	};
	
	for(var i = 0; i < aBtn.length; i++){
		(function(index){
			aBtn[i].onclick = function(){
				iNow = index;
				aSpan[iNow].style.width = '80px';
				doMove(oUl,{left:-width*iNow},{time:time,type:Tween.Linear,end:function(){
					for(var j = 0; j < aLi.length; j++){
						aSpan[j].style.width = 0;
					}
					//!pause && next();
				}});
				
			};
		})(i);
	}
};
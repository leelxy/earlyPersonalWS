window.onload = function(){
	var oBtn = document.getElementById("btn");
	var oUl = document.getElementById("ul");
	var aLi = oUl.children;
	var zIndex = 5;

	//布局转换
	var aPos = [];
	for(var i = 0; i < aLi.length; i++){
		aPos[i] = {left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
	}
	for(var i = 0; i < aLi.length; i++){
		aLi[i].style.left = aPos[i].left + "px";
		aLi[i].style.top = aPos[i].top + "px";
		aLi[i].style.position = "absolute";
		aLi[i].style.margin = 0;
	}

	oBtn.onclick = function(){
		aPos.sort(function(){
			return Math.random() - 0.5;
		});

		for(var i = 0; i < aLi.length; i++){
			doMove(aLi[i],aPos[aLi[i].index],{time:500,type:Tween.Linear});
		}
	};

	//照片拖拽
	for(var i = 0; i < aLi.length; i++){
		drag(aLi[i]);
		aLi[i].index = i;
	}
	function drag(obj){
		obj.onmousedown = function(ev){
			zIndex++;
			obj.style.zIndex = zIndex;
			var oEvent = ev || event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;

			clearInterval(obj.timer);
			document.onmousemove = function(ev){
				var oEvent = ev || event;
				obj.style.left = oEvent.clientX - disX + "px";
				obj.style.top = oEvent.clientY - disY + "px";

				for(var i = 0; i < aLi.length; i++){
					aLi[i].className = "";
				}
				var oNear = findNearest(obj);
				if(oNear){
					oNear.className = "active";
				}
			};
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.releaseCapture && obj.releaseCapture();

				var oNear = findNearest(obj);
				if(oNear){
					doMove(obj,aPos[oNear.index],{time:300,type:Tween.Linear});
					doMove(oNear,aPos[obj.index],{time:300,type:Tween.Linear});

					var tmp;
					tmp = obj.index;
					obj.index = oNear.index;
					oNear.index = tmp;

					oNear.className = "";
				} else {
					doMove(obj,aPos[obj.index],{time:300,type:Tween.Linear});
				}
			};
			obj.setCapture && obj.setCapture();
			return false;
		};
	}
	
	function collTest(obj,obj2){
		var l1 = obj.offsetLeft;
		var r1 = obj.offsetLeft + obj.offsetWidth;
		var t1 = obj.offsetTop;
		var b1 = obj.offsetTop + obj.offsetHeight;

		var l2 = obj2.offsetLeft;
		var r2 = obj2.offsetLeft + obj2.offsetWidth;
		var t2 = obj2.offsetTop;
		var b2 = obj2.offsetTop + obj2.offsetHeight;

		if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2){
			return false;
		} else {
			return true;
		}

	}
	function getDis(obj,obj2){
		var a = obj.offsetLeft - obj2.offsetLeft;
		var b = obj.offsetTop - obj2.offsetTop;
		return Math.sqrt(a*a+b*b);
	}
	function findNearest(obj){
		var iMin = 99999;
		var iMinIndex = -1;
		for(var i = 0; i < aLi.length; i++){
			if(aLi[i] == obj) continue;
			if(collTest(obj,aLi[i])){
				var dis = getDis(obj,aLi[i]);
				if(dis < iMin){
					iMin = dis;
					iMinIndex = i;
				}
			}
		}
		if(iMinIndex == -1){
			return null;
		} else {
			return aLi[iMinIndex];			
		}
	}
};
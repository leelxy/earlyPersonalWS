function findInArr(arr,n){
	for(var i = 0; i < arr.length; i++){
		
		if(arr[i] == n){
			return true;
		}
	}
	return false;
}

function getByClass(oParent,sClass){
	var ret = [];
	
	var aEle = oParent.getElementsByTagName("*");
	
	for(var i = 0; i < aEle.length; i++){
		
		var temp = aEle[i].className.split(" ");
		
		//判断
		if(findInArr(temp,sClass)){
			ret.push(aEle[i]);
		}	
	}
	return ret;
}

window.tab = function(aBtn,aUl){
	for(var i = 0; i < aBtn.length; i++){
		(function(index){
			aBtn[i].onmouseover = function(){
				for(var i = 0; i < aBtn.length; i++){
					aBtn[i].className = "";
					aUl[i].style.display = "none";
				}
				this.className = "now";
				aUl[index].style.display = "block"; 
			};
		})(i);
	} 
}

window.onload = function(){
	//导航广告选项卡切换
	(function(){
		var oDiv = getByClass(document,"slide")[0];
		var aBtn = document.getElementById("ctl-point").children;
		var aLi = document.getElementById("slide").children;
		var aA = getByClass(document,"ctl-alts")[0].children;
		var oPrev = getByClass(document,"btn-prev")[0];
		var oNext = getByClass(document,"btn-next")[0];

		var iNow = 0; 
		var timer = setInterval(next,1000);
		function next(){
			iNow++;
			iNow = (iNow == aBtn.length) ? 0 : iNow;
			tab();
		}

		function prev(){
			iNow--;
			iNow = (iNow == -1) ? aBtn.length - 1 : iNow;
			tab();
		}

		function tab(){
			for(var i = 0; i < aBtn.length; i++){
				aBtn[i].className = "";
				aLi[i].style.display = "none";
				aA[i].style.display = "none";
			}
			aBtn[iNow].className = "now";
			aLi[iNow].style.display = "block";
			aA[iNow].style.display = "block";
		}

		oDiv.onmouseover = function(){
			oPrev.style.display = "block";
			oNext.style.display = "block";
			clearInterval(timer);
		};
		oDiv.onmouseout = function(){
			oPrev.style.display = "none";
			oNext.style.display = "none";
			timer = setInterval(next,1000);
		};

		oPrev.onclick = function(){
			prev();
		};

		oNext.onclick = function(){
			next();
		};

		for(var i = 0; i < aBtn.length; i++){
			(function(index){
				aBtn[i].onmouseover = function(){
					iNow = index;
					tab();
				};
			})(i);
		}
	})();

	//内容标题选项卡切换(今日热门、电视剧、电影、综艺)
	(function(){
		var aBoxTit = getByClass(document,"box-bd");
		for(var i = 0; i < aBoxTit.length; i++){
			if(getByClass(aBoxTit[i],"item") == false){
				continue;
			}
			tabSwitch(aBoxTit[i]);
		}
		
		function tabSwitch(obj){
			var aBtn = getByClass(obj,"item")[0].children;
			var aUl = obj.getElementsByTagName("ul");
			tab(aBtn,aUl);
		}
	})();
	
	//导航右侧选项卡切换
	(function(){
		var aBtn = document.getElementById("ran").children;
		var aUl = getByClass(document,"ranking-bd")[0].getElementsByTagName("ul");
		tab(aBtn,aUl);
	})();
};
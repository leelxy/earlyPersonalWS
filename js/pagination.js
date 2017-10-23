window.onload = function(){
	var oBtn = document.getElementById('btn');
	var oUl = document.getElementById('ul');
	var aLi = oUl.children;
	var aBtn = getByClass(document,'page');

	//给Li添加颜色
	for(var i = 0; i < aLi.length; i++){
		aLi[i].style.background = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
	}

	//布局转化
	var aPos = [];
	for(var i = 0; i < aLi.length; i++){
		aPos[i] = {left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
	}
	for(var i = 0; i < aLi.length; i++){
		aLi[i].style.position = 'absolute';
		aLi[i].style.left = aPos[i].left + 'px';
		aLi[i].style.top = aPos[i].top + 'px';
		aLi[i].style.margin = 0;
	}

	var timer = null;
	var bClick = true;

	for(var i = 0; i < aBtn.length; i++){
		aBtn[i].onmouseover = function(){
			this.className = 'page active';
		};
		aBtn[i].onmouseout = function(){
			this.className = 'page';
		};

		aBtn[i].onclick = function(){
			for(var j = 0; j < aBtn.length; j++){
				aBtn[j].className = 'page';
			}
			changePage(this);
		};
	}

	function changePage(obj){
		if(!bClick) return;
		bClick = false;

		var n = aLi.length-1; 
		obj.timer = setInterval(function(){
			(function(index){
				doMove(aLi[n],{width:0, height:0, left:180, top:400, opacity:0},{type:Tween.Linear,time:300,end:function(){
					if(index == 0){
						for(var i = 0; i < aLi.length; i++){
							aLi[i].style.background = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
						}

						i = aLi.length - 1;
						obj.timer = setInterval(function(){
							(function(k){
								doMove(aLi[k],{width:100, height:100, left:aPos[k].left, top:aPos[k].top, opacity:1},{type:Tween.Linear,time:300,end:function(){
									if(k == 0){
										bClick = true;
										obj.className = 'page active';
									}
								}});
							})(i);
							i--;
							if(i == -1){
								obj.clearInterval(timer);
							}
						},50);
					}
				}});
			})(n);
			n--;
			if(n == -1){
				obj.clearInterval(timer);
			}
		},50);
	}
};
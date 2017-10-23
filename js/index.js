window.onload = function(){
	var oUl = getByClass(document,'nav_list')[0];
	var aBtn = oUl.children;
	//var aNav = oUl.getElementsByTagName('a');
	var aPage = getByClass(document,'page');
	var oTitle = getByClass(document,'home-title')[0];
	var oTitShadow = getByClass(document,'title-shadow')[0];
	var oBottom = getByClass(document,'bottom')[0];

	var aIcon = getByClass(document,'icon');
	var aLi = getByClass(document,'effeft_list')[0].children;

	var timer = null;

	/*move(aIcon[0],700,200);
	move(aIcon[1],880,140);
	//move(aIcon[2],1100,350);
	function move(obj,m,n){
		setInterval(function(){
			var l = Math.random()*30+m;
			var t = Math.random()*30+n;
			doMove(obj,{left:l,top:t},{time:350,type:Tween.Linear});
		},200);
	}*/
	
	//设置每屏最小高度为浏览器高度
	var navH = getByClass(document,'header')[0].offsetHeight;
	var clientH = document.documentElement.clientHeight;
	for(var i = 0; i < aPage.length; i++){
		aPage[i].style.minHeight = clientH - navH + 'px';
	}

	//存入每一屏的高度
	var arr = [];
	for(var i = 0; i < aBtn.length; i++){
		arr[i] = getPos(aPage[i]).top - navH;
	}

	//点击导航切换页面
	for(var i = 0; i < aBtn.length; i++){
		(function(index){
			aBtn[i].onclick = function(){
				for(var j = 0; j < aBtn.length-1; j++){
					aBtn[j].className = '';
				}
				navMove(oBottom,aBtn[index].offsetLeft);
				//this.className = "on";
				/*if(index == 0){
					n=0;
					///console.log(aSpan.length);
					timer = setInterval(function(){

						doMove(aSpan[n],{top:200,opacity:1},{time:2500});
						n++;
						if(n == aSpan.length){
							clearInterval(timer);
						}
					},50);
				} else {
					for(var i = 0; i < aSpan.length; i++){
						aSpan[i].style.top = 0;
						aSpan[i].style.opacity = 0;
					}
				}*/
				changePage(arr[index]);
			}
		})(i);
	}

	//var bPage = true;
	function changePage(target){
		//if(!bPage) return;
		//bPage = false;
		var start  = document.documentElement.scrollTop || document.body.scrollTop;
		var dis = target - start;
		var count = Math.floor(1000/30);
		var n = 0;
		clearInterval(timer);
		timer = setInterval(function(){

			n++;
			var a = 1 - n/count;
			document.documentElement.scrollTop = document.body.scrollTop = start + dis*(1-Math.pow(a,3));
			//document.title = document.body.scrollTop;
			if(n == count){
				clearInterval(timer);
			}
		},30);
		//bPage = true;
	}
	
	//首页文字创建和显示
	var str = 'Hi,I\'m xiaoyuan';
	for(var i = 0; i < str.length; i++){
		var oSpan = document.createElement('span');
		oSpan.innerHTML = str.charAt(i);
		oTitle.appendChild(oSpan);
	}
	var aSpan = oTitle.children;
	var n = 0; 
	timer = setInterval(function(){
		/*doMove(aSpan[n],{top:250,opacity:1},{time:2500});
		n++;
		if(n == aSpan.length){
			clearInterval(timer);
			
			doMove(oTitShadow,{opacity:1},{time:4000});
			oTitle.style.color = '#fff';
		}*/
		doMove(aSpan[n],{top:250,opacity:1},{time:2000});
		n++;
		if(n == aSpan.length-1){
			doMove(aSpan[n],{top:250,opacity:1},{time:2000,end:function(){
				//doMove(oTitShadow,{opacity:1},{time:1000,type:Tween.Quad.easeIn});
				oTitle.style.color = '#009A61';
			}});
			clearInterval(timer);	
		}
	},50);

	//第二屏滑动显示
	for(var i = 0; i < aLi.length; i++){
		var liW = aLi[0].offsetWidth;
		var liH = aLi[0].offsetHeight;
		var time = 400;

		aLi[i].onmouseover = function(ev){
			var oEvent = ev || event;
			var oFrom = oEvent.formElement || oEvent.relatedTarget;
			if(this.contains(oFrom)) return;

			var oImg = getByClass(this,'hideImg')[0];
			//var oImg1 = getByClass(this,'hideImg1')[0];
			switch(hoverDir(this,oEvent)){
				case 0:
					doMove(oImg,{left:'-'+liW, top:0},{time:time,type:Tween.Linear});
					break;
				case 1:
					doMove(oImg,{left:0, top:'-'+liH},{time:time,type:Tween.Linear});
					break;
				case 2:
					doMove(oImg,{left:liW, top:0},{time:time,type:Tween.Linear});
					break;
				case 3:
					doMove(oImg,{left:0, top:liH},{time:time,type:Tween.Linear});
					break;
			}
			//doMove(oImg,{left:0, top:0},{time:time,type:Tween.Linear});
		};

		aLi[i].onmouseout = function(ev){
			var oEvent = ev || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			var oImg = getByClass(this,'hideImg')[0];

			if(this.contains(oTo)) return;
			switch(hoverDir(this,oEvent)){
				case 0:
					oImg.style.left = '-' + liW + 'px';
					oImg.style.top = 0;
					break;
				case 1:
					oImg.style.left = 0;
					oImg.style.top ='-' + liH + 'px';
					break;
				case 2:
					oImg.style.left = liW + 'px';
					oImg.style.top = 0;
					break;
				case 3:
					oImg.style.left = 0;
					oImg.style.top = liH + 'px';
					break;
			}
			doMove(oImg,{left:0, top:0},{time:time,type:Tween.Linear});
		};
	}
	//var iNow = 0;
	/*addMouseWheel(document,function(bDown){
		if(bDown){
			iNow++;
			if(iNow == 5) return;
			//iNow = (iNow == 5) ? -1 : iNow;
		} else {
			iNow--;
			if(iNow == -1) return;
			//iNow = (iNow == -1) ? 5 : iNow;
		}
		document.title = iNow;
		changePage(arr[iNow%6]);
		//var target = getPos(aPage[2]).top - 60;
		//changePage(target);
	});*/
};
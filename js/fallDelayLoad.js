window.onload = function(){
	var ulBox = getByClass(document,"ul_box")[0];
	var aUl = ulBox.children;
	var total = 20;

	createLi();
	delayLoad();
	
	window.onscroll = function(){
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		var clientH = document.documentElement.clientHeight;
		var bodyH = document.body.scrollHeight;
		if(scrollT + clientH + 300 >= bodyH){
			createLi();
		}
		delayLoad();
	};

	//动态加载图片
	function createLi(){
		for(var i = 0; i < total; i++){
			var n = parseInt(Math.random()*20)+1;

			var oLi = document.createElement("li");
			var oImg = document.createElement('img');
			oImg.setAttribute('_src','images/img'+n+'.jpg');

			oLi.appendChild(oImg);

			if(n < 10){
				var h = n*30+80;
			} else {
				var h = n*30-100;
			}
			oImg.style.height = oLi.style.height = h + 'px';

			var arr = [];
			for(var j = 0; j < aUl.length; j++){
				arr.push(aUl[j]);
			}
			arr.sort(function(ul1,ul2){
				return ul1.offsetHeight - ul2.offsetHeight;
			});

			arr[0].appendChild(oLi);
		}
	}

	//判断加载图片
	function delayLoad(){
		var aImg = ulBox.getElementsByTagName('img');
		for(var i = 0; i < aImg.length; i++){
			var imgT = getPos(aImg[i]).top;
			var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
			var clientH = document.documentElement.clientHeight;
			if(imgT < scrollT + clientH){
				aImg[i].src = aImg[i].getAttribute('_src');
			}
		}
	}

};
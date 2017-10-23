
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj,false)[name];
	}
}

function startMove(obj,json,options){
	options = options || {};
	var time = options.time || 2000;
	var type = options.type || "linear";
	var start = {};
	var dis = {};
	
	for(var name in json){
		if(name == "opacity"){
			start[name] = parseFloat(getStyle(obj,name));
		} else {
			start[name] = parseInt(getStyle(obj,name));
		}
		dis[name] = json[name] - start[name];
	}
	
	var count = Math.round(time/30);
	var n = 0;

	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(type){
				case "linear":
					var a = n/count;
					var cur = start[name] + dis[name]*a;
					break;
				case "ease-in":
					var a = n/count;
					var cur = start[name] + dis[name]*a*a*a;
					break;
				case "ease-out":
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1-a*a*a);
					break;	
			}
			//var cur = start[name] + dis[name]/count*n;
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:" + cur*100 + ")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.fnEnd && options.fnEnd();
		}
	},30);
}
window.onload = function(){
	var oDiv = document.getElementById("div");
	var oHead = getByClass(document,'header')[0];
	var oH = oDiv.getElementsByTagName("div")[2];
	var oM = oDiv.getElementsByTagName("div")[1];
	var oS = oDiv.getElementsByTagName("div")[0];

	for(var i = 0; i < 60; i++){
		var oSpan = document.createElement("span");
		if(i%5 == 0){
			if(i == 0){
				oSpan.innerHTML = "<i>12</i>";
			} else {
				oSpan.innerHTML = "<i>"+i/5+"</i>";
			}
			oSpan.className = "on";
		} else {
			oSpan.innerHTML = "<i></i>";
		}
		
		oSpan.style.WebkitTransform = "rotate("+6*i+"deg)";
		oDiv.appendChild(oSpan);
	}

	function clock(){ 
		var oDate = new Date();
		var iH = oDate.getHours();
		var iM = oDate.getMinutes();
		var iS = oDate.getSeconds();
		var iMs = oDate.getMilliseconds();

		oH.style.WebkitTransform = "rotate("+(iH*30+iM/60*30)+"deg)";
		oM.style.WebkitTransform = "rotate("+(iM*6+iS/60*6)+"deg)";
		oS.style.WebkitTransform = "rotate("+(iS*6+iMs/1000*6)+"deg)";
	}

	clock();
	setInterval(clock,1000);

	oDiv.onmousedown = function(ev){
		var disX = ev.clientX - oDiv.offsetLeft;
		var disY = ev.clientY - getPos(oDiv).top;
		
		document.onmousemove = function(ev){
			oDiv.style.left = ev.clientX - disX + "px";
			oDiv.style.top = ev.clientY - disY - oHead.offsetHeight + "px";
			oDiv.style.margin = 0;
		};

		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};

};
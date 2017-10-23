window.onload=function(){
	var oUl=document.getElementById('ul1');
	var aLi=oUl.children;
	
	//假设document有left，top
	var x=0;
	var y=0;
	
	document.onmousedown=function(ev){
		var oEvent=ev || event;
		var disX=oEvent.clientX-x;
		var disY=oEvent.clientY-y;
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			x=oEvent.clientX-disX;
			y=oEvent.clientY-disY;	
			
			//document.title=x+','+y;
			
			//改li
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.marginLeft=x*aLi[i].style.zIndex/10+'px';
				aLi[i].style.marginTop=y*aLi[i].style.zIndex/10+'px';
			}
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		return false;
	};
};
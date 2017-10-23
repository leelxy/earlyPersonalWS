window.onload = function(){
	var oMain = getByClass(document,'main')[0];

	var oDiv = document.createElement('div');
	oDiv.className = 'calendar';
	oMain.appendChild(oDiv);

	var oPrev = document.createElement('a');
	oPrev.className = 'prev'
	oPrev.src = 'javascript:;';
	oPrev.innerHTML = '&lt;';
	oDiv.appendChild(oPrev);
	
	var oNext = document.createElement('a');
	oNext.className = 'next';
	oNext.src = 'javascript:;';
	oNext.innerHTML = '&gt;';
	oDiv.appendChild(oNext);

	var oSpan = document.createElement('span');
	oSpan.className = 'date';
	oDiv.appendChild(oSpan);

	var oOl = document.createElement('ol');
	oOl.innerHTML = '<li>MO</li>'
					+'<li>TU</li>'
					+'<li>WE</li>'
					+'<li>TH</li>'
					+'<li>FR</li>'
					+'<li>SA</li>'
					+'<li>SU</li>';
	oDiv.appendChild(oOl);

	var oUl = document.createElement('ul');
	oDiv.appendChild(oUl);

	var iNow = 0;

	oPrev.onclick = function(){
		iNow--;
		refresh();
	};

	oNext.onclick = function(){
		iNow++;
		refresh();
	};

	refresh();
	function refresh(){
		oUl.innerHTML = '';
		//span显示年月
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + iNow);
		var aMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		oSpan.innerHTML = aMonth[oDate.getMonth()] + '&nbsp;' + oDate.getFullYear(); 

		//显示每月的空格
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + iNow);
		oDate.setDate(1);
		var n = oDate.getDay();
		n == 0 && (n == 7);
		for(var i = 1; i < n; i++){
			var oLi = document.createElement('li');
			oUl.appendChild(oLi);
		}

		//li显示日期
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth() + iNow);
		var today = oDate.getDate();
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth() + 1);
		oDate.setDate(0);
		var total = oDate.getDate();
		for(var i = 1; i <= total; i++){
			var oLi = document.createElement('li');
			oLi.innerHTML = i;
			oUl.appendChild(oLi);

			if(iNow < 0){
				oLi.className = 'past';
			} else if(iNow == 0){
				if(i == today){
					oLi.className = 'today';
				} else if(i < today){
					oLi.className = 'past';
				}
			}
			
		}

		//周末变红
		for(var i = 0; i < oUl.children.length; i++){
			if(oUl.children[i].className == ''){
				if(i%7 == 5 || i%7 ==6){
					oUl.children[i].className = 'weekend';
				}
			}
		}
	}

	
};
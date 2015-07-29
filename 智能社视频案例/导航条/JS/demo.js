window.onload = function(){
	var oDiv = document.getElementById('div1');
	var oNavBox = oDiv.children[0];
	var oUl = oDiv.children[1];
	var aLi = oUl.getElementsByTagName('li');
	var opened = false;
	//让导航条分别往两边移动
	for(var i = 0;i<aLi.length;i++){
		if(i%2==1){
			aLi[i].style.left = -aLi[i].offsetWidth + 'px';
		}else{
			aLi[i].style.left = aLi[i].offsetWidth + 'px';			
		}
	}

	//导航条展开事件
	oNavBox.onclick = function(){
		//通过opened变量来判断双击导航条头部打开和隐藏
		if(opened){
			//opened = true时隐藏导航条列表
			var i = aLi.length-1;
			var timer = setInterval(function(){
				var aLeft = i%2 ? -aLi[i].offsetWidth : aLi[i].offsetWidth ;
				startMove(aLi[i],{left:aLeft,opacity:0});
				i--;
				if(i == -1){
					clearInterval(timer);
					opened = false;
				}
			},77);
			oNavBox.className='navBox';
		}else{
			//opened = false时显示导航条列表
			var i = 0;
			var timer = setInterval(function(){
				startMove(aLi[i],{left:0,opacity:100});
				i++;
				if(i == aLi.length){
					clearInterval(timer);
					opened = true;
				}		
			},77);
			oNavBox.className='navBox nav_active';
		}	
	}
	//导航条每一项aLi单击置顶事件；
	for(var i=0;i<aLi.length;i++){
		aLi[i].onclick = function(){
			oNavBox.children[0].innerHTML = this.children[0].innerHTML;	
			//从底部aLi开始左右回到原来位置	
			var i = aLi.length-1;
			var timer = setInterval(function(){
				var aLeft = i%2 ? -aLi[i].offsetWidth : aLi[i].offsetWidth ;
				startMove(aLi[i],{left:aLeft,opacity:0});
				i--;
				if(i == -1){
					clearInterval(timer);
					opened = false;
				}
			},77);
			oNavBox.className='navBox';
		}
	}

}
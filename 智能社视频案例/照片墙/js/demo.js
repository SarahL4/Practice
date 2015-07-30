window.onload = function(){
	var oDiv = document.getElementById('div1');
	var oUl = oDiv.children[0];
	var aLi = oUl.children;
	var now = 0;
	var ready=true;
	//获取按钮
	var aBtn1 = oDiv.children[1].getElementsByTagName('a');

	//将隐藏的图片全部叠加到第三排
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		
		if(i>=12)
		{
			aLi[i].style.top='400px';
		}
		else
		{
			aLi[i].style.top=parseInt(i/4)*200+'px';
		}
	}

	//给每张图片添加绝对定位
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.position='absolute';
	}

	for(var i=0;i<8;i++)
	{
		aLi[i].style.filter='alpha(opacity:100)';
		aLi[i].style.opacity=1;
	}
	//让下面的图片都隐藏
	for(var i=8;i<aLi.length;i++)
	{
		aLi[i].style.filter='alpha(opacity:0)';
		aLi[i].style.opacity=0;
	}
	oUl.className='list';

	//上一个按钮触发事件；
	aBtn1[0].onclick = function(){
		//使i=第三排最后一张照片
		var i = now+8-1;
		if(now == 0){
			return;
		}

		//防止运动叠加
		if(!ready)return;
		ready=false;

		var timer = setInterval(function(){					
			//第一行
			if(i<now){
				if(i==now-4)
				{
					//防止运动叠加
					startMove(aLi[i], {top: 0, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					startMove(aLi[i], {top: 0, opacity: 100});
				}
			}
			//第二行
			else if(i<now+4){
				startMove(aLi[i],{top:200});
			}
			else{
				startMove(aLi[i],{top:400,opacity:0});
			}
			i--;
			if(i == now-5){							
				clearInterval(timer);
				now-=4;
			}
		},40);
	}

	//下一个按钮触发事件；
	aBtn1[1].onclick = function(){
		var i = now;
		if(i == aLi.length-8){
			return;
		}
		//防止运动叠加
		if(!ready)return;
		ready=false;

		var timer = setInterval(function(){	
			//第一行
			if(i<now+4){
				startMove(aLi[i],{top:-200,opacity:0});
			}	
			//第二行
			else if(i<now+8){
				startMove(aLi[i],{top:0});
			}
			//第三行
			else {
				if(i==now+11)
				{
					//防止运动叠加
					startMove(aLi[i], {top: 200, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					startMove(aLi[i], {top: 200, opacity: 100});
				}			
			}
			i++;
			if(i == now+12){			
				now+=4;
				clearInterval(timer);
			}	
		},40);
	}

}
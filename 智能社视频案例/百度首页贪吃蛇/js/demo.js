window.onload = function(){
	var oDiv = document.getElementById('main');

	//定义版面的行数和列数，每个单元格宽度为30px,width为570px,height240px
	var R = 8;
	var C = 19;

	//定义存放蛇动画的数组
	var aSnake = [];

	for(var i=0;i<5;i++){
		var oNewDiv=document.createElement('div');
		oNewDiv.style.background='url(img/snake'+i+'.png)';		
		oDiv.appendChild(oNewDiv);
		//r-行	c-列  div-本身	d-方向 type-用于判断是蛇身体还是食物，蛇身体就添加样式旋转，否则不添加样式保持字体一直朝向下
		aSnake[i] = {r:0,c:5+i, div: oNewDiv,d:'l',type:'snake'};
		
		setPos(aSnake[i]);
	}
	//绘制蛇图形
	function setPos(obj){
		//oNewDiv.style
		obj.div.style.left=obj.c*30+'px';
		obj.div.style.top=obj.r*30+'px';
		if(obj.type == 'snake'){
			obj.div.className = obj.d;
		}else{
			obj.div.className = '';
		}
		
	}/*End setPos()*/
	//蛇移动
	var dir='l';
	
	var timer = setInterval(function(){
		//让蛇后一段根据前一段身体移动
		for(var i=aSnake.length-1;i>0;i--){
			aSnake[i].c = aSnake[i-1].c;
			aSnake[i].r = aSnake[i-1].r;
			aSnake[i].d = aSnake[i-1].d;
		}

		//移动蛇头
		switch(dir){
			case 'l': //向左
			aSnake[0].c--;
			break;
			case 't': //向上
			aSnake[0].r--;
			break;
			case 'r': //向右
			aSnake[0].c++;
			break;
			case 'b': //向下
			aSnake[0].r++;
			break;
		}

		//判断蛇是否有碰墙
		if(aSnake[0].c < 0 || aSnake[0].c >= C || aSnake[0].r < 0 || aSnake[0].r >= R){
			alert('碰墙了');
			clearInterval(timer);
			return;
		}



		//判断蛇是否按顺序吃文字
		for(var i=1;i<aEat.length;i++){
			if(aSnake[0].c == aEat[i].c && aSnake[0].r == aEat[i].r){
				alert('要按顺序吃成语!');
				clearInterval(timer);
				return;
			}
		}

		//判断蛇是否吃到自身
		for(var i=1;i<aSnake.length;i++){
			if(aSnake[0].c == aSnake[i].c && aSnake[0].r == aSnake[i].r){
				alert('吃到自己啦!');
				clearInterval(timer);
				return;	
			}
		}
		//检测蛇有没有吃到东西
		if(aSnake[0].c == aEat[0].c && aSnake[0].r == aEat[0].r){
			aSnake.splice(aSnake.length-3,0,aEat[0]);
			aEat.shift();
			if(aEat.length == 0){
				createEat();
			}
		}
		//重新绘制蛇移动后的新位置
		for(var i=0;i<aSnake.length;i++){
			setPos(aSnake[i]);
		}
		
	},200);/*End setInterval*/

	//通过获取键盘按键改变蛇移动方向
	document.onkeydown = function(ev){
		var oEvent = ev || event;
		switch(oEvent.keyCode){
			case 37:		//←
			dir='l';
			aSnake[0].d='l';
			break;
			case 38:		//↑
				dir='t';
				aSnake[0].d='t';
				break;
			case 39:		//→
				dir='r';
				aSnake[0].d='r';
				break;
			case 40:		//↓
				dir='b';
				aSnake[0].d='b';
				break;
		}
	};

	//放置食物
	var aEat = [];
	var nowRow = 0;
	function createEat(){
		while(aEat.length<4){
			//给四个字随机选定位置
			var r = parseInt(Math.random() * R);
			var c = parseInt(Math.random() * C);

			//found变量用来判断初始4个字自身及和蛇是否有重叠
			var found = false;

			//判断4个字是否出现重叠
			for(var i=0;i<aEat.length;i++){
				if(aEat[i].r == r && aEat[i].c ==c){
					found = true;
				}
			}
			//判断4个字是否和蛇重叠
			for(var i=0;i<aSnake.length;i++){
				if(aSnake[i].r == r && aSnake[i].c ==c){
					found = true;
				}
			}
			if(!found){
				var oNewDiv=document.createElement('div');
				//绘制该图片4个字
				oNewDiv.style.background='url(img/iconBg.jpg) -'+30*aEat.length+'px -'+30*nowRow+'px';
				oDiv.appendChild(oNewDiv);
				aEat.push({r:r,c:c,div:oNewDiv});
			}
		}
		for(var i=0;i<aEat.length;i++){
			setPos(aEat[i]);
		}
		nowRow++;
	}/*End creatEat()*/
	createEat();
}/*End window.onload*/
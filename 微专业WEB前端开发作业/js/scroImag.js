var buttons = document.getElementById('buttons').getElementsByTagName('li');	
var index = 1;
var timer;  //定义定时器
/* 定义图片播放动画函数 */
function animate(i){
	if(i > 0){
		index++;
		if(index > 3){
			index = 1;
		}
	}else{
		index--;
		if(index < 1){
			index = 3;
		}
	}
	showPic();
	showButton();
}

/* 显示图片函数 */
function showPic(){
	listImg.src = "images/banner" + index +".jpg";	
	switch(index){
		case 1:	
		listImg.alt = "网易公开课";
		listImg.parentNode.href = "http://open.163.com/";break;
		case 2:
		//console.log(2);
		listImg.alt = "云课堂";
		listImg.parentNode.href = "http://study.163.com/";break;	
		case 3:
		listImg.alt = "中国大学MOOC";
		listImg.parentNode.href = "http://www.icourse163.org/";break;
		default:break;
	};
	
	listImg.style.opacity = 0;
	//listImg.style.filter = 'alpha(opacity:0)';  到IE下检查正确性
	var speed = 0.1;
	var cur = 0;
	clearInterval(listImg.timer);
	listImg.timer = setInterval(function(){
		if(cur > 1){
			clearInterval();
		}else{
			listImg.style.opacity = cur;
			//listImg.style.filter = 'alpha(opacity:'+(cur * 100)+')';到IE下检查正确性
			cur += speed;
		}
	},50);
	
}

/* 定义图片导航圆点函数 */
function showButton(){
	for(var i=0;i<buttons.length;i++){
		if( buttons[i].className == "on" ){
		   	buttons[i].className = "";
			break;
		}
	}
	buttons[index - 1].className = "on";
}

/* 定义自动播放函数 */
function play(){
	timer = setInterval(function(){
		next.onclick();		
	},5000);
}

/* 定义停止播放函数 */
function stopPlay(){
	clearInterval(timer);
}


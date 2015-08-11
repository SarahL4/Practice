/* 主函数 */
window.onload = function(){
	/* 获取元素对象 */
	var images = document.getElementById('m-image');
	var listImg = document.getElementById('listImg');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	
	/* 向左箭头点击事件 */
	prev.onclick = function(){
		animate(-1);
	};
	/* 向右箭头点击事件 */
	next.onclick = function(){
		animate(1);
	};
	/* 点击小圆点切换事件 */
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick = function(){
			if(parseInt(this.getAttribute('index')) == index){
				return;
			}else{
				index = parseInt(this.getAttribute('index'));
				showPic();
				showButton();
			}
		}
	}
	showPic();
	play();
	/* 动画自动播放函数 */
	images.onmouseout = function(){
		play();
	};
	images.onmouseover = function(){
		stopPlay();
	};
}
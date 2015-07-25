var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//const endTime = new Date;
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

	curShowTime = getCurrentShowTime();
	setInterval(function(){
		render(context);
		update();
	},50);
}


//获取当前时间函数
function getCurrentShowTime(){
	var curTime = new Date();
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();

	return ret;

}


//获取并输出当前时间位置给renderDigit函数进行绘制；
function render(ext){

	ext.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

	var hours = parseInt(curShowTime/3600);
	var minutes = parseInt((curShowTime - hours*3600)/60);
	var seconds = curShowTime % 60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ext);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ext);
	//绘制时间中间的：号
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,ext);
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ext);
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ext);

	renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,ext);
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ext);
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ext);


//绘制小球
	for(var i = 0;i<balls.length;i++){
		ext.fillStyle=balls[i].color;
		ext.beginPath();
		ext.arc(balls[i].x , balls[i].y , RADIUS , 0,2*Math.PI,true);
		ext.closePath();

		ext.fill();
	}
}




//绘制时间函数
 function renderDigit(x,y,num,ext){

 	ext.fillStyle = "rgb(0,102,153)";

 	for(var i=0;i<digit[num].length;i++){
 		for(var j=0;j<digit[num][i].length;j++){
 			if(digit[num][i][j]==1){
 				ext.beginPath();
 				ext.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0,2*Math.PI);
 				ext.closePath();

 				ext.fill();
 			}
 		}
 	}
 }

//判断当前时间是否发生变化，变化了就通过addBalls函数绘制弹出小球
function update(){

	var nextShowTime = getCurrentShowTime();
	var nextHours = parseInt(nextShowTime/3600);
	var nextMinutes = parseInt((nextShowTime - nextHours*3600)/60);
	var nextSeconds = nextShowTime % 60;

	var curHours = parseInt(curShowTime/3600);
	var curMinutes = parseInt((curShowTime - curHours*3600)/60);
	var curSeconds = curShowTime % 60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
		}
		if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        //将变化后的时间值赋给当前时间，这样可以让时间开始倒计时；
         curShowTime = nextShowTime;
	}
	updateBalls();
	console.log(balls.length);
}




//绘制时间变化后的函数
function addBalls(x,y,num){
	for(var i = 0;i<digit[num].length;i++){
		for(var j = 0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length )]
             }
             balls.push( aBall );
			}	

		}
	}
}



//让小球运动起来
function updateBalls(){
	for(var i = 0;i < balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }

	}
	var cnt = 0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS < WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while( balls.length > cnt ){
        balls.pop();
    }


}



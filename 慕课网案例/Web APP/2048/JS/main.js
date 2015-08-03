/* 初始化数组和分数 */
var array = new Array();
var score = 0;

$(function(){
	newgame();
});
/* 初始化函数 */
function newgame(){
	//初始化游戏单元格;
	init();
	//给两个单元格随机创建两个数字
	createNum();
	createNum();
}

/* 初始化游戏单元格函数 */
function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell = $('#grid-cell-'+i+'-'+j);
			/* 绘制游戏单元格 */
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	/* 将一维数组初始化为二维数组 */
	for(var i=0;i<4;i++){
		array[i] = new Array();
		for(var j=0;j<4;j++){
			array[i][j] = 0;		
		}
	}
	/* 为每个单元格添加一个数字单元格 */
	updateArrayView();
}
/* 添加数字单元格函数 */
function updateArrayView(){
	/* 更新数字前要将原来的数字删除( 重要！) */
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){			
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+"-"+j+'"></div>');
			var numberCell = $('#number-cell-'+i+'-'+j);

			if(array[i][j]==0){
				numberCell.css('width','0');
				numberCell.css('height','0');
				numberCell.css('top',getPosTop(i,j)+50);
				numberCell.css('left',getPosLeft(i,j)+50);
			}else{
				numberCell.css('width','100');
				numberCell.css('height','100');
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getBackgroundColor(array[i][j]));
				numberCell.css('color',getColor(array[i][j]));
				numberCell.text(array[i][j]);
			}
		}
	}
}

/* 给两个单元格随机创建数字函数 */
function createNum(){
	if(nospace(array)){
		return false;
	}
	while(true){

		var randx = parseInt( Math.floor( Math.random()  * 4 ) );
	    var randy = parseInt( Math.floor( Math.random()  * 4 ) );
		if(array[randx][randy]==0)
			break;
	}
	/* 创建一个随机2或4的数字 */
	var randNumber =  Math.random() < 0.5 ? 2 : 4;
	array[randx][randy] = randNumber;
	showNumber(randx,randy,randNumber);
}

/* 键盘方向键事件 */
$(document).keydown(function(event){
	switch(event.keyCode){
		//console.log(event.keyCode);
		case 37: //left
            if( moveLeft() ){
            	// console.log(1);
                createNum();
                isGameOver();
            }
            break;
        case 38: //up
            if( moveUp() ){
                createNum();
                isGameOver();
            }
            break;
        case 39: //right
            if( moveRight() ){
                createNum();
                isGameOver();
            }
            break;
        case 40: //down
            if( moveDown() ){
                createNum();
                isGameOver();
            }
            break;
        default: break;//default     
	}
});

/* 向左移动函数 */
function moveLeft(){
	if(!canMoveLeft(array)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(array[i][j]!=0){
				for(var k=0;k<j;k++){
					if(array[i][k]==0 && noBlockHorizontal(i,j,k,array)){
						showMoveAnimation( i , j , i , k );
						array[i][k] = array[i][j];
						array[i][j] = 0;
						continue;
					}else if(array[i][k]==array[i][j] && noBlockHorizontal(i,j,k,array)){
						showMoveAnimation( i , j , i , k );
						array[i][k] += array[i][j];
						array[i][j] = 0;
						continue;
					}
				}				
			}
		}
	}
	setTimeout("updateArrayView()",200);
	return true;
}

/* 向上移动函数 */
function moveUp(){
	if(!canMoveUp(array)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(array[j][i]!=0){
				for(var k=0;k<j;k++){
					if(array[k][i]==0 && noBlockVertical(j,i,k,array)){
						showMoveAnimation( j , i , k , i );
						array[k][i] = array[j][i];
						array[j][i] = 0;
						continue;
					}else if(array[k][i]==array[j][i] && noBlockVertical(j,i,k,array)){
						showMoveAnimation( j , i , k , i );
						array[k][i] += array[j][i];
						array[j][i] = 0;
						continue;
					}
				}				
			}
		}
	}
	setTimeout("updateArrayView()",200);
	return true;
}

/* 向右移动函数 */
function moveRight(){
	if(!canMoveRight(array)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(array[i][j]!=0){
				for(var k=3;k>j;k--){
					if(array[i][k]==0 && noBlockHorizontal(i,j,k,array)){
						showMoveAnimation( i , j , i , k );
						array[i][k] = array[i][j];
						array[i][j] = 0;
						continue;
					}else if(array[i][k]==array[i][j] && noBlockHorizontal(i,j,k,array)){
						showMoveAnimation( i , j , i , k );
						array[i][k] += array[i][j];
						array[i][j] = 0;
						continue;
					}
				}				
			}
		}
	}
	setTimeout("updateArrayView()",200);
	return true;
}

/* 向下移动函数 */
function moveDown(){
	if(!canMoveDown(array)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(array[j][i]!=0){
				for(var k=3;k>j;k--){
					if(array[k][i]==0 && noBlockVertical(j,i,k,array)){
						showMoveAnimation( j , i , k , i );
						array[k][i] = array[j][i];
						array[j][i] = 0;
						continue;
					}else if(array[k][i]==array[j][i] && noBlockVertical(j,i,k,array)){
						showMoveAnimation( j , i , k , i );
						array[k][i] += array[j][i];
						array[j][i] = 0;
						continue;
					}
				}				
			}
		}
	}
	setTimeout("updateArrayView()",200);
	return true;
}

/* 判断游戏是否结束 */
function isGameOver(){

}


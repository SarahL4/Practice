/* 初始化数组和分数 */
var array = new Array(),
	hasConflicted = new Array(),
	score = 0;
/* 初始化移动端点击初始位置和离开位置 */
var startx = 0,starty = 0,endx = 0,endy = 0;

$(function(){
	prepareForMobile();
	newgame();
});

/* 使用百分数初始化屏幕的宽高，响应式布局 */
function prepareForMobile(){
	//当屏幕宽度超过500时采用固定宽度布局
    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

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
		hasConflicted[i] = new Array();
		for(var j=0;j<4;j++){
			array[i][j] = 0;		
			hasConflicted[i][j] = false;
		}
	}
	/* 为每个单元格添加一个数字单元格 */
	updateArrayView();
	score = 0;
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
				numberCell.css('top',getPosTop(i,j) + cellSideLength/2);
				numberCell.css('left',getPosLeft(i,j) + cellSideLength/2);
			}else{
				numberCell.css('width',cellSideLength);
				numberCell.css('height',cellSideLength);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getBackgroundColor(array[i][j]));
				numberCell.css('color',getColor(array[i][j]));
				numberCell.text(array[i][j]);
			}
		hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

/* 给两个单元格随机创建数字函数 */
function createNum(){
	if(nospace(array)){
		return false;
	}
	var times = 0;
	while(times < 50){

		var randx = parseInt( Math.floor( Math.random()  * 4 ) );
	    var randy = parseInt( Math.floor( Math.random()  * 4 ) );
		if(array[randx][randy]==0)
			break;
		times ++;
	}
	if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }
	/* 创建一个随机2或4的数字 */
	var randNumber =  Math.random() < 0.5 ? 2 : 4;
	array[randx][randy] = randNumber;
	showNumber(randx,randy,randNumber);
	return true;
}

/* 键盘方向键事件 */
$(document).keydown(function(event){
	//作用是阻止游览器默认向下向上滚动事件，不过还会阻止其他事件，所以要是还有其他需要处理事件应该将该语句分别放到case中
	//event.preventDefault();
	switch(event.keyCode){
		case 37: //left
            if( moveLeft() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);	
            }
            break;
        default: break;//default     
	}
});

/* 手指滑动点击事件 */
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

/* 手指滑动离开事件 */
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
    var deltay = endy - starty;

    if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
        return;

    if(Math.abs(deltax) > Math.abs(deltay)){
    	//水平向→滑动
    	if(deltax > 0){
    		if( moveRight() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);
            }
    	}else{
    		//水平向←滑动
    		if( moveLeft() ){
                setTimeout('createNum()',210);
                setTimeout('isGameOver()',300);
            }
    	}
    }else{
    		//垂直向⬇️滑动
    		if(deltay > 0){
    			if( moveDown() ){
                	setTimeout('createNum()',210);
                	setTimeout('isGameOver()',300);	
           		}
    		}else{
    			//垂直向↑滑动
    			if( moveUp() ){
                	setTimeout('createNum()',210);
                	setTimeout('isGameOver()',300);
            	}
    		}
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
					}else if(array[i][k]==array[i][j] && noBlockHorizontal(i,j,k,array) && !hasConflicted[i][k]){
						showMoveAnimation( i , j , i , k );
						array[i][k] += array[i][j];
						array[i][j] = 0;
						score += array[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
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
					}else if(array[k][i]==array[j][i] && noBlockVertical(j,i,k,array) && !hasConflicted[k][i]){
						showMoveAnimation( j , i , k , i );
						array[k][i] += array[j][i];
						array[j][i] = 0;
						score += array[k][i];
						updateScore(score);
						hasConflicted[k][i] = true;
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
					if(array[i][k]==0 && noBlockHorizontal(i,k,j,array)){
						showMoveAnimation( i , j , i , k );
						array[i][k] = array[i][j];
						array[i][j] = 0;
						continue;
					}else if(array[i][k]==array[i][j] && noBlockHorizontal(i,k,j,array) && !hasConflicted[i][k]){
						showMoveAnimation( i , j , i , k );
						array[i][k] += array[i][j];
						array[i][j] = 0;
						score += array[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
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
					if(array[k][i]==0 && noBlockVertical(k,i,j,array)){
						showMoveAnimation( j , i , k , i );
						array[k][i] = array[j][i];
						array[j][i] = 0;
						continue;
					}else if(array[k][i]==array[j][i] && noBlockVertical(k,i,j,array) && !hasConflicted[k][i]){
						showMoveAnimation( j , i , k , i );
						array[k][i] += array[j][i];
						array[j][i] = 0;
						score += array[k][i];
						updateScore(score);
						hasConflicted[k][i] = true;
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
	if(nospace(array) && nomove(array)){
		alert('Game Is Over');
	}
}


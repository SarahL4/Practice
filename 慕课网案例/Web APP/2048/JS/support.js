/* 绘制游戏单元格 */
function getPosTop(i,j){
	return 20 + 120 * i; 
}

function getPosLeft(i,j){
	return 20 + 120 * j;
}

/* 定义数字单元格背景颜色 */
function getBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	return "black";
}

/* 定义数字单元格字体颜色 */
function getColor(number){
	if( number <= 4 )
        return "#776e65";

    return "white";
}
/* 判断是否还有剩余单元格来创建新数字 */
function nospace(array){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(array[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

/* 判断是否可以向左移动 */
function canMoveLeft( array ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( array[i][j] != 0 )
                if( array[i][j-1] == 0 || array[i][j-1] == array[i][j] )
                    return true;

    return false;
}

/* 判断是否可以向上移动 */
function canMoveUp( array ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( array[j][i] != 0 )
                if( array[j-1][i] == 0 || array[j-1][i] == array[j][i] )
                    return true;

    return false;
}

/* 判断是否可以向右移动 */
function canMoveRight( array ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( array[i][j] != 0 )
                if( array[i][j+1] == 0 || array[i][j+1] == array[i][j] )
                    return true;

    return false;
}

/* 判断是否可以向下移动 */
function canMoveDown( array ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( array[j][i] != 0 )
                if( array[j+1][i] == 0 || array[j+1][i] == array[j][i] )
                    return true;

    return false;
}

/* 判断两个单元格水平中间是否有数字 */
function noBlockHorizontal(row , col1 , col2 , array){
	for(var k=col2+1;k<col1;k++){
		if(array[row][k]!=0)
			return false;
	}
	return true;
}

/* 判断两个单元格垂直中间是否有数字 */
function noBlockVertical(row , col1 , col2 , array){
	for(var k=col2+1;k<row;k++){
		if(array[k][col1]!=0)
			return false;
	}
	return true;
}

/* 显示数字动画 */
function showNumber(i,j,randNumber){
	var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getBackgroundColor( randNumber ) );
	numberCell.css('color',getColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop( i , j ),
        left:getPosLeft( i , j )
	},50);
}

/* 单元格移动动画函数 */
function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

/* 更新分数函数 */
function updateScore(score){
	// if(board > 20){
	// 	for(var i=0;i<4;i++){
	// 		for(var j=0;j<4;j++){
	// 			if(array[i][j]>20)
	// 				$('#number-cell-' + i + "-" + k).css('font-size',0.4*cellSideLength+'px');
	// 		}
	// 	}
	// 	//decFontSize();	
	// 	//console.log($('#number-cell-' + i + "-" + k),array);
	// }
	$('#score').text(score);
}

/* 将大于1000的数字字体变小防止溢出 */
// function decFontSize(){
// 	for(var i=0;i<4;i++){
// 		for(var j=0;j<4;j++){
// 			if()
// 		}
// 	}
// }
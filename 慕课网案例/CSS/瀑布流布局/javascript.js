window.onload = function(){
	waterfall('main','pin');
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll = function(){
		if(checkScrollSide()){
			var oParent = document.getElementById('main');
			// var aPin = getClassName(oParent,'pin');
			for(var i=0;i<dataInt.data.length;i++){
				var oDiv = document.createElement('div');
				oDiv.className = 'pin';
				oParent.appendChild(oDiv);
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oDiv.appendChild(oBox);
				var oImg=document.createElement('img');
				oImg.src = './images/'+dataInt.data[i].src;
				oBox.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	}
}
/*
	主函数
    parend 父级id
    pin 元素id
*/
function waterfall(parent,element){
	var oParent = document.getElementById(parent);
	var aPin = getClassName(oParent,'pin');
	var iPinW = aPin[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth/iPinW);
	oParent.style.cssText = "width:"+ num * iPinW + "px;margin:0 auto;";
	pinHArr = [];
	for(var i=0;i<aPin.length;i++){
		if(i<num){
			pinHArr[i] = aPin[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,pinHArr);			
			var minHIndex = getMinHIndex(pinHArr,minH);
			aPin[i].style.position = 'absolute';
			aPin[i].style.top = minH + 'px';
			aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
			pinHArr[minHIndex] += aPin[i].offsetHeight;
		}
	}
}

/* 获取元素类名 */
function getClassName(parent,className){
	if(parent.getElementsByClassName){
		return parent.getElementsByClassName(className);
	}
	else{
		var sum = [],
			flag = true,
			classNameStr,
		    elements = parent.getElementsByTagName('*');
		className = className.split(' ');
		for(var i=0;element=elements[i],i<elements.length;i++){
			classNameStr = " " + element.className + " ";
			flag = true;
			for(var j=0,name;name=className[j];j++){
				if(classNameStr.indexOf(" "+className[j]+" ") == -1){
					flag = false;
					break;
				}
			}
			if(flag){
				sum.push('element');
			}
		}
		return sum;
	}
}

/****
    *获取 pin高度 最小值的索引index
    */
function getMinHIndex(arr,minH){
	for(var i in arr){
		if(arr[i]==minH)
			return i;
	}
}

/* 滚动一定高度后触发添加新图片 */
function checkScrollSide(){
	var oParent = document.getElementById('main');
	var aPin = getClassName(oParent,'pin');
	//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	var lastPinH = aPin[aPin.length-1].offsetTop + Math.floor(aPin[aPin.length-1].offsetHeight/2);
	//兼容性
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var documentH = document.documentElement.clientHeight || document.body.clientHeight;	
	return (lastPinH < scrollTop + documentH) ? true : false;
}
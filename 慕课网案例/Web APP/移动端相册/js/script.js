
var total = 17;
var zWin = $(window).width();     //获取屏幕宽度
var largeImage = $('#large_img'); //获取大图中img对象
var domImage = largeImage[0];	  //将zepto对象转换成dom对象
var cid;						  //存储当前点击li的data-id值
render();						  //绘制首页图片函数

//事件代理，为子元素li添加触摸事件
$('#container').delegate('li', 'tap', function() {
	var _id = cid = $(this).attr('data-id');
	loadImg(_id);
});

//手势向右滑动，回到上一张图片
largeImage.swipeRight(function(){
	cid --;
	if(cid < 1){
		cid = 1;
		return;
	}			
	//通过callback函数给向右滑动添加动画
	loadImg(cid,function(){	
		//通过给DOM图片添加事件监听，当图片动画结束后删除图片上动画class，避免再切换到下张图片时没有动画效果	
		domImage.addEventListener('webkitAnimationEnd',function(){
			largeImage.removeClass('animated bounceInRight');
			//删除监听事件
			domImage.removeEventListener('webkitAnimationEnd');
		});
		//添加向右滑动动画效果
		largeImage.addClass('animated bounceInRight');
	});	
});
//手势向左滑动，到下一张图片
largeImage.swipeLeft(function(){
	cid ++;
	if(cid > total){
		cid = total;
		return;
	}			

	loadImg(cid,function(){			
		domImage.addEventListener('webkitAnimationEnd',function(){
			largeImage.removeClass('animated bounceInLeft');
			domImage.removeEventListener('webkitAnimationEnd');
		});
		largeImage.addClass('animated bounceInLeft');	
	});
});

//点击图片和遮罩层关闭大图回到主页
$('#large_container').tap(function(){
	$(this).hide();
});

//绘制首页图片函数
function render(){
	var tmpl = '';
	var padding = 2;                                    //图片间距
	var picWidth = Math.floor((zWin - padding * 3 )/4); //单张图片宽度
	for(var i=1;i<=total;i++){
		var p = padding;
		if(i%4==1){										//第一列图片没有左边距
			p = 0;
		}
		//首页图片列表，使用canvas替换img标签的好处是可以激活硬件设备的GPU加速
		tmpl += "<li data-id="+i+" class='animated bounceIn' style='padding-top:"+padding+"px;padding-left:"+p+"px;'><canvas id=cvs_"+i+" style='width:"+picWidth+"px;height:"+picWidth+"px'></canvas></li>";
		var imageObj = new Image();     			
		imageObj.index = i;
		imageObj.src = "img/"+i+".jpg";
		
		//图片加载
		imageObj.onload = function(){
			//获取canvas上下文绘图环境
			var cvs = $('#cvs_'+this.index)[0].getContext('2d');
			$('#cvs_'+this.index)[0].width = this.width;         //获取图片对象的宽高赋值给画布大小
			$('#cvs_'+this.index)[0].height = this.height;
			cvs.drawImage(this,0,0);
		}
	}
	//添加到父容器中
	$('#container').html(tmpl);
}
//图片加载函数
function loadImg(id,callback){
	//设置遮罩的宽高为屏幕的宽高
	$('#large_container').css({
		'width':$(window).width(),
		'height':$(window).height()
	}).show();
	var imageObj = new Image();
	var imageSrc = "img/" + id + ".large.jpg";
	imageObj.src = imageSrc;
	imageObj.onload = function(){
		var imagW = this.width;                	//设置图片的宽度和高度
		var imagH = this.height;
		var winWidth = $(window).width();       //窗口高度和宽度
		var winHeight = $(window).height();
		var paddingLeft = parseInt((winWidth - winHeight * imagW/imagH)/2);//设置左右的padding值
		var paddingTop = parseInt((winHeight - winWidth * imagH/imagW)/2);//设置上下的padding值
		//每次切换到另一张图片前要设置图片的宽高及间距为默认值，避免横图和竖图之间切换出现问题
		largeImage.css({'width':'auto','height':'auto'}).css({'padding':0});
		if(imagH/imagW > 1.2){
			//图片的高度大于图片宽度的20%，说明是竖向图片
			largeImage.attr('src',imageSrc).css({'height':winHeight,'padding-left':paddingLeft});
		}else{
			//横向图片
			largeImage.attr('src',imageSrc).css({'width':winWidth,'padding-top':paddingTop});
		}
		callback && callback();
	};
}

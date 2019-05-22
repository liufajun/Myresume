	/*淡入淡出封装*/
		function fadeIn_fadeOut(hover_fadeIn,hover_fadeOut){
			$(hover_fadeIn).hover(function(){
					$(hover_fadeOut).fadeIn(400);
					},function(){
					$(hover_fadeOut).fadeOut("slow");
			  });
		};
	/*隐藏显示封装*/
		function show_hide(hover_show,hover_hide){
			$(hover_show).hover(function(){
					$(hover_hide).show();
					},function(){
					$(hover_hide).hide();
			  });
		};
	/*banner轮播封装*/
			$(function(){
				var $banner = $("#banner");
				var $tabLi = $("#banner .tab ul li");
				var $picLi = $("#banner .pic ul li");
				var $btnDiv = $("#arrow div");
				var index = 0;
				var timer = null;
				var nowTime = 0;
				//hover()有两个参数时(鼠标移入事件和移出事件)
				$banner.hover(function(){
					//鼠标移入清除定时
					$btnDiv.show();//$btnDiv在样式中设置了隐藏,显示箭头
					clearInterval(timer);
				},function(){//鼠标移出隐藏箭头
					$btnDiv.hide();
					auto();//移出时继续执行定时
				});

			$btnDiv.click(function(){
			/*
				这个t:new Date()是为了迷惑浏览器而发送的随机数,因为如果是某些浏览器(比如ie6),在短时间内多次点击某个相同链接(如:http://abc.com/a.html),会被认为是一个链接而不予响应,如果在后面加上一个随机数,每次点击都不同,浏览器会认为是不同链接,就会及时响应.(jq不可用)这跟t:Math.random()是一样的,没有任何实际意义,后台也不会对其做处理
			*/
				if(new Date() - nowTime > 800){//800毫秒内点击箭头多次,定时器跟不上
					nowTime = new Date();
					var i = $(this).index();
				
					if(i){//右箭头
						//alert(i);点左箭头弹出0(0代表假),右箭头弹出1(1表示真)
						index++;
						index %= $tabLi.length;//0-5 ,下标不能超过5，等于6时取模会变成0
					}else{//左箭头
						index--;
						if(index<0) index = $tabLi.length-1;//下标小于0就等于5
					}
					fn();
				};
			}).mousedown(function(){
			//快速点击箭头的时候,箭头会出现蓝色,通过mousedown去除鼠标默认事件
				return false;
			});
			$tabLi.hover(function(){
				index = $(this).index();
				fn();
			});
			function fn(){
				$tabLi.eq(index).addClass("on").siblings().removeClass("on");
			//鼠标在数字li中快速来回滑动后再移出,图片会一直在切换(但数字li不会在一直切换)所以要用stop()
				$picLi.eq(index).stop(true).fadeIn("slow").siblings().stop(true).fadeOut("slow");
			};
			
			function auto(){
				timer = setInterval(function(){
						index++;
						index %= $tabLi.length;//定时轮播时下标不能超出5,等于6时取模会变成0
						$tabLi.eq(index).addClass("on").siblings().removeClass("on");
						$picLi.eq(index).stop(true).fadeIn("slow").siblings().stop(true).fadeOut("slow");
					},1500);
				};
					auto();
			});
			
		
		

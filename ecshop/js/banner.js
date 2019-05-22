
		$(function(){
			var $banner = $("#banner");
			var $tabLi = $("#banner .tab ul li");
			var $picLi = $("#banner .pic ul li");
			var $btnDiv = $("#banner .btn div");
			var index = 0;
			var timer = null;
			var nowTime = 0;
			$banner.hover(function(){
				//鼠标移入显示左右箭头和清除定时
				$btnDiv.show();
				clearInterval(timer);
			},function(){
				$btnDiv.hide();
				auto();
			});

			$btnDiv.click(function(){
				if(new Date() - nowTime > 800){
					nowTime = new Date();
					var i = $(this).index();
					//判断轮播边界
					if(i){//右箭头
						
						index++;
						index %= $tabLi.length;
					}else{//左箭头
						index--;
						if(index<0) index = $tabLi.length-1;
					}
					fn();
				};
			}).mousedown(function(){
			//去除鼠标默认事件
				return false;
			});
			$tabLi.hover(function(){
				index = $(this).index();
				fn();
			});
			//动画效果封装
			function fn(){
				$tabLi.eq(index).addClass("on").siblings().removeClass("on");
				$picLi.eq(index).stop(true).fadeIn("slow").siblings().stop(true).fadeOut("slow");
			};
			//定时器封装
			function auto(){
				timer = setInterval(function(){
					index++;
					index %= $tabLi.length;
					$tabLi.eq(index).addClass("on").siblings().removeClass("on");
					$picLi.eq(index).stop(true).fadeIn("slow").siblings().stop(true).fadeOut("slow");
				},1500);
			};
			auto();
		});
	
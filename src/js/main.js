var index = function(){
	//banner
	function bannerMovement(){
		var bannerFrame = document.querySelector(".banner-frame");
		var bannerBox = bannerFrame.querySelector(".banner-box");
		var btns = bannerFrame.querySelectorAll(".banner-button");
		var time = null;
		var z = 0;
		var leftX = 0;

		bannerBox.style.left = "0%";
		btns[0].style.backgroundPosition = "0 -29px";

		//按钮banner切换
		for(var i = 0, len = btns.length; i < len; i++){
			btns[i].onclick = function(){
				for(var j = 0; j < len; j++){
					if(btns[j] == this){
						z = j;
						leftX = -j*100;
						btns[j].style.backgroundPosition = "0 -29px";
						startMove(bannerBox,{left:-j*100},20,1);
						clearInterval(time);
						time = setInterval(gundong,9000);
					}else{
						btns[j].style.backgroundPosition = "0 0";
					}
				}
			}
		}

		//定时滚动banner
		var time = setInterval(gundong,9000);
		function gundong(){
			if(leftX > -400){
				leftX = leftX - 100;
				startMove(bannerBox,{left:leftX},20,1);
			}else{
				leftX = 0;
				startMove(bannerBox,{left:leftX},20,1);
			}
			if(z == 4) z = 0; else z++;
			for(var i = 0; i< len; i++){
				if (z == i) {
					btns[i].style.backgroundPosition = "0 -29px";
				}else{
					btns[i].style.backgroundPosition = "0 0";
				}
			}
		}
	}

	//右边弹窗
	function rightWindow(){
		var rWid = document.querySelector(".r-wid");
		var rWidR = document.querySelector(".r-wid-r");
		var rWidS = document.querySelector(".r-wid-s");
		var rWidD = document.querySelector(".r-wid-d");
		var rWidB = document.querySelector(".r-wid-btm");
		var kefu = document.querySelectorAll(".Rwid-kefu");
		var speed = 0;
		var rp;
		var time;

		function rWidmove(taget){
			clearInterval(time);
			time = setInterval(function(){
				var speed = (taget-offsetRight("r-wid",146))/100;
				speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
				if(offsetRight("r-wid",146) == taget){			
					clearInterval(time);
				}else{
					rWid.style.right = offsetRight("r-wid",146) + speed + 'px';
				}
			},5);
		};

		rWidR.onclick = function(){
			if(offsetRight("r-wid",146) == 0){
				rWidS.innerHTML = "展开";
				rWidD.style.backgroundPosition = "-87px -55px";
				rWidmove(-146);
			}else{
				rWidS.innerHTML = "收起";
				rWidD.style.backgroundPosition = "-87px -11px";
				rWidmove(0);
			}
		}
		rWidR.onmouseover = function(){
			rWidR.style.backgroundColor = "#c6523c";
		}
		rWidR.onmouseout=function(){
			rWidR.style.backgroundColor = "#ac3c26";
		}		
		rWidB.onmouseover=function(){
			this.style.backgroundPosition = "-145px 0px";
		}
		rWidB.onmouseout=function(){
			this.style.backgroundPosition = "0 0";
		}

		for(var i = 0, len = kefu.length;i < len; i++){
			kefu[i].onmouseover = function(){
				this.style.backgroundColor = "#525e63";
				rp = this.querySelector(".Rwid-pto");
				rp.style.backgroundPosition = getCSS(rp,"backgroundPosition").split(" ")[0] + " -52px";

			}
			kefu[i].onmouseout=function(){
				this.style.backgroundColor = "#2c3437";
				rp = this.querySelector(".Rwid-pto");
				rp.style.backgroundPosition = getCSS(rp,"backgroundPosition").split(" ")[0] + " -8px";
			}
		}	
	}

	//活动中心
	function contAct(){
		var act = document.querySelector(".l-act-cont");
		var divs = act.getElementsByTagName("div");
		var imgs = act.getElementsByTagName("img");
		var lis = act.getElementsByTagName("li");

		for(var i=0, len = lis.length; i < len; i++){
			lis[i].index = i;
			lis[i].onmouseover=function(){
				divs[this.index].style.display = "block";
				imgs[this.index].style.border = "3px #9e3427 solid";
				imgs[this.index].style.width = "200px";
				imgs[this.index].style.height = "126px";
			}
			lis[i].onmouseout=function(){
				for(var j = 0; j < len; j++){
					divs[this.index].style.display = "none";
					imgs[this.index].style.border = "none";
					imgs[this.index].style.width = "206px";
					imgs[this.index].style.height = "132px";
				}
			}
		}
	}

	//新闻中心
	function newsCenter(){
		var navs = document.querySelector(".news-nav").getElementsByTagName("li");
		var news = document.querySelector(".l-news-cont");
		var conts = news.querySelectorAll(".news-cont");

		navs[0].style.backgroundPosition = "center bottom";
		conts[0].style.display = "block";
		for(var i=0, len = navs.length; i < len; i++){
			navs[i].index = i;
			navs[i].onmouseover = function(){
				for(var j = 0; j < len; j++){
					navs[j].style.backgroundPosition = "center top";
					conts[j].style.display = "none";
				}
				this.style.backgroundPosition = "center bottom";
				conts[this.index].style.display = "block";
			}
		}
	}

	//历史专题
	function history(){	
		var goleft = document.querySelector(".r-history-l");
		var goright = document.querySelector(".r-history-r");
		var movingFrame = document.getElementById("movingFrame");
		var newfirst = document.createElement("li");
		var newlast = document.createElement("li");
		var time = null;
		var start = 1;

		if(movingFrame.firstElementChild && movingFrame.lastElementChild){
			newfirst.innerHTML = movingFrame.lastElementChild.innerHTML;
			newlast.innerHTML = movingFrame.firstElementChild.innerHTML;
			movingFrame.appendChild(newlast);
			movingFrame.insertBefore(newfirst,movingFrame.firstElementChild);
		} else {
			//兼容IE8
			del_ff(movingFrame);
			newfirst.innerHTML = movingFrame.lastChild.innerHTML;
			newlast.innerHTML = movingFrame.firstChild.innerHTML;
			movingFrame.appendChild(newlast);
			movingFrame.insertBefore(newfirst,movingFrame.firstChild);
		}

		//向左、向右移动函数
		function move(num){
			uleft = movingFrame.offsetLeft + num;
			startMove(movingFrame,{left:uleft},3,0,function(){
				start = 1;
			});
		}
		function turnleft(){
			var uleft;
			if(start == 1){
				start = 0;
				if(movingFrame.offsetLeft >= -143){
					movingFrame.style.left = "-2141px";
				}
				move(222);
			}	
		};
		function turnright(){
			var uleft;
			if(start == 1){
				start = 0;
				if(movingFrame.offsetLeft <= -1919){
					movingFrame.style.left = "79px";
				}
				move(-222);
			}
		};

		//自动
		var automatic = function(){
			time = setInterval(function(){
				turnright();
			},10000);
		}
		
		//按键设置
		goleft.onclick = function(){
			clearInterval(time);
			turnleft();
			automatic();
		}
		goright.onclick = function(){
			clearInterval(time);
			turnright();
			automatic();
		}

		automatic();
	}

	return {
		bannerMovement : bannerMovement,
		rightWindow    : rightWindow,
		contAct        : contAct,
		newsCenter     : newsCenter,
		history        : history
	}
}();
window.onload = function(){
	index.bannerMovement();
	index.rightWindow();
	index.contAct();
	index.newsCenter();
	index.history();
};






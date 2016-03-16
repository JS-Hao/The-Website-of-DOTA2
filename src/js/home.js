window.onload=function(){
	
	content();
	contAct();
	newCenter();
};
var index = (function(){
	//banner
	function bannerMovement(){
		var time = null;
		var z = 0;
		var leftX = 0;
		var bannerBox = document.querySelector(".banner-box");
		var btns = document.querySelectorAll(".banner-button");
		bannerBox.style.left = "0%";
		btns[0].style.backgroundPosition = "0 -29px";

		//按钮banner切换
		for(var i = 0, len = btns.length; i < len; i++){
			btns[i].onclick=function(){
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
				leftX = leftX-100;
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

	return {
		bannerMovement : bannerMovement,
		rightWindow : rightWindow
	}
})();
index.bannerMovement();
index.rightWindow();




//content

function content(){
	var btn=document.getElementById("l-btn-a");
	var url=getCSS(btn,"background");
	var btns=btn.getElementsByTagName("a");
	for(var i=0; i<btns.length; i++){
		btns[i].index=i;
		btns[i].onmouseover=function(){
			this.style.background=url;
			this.style.backgroundPosition=-this.index*226+"px"+" -90px";
		}
		btns[i].onmouseout=function(){
			this.style.backgroundPosition=-this.index*226+"px"+" 0";
		}
	}
}

function contAct(){
	var act=document.getElementById("l-act-cont");
	var divs=act.getElementsByTagName("div");
	var lis=act.getElementsByTagName("li");
	for(var i=0; i<lis.length; i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			divs[this.index].style.display="block";
		}
		lis[i].onmouseout=function(){
			for(var j=0; j<divs.length; j++){
				divs[this.index].style.display="none";
			}
		}
	}

}
//新闻中心

function newCenter(){
	var navs=document.getElementById("news-nav").getElementsByTagName("li");
	var news=document.getElementById("l-news");
	var conts=getClassName(news,"news-cont");
	navs[0].style.backgroundPosition="center bottom";
	conts[0].style.display="block";
	for(var i=0; i<navs.length; i++){
		navs[i].index=i;
		navs[i].onmouseover=function(){
			for(var j=0; j<navs.length; j++){
				navs[j].style.backgroundPosition="center top";
				conts[j].style.display="none";
			}
			this.style.backgroundPosition="center bottom";
			conts[this.index].style.display="block";
		}
	}
}

//历史专题
history();
function history(){
	//向左、向右移动函数
	function move(num){
		uleft=movingFrame.offsetLeft+num;
		startMove(movingFrame,{left:uleft},3,0,function(){
			start=1;
		});
	}
	function turnleft(){
		var uleft;
		if(start==1){
			start=0;
			if(movingFrame.offsetLeft>=-143){
				movingFrame.style.left="-2141px";
			}
			move(222);
		}	
	};
	function turnright(){
		var uleft;
		if(start==1){
			start=0;
			if(movingFrame.offsetLeft<=-1919){
				movingFrame.style.left="79px";
			}
			move(-222);
		}
	};
	//自动
	var time=null;
	var automatic=function(){
		time=setInterval(function(){
			turnright();
		},10000);
	}
	//获取节点
	var goleft=document.getElementById("r-history-l");
	var goright=document.getElementById("r-history-r");
	var movingFrame=document.getElementById("movingFrame");
	del_ff(movingFrame);
	//新建节点
	var newfirst=document.createElement("li");
	var newlast=document.createElement("li");
	newfirst.innerHTML=movingFrame.lastChild.innerHTML;
	newlast.innerHTML=movingFrame.firstChild.innerHTML;
	//插入节点
	movingFrame.appendChild(newlast);
	movingFrame.insertBefore(newfirst,movingFrame.firstChild);
	//按键设置
	var start=1;
	goleft.onclick=function(){
		clearInterval(time);
		turnleft();
		automatic();

	}
	goright.onclick=function(){
		clearInterval(time);
		turnright();
		automatic();
	}
	automatic();
}
function del_ff(elem){ 
	var elem_child = elem.childNodes; 
	for(var i=0; i<elem_child.length;i++){ 
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
				elem.removeChild(elem_child[i]);
		} 
	} 
}
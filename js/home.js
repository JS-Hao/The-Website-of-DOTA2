window.onload=function(){
	rightWindow();
	bannerMovement();
	content();
	contAct();
	newCenter();
};

//banner
function bannerMovement(){
	var time=null;
	var banner = document.getElementById("banner");
	var btn=document.getElementById("banner_button");
	var btns=getClassName(btn,"banner_button");
	banner.style.left = "0%";
	btns[0].style.backgroundPosition = "0 -29px";
	for(var i=0; i<btns.length; i++){
		btns[i].onclick=function(){
			for(var j=0; j<btns.length; j++){
				if(btns[j]==this){
					z=j;
					leftX=-j*100;
					btns[j].style.backgroundPosition = "0 -29px";
					startMove(banner,{left:-j*100},20,1);
					clearInterval(time);
					time = setInterval(gundong,9000);
				}else{
					btns[j].style.backgroundPosition = "0 0";
				}
			}
		}
	}

	//定时滚动banner
	var z=0;
	var leftX = 0;
	var time = setInterval(gundong,9000);
	function gundong(){
		if(leftX > -400){
			leftX = leftX-100;
			startMove(banner,{left:leftX},20,1);
		}else{
			leftX = 0;
			startMove(banner,{left:leftX},20,1);
		}
		if(z==4) z=0; else z++;
		for(var i=0; i<btns.length; i++){
			if (z==i) {
				btns[i].style.backgroundPosition = "0 -29px";
			}else{
				btns[i].style.backgroundPosition = "0 0";
			}
		}
	}
}

//右边弹窗
function rightWindow(){
	var rd=document.getElementById("r-wid");
	var rr=document.getElementById("r-wid-r");
	var rs=document.getElementById("r-wid-s");
	var rdd=document.getElementById("r-wid-d");
	var rb=document.getElementById("r-wid-btm");
	var time;
	var speed=0;
	function rWidmove(taget){
		clearInterval(time);
		time=setInterval(function(){
			var speed=(taget-offsetRight("r-wid",146))/100;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(offsetRight("r-wid",146)==taget){			
				clearInterval(time);
			}else{
				rd.style.right=offsetRight("r-wid",146)+speed+'px';
			}
		},5);
	};
	rr.onclick=function(){
		if(offsetRight("r-wid",146)==0){
			rs.innerHTML="展开";
			rdd.style.backgroundPosition="-87px -55px";
			rWidmove(-146);

		}else{
			rs.innerHTML="收起";
			rdd.style.backgroundPosition="-87px -11px";
			rWidmove(0);
		}
	}

	rr.onmouseover=function(){
		rr.style.backgroundColor="#c6523c";
	}
	rr.onmouseout=function(){
		rr.style.backgroundColor="#ac3c26";
	}
	var rk=getClassName(rd,"Rwid-kefu");
	var rp;
	for(var i=0;i<rk.length;i++){
		rk[i].onmouseover=function(){
			this.style.backgroundColor="#525e63";
			rp=getClassName(this,"Rwid-pto")[0];
			rp.style.backgroundPosition=getCSS(rp,"backgroundPosition").split(" ")[0]+" -52px";
		}
		rk[i].onmouseout=function(){
			this.style.backgroundColor="#2c3437";
			var rp=getClassName(this,"Rwid-pto")[0];
			rp.style.backgroundPosition=getCSS(rp,"backgroundPosition").split(" ")[0]+" -8px";
		}
	}
	rb.onmouseover=function(){
		this.style.backgroundPosition="-145px 0px";
	}
	rb.onmouseout=function(){
		this.style.backgroundPosition="0 0";
	}
}
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
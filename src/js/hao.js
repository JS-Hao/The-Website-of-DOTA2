//获取CSS样式
function getCSS(element,styleName){
	if(element.currentStyle){
		return element.currentStyle[styleName];
	}else{
		return getComputedStyle(element,false)[styleName];
	}
}

//完美运动框架
function startMove(element,json,n,percent,fun){
	clearInterval(element.time);
	element.time=setInterval(function(){
		var stop=true;
		for(atrr in json){
			if(atrr=="opacity"){
				var curr=parseFloat(getCSS(element,atrr))*100;
			}else if(percent){
				var curr=parseInt(element.style[atrr]);
			}else{
				var curr=parseInt(getCSS(element,atrr));
			}
			if(n){
				var speed=(json[atrr]-curr)/n;
			}else{
				var speed=(json[atrr]-curr)/6;
			}
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(curr!=json[atrr]){
				stop=false;
			}
			if(atrr=="opacity"){
				curr+=speed;
				element.style.filter="alpha(opacity:"+curr+")";
				element.style.opacity=curr/100;
			}else if(percent){
				element.style[atrr]=curr+speed+"%";
			}else{
				element.style[atrr]=curr+speed+"px";
			}
		}
		if(stop==true){
			clearInterval(element.time);
			if(fun) fun();
		}
	},11);
}

//获取特定CLASS属性的元素
function getClassName(element,Name){
	var elemArray = element.getElementsByTagName("*");
	var nameArray = new Array();
	for(var i = 0; i < elemArray.length; i++){
		if(elemArray[i].className == Name){
			nameArray.push(elemArray[i]);
		}
	}
	return nameArray;
}

//获取元素right
function offsetRight(element,elementWidth){
	var elem=document.querySelector("." + element);
	var oright=(document.documentElement.clientWidth-elem.offsetLeft)-elementWidth;
	return oright;
}
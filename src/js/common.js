//获取CSS样式
function getCSS(element,styleName){
	if(element.currentStyle){
		if(styleName == "backgroundPosition"){
			return (element.currentStyle.backgroundPositionX + " " + element.currentStyle.backgroundPositionY); 
      }	else {
      		return element.currentStyle[styleName];
      	}	
	} else {
		return getComputedStyle(element,false)[styleName];
	}
}

/*运动框架
  n      :速度
  percent:位置的单位为%
  fun    :函数
*/
function startMove(element,json,n,percent,fun){
	clearInterval(element.time);
	element.time = setInterval(function(){
		var stop = true;
		for(atrr in json){
			if(atrr == "opacity"){
				var curr = parseFloat(getCSS(element,atrr))*100;
			}else if(percent){
				var curr = parseInt(element.style[atrr]);
			}else{
				var curr = parseInt(getCSS(element,atrr));
			}
			if(n){
				var speed=(json[atrr]-curr) / n;
			}else{
				var speed=(json[atrr]-curr) / 6;
			}
			speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
			if(curr != json[atrr]){
				stop = false;
			}
			if(atrr == "opacity"){
				curr += speed;
				element.style.filter = "alpha(opacity:" + curr + ")";
				element.style.opacity = curr / 100;
			}else if(percent){
				element.style[atrr] = curr + speed + "%";
			}else{
				element.style[atrr] = curr + speed + "px";
			}
		}
		if(stop == true){
			clearInterval(element.time);
			if(fun) fun();
		}
	},11);
}


//获取元素right
function offsetRight(element,elementWidth){
	var elem=document.querySelector("." + element);
	var oright=(document.documentElement.clientWidth-elem.offsetLeft)-elementWidth;
	return oright;
}
//删除文本节点
function del_ff(elem){ 
	var elem_child = elem.childNodes; 
	for(var i=0; i<elem_child.length;i++){ 
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
				elem.removeChild(elem_child[i]);
		} 
	} 
}
function transformCSS (elem, name, value) {
	if(!elem.transform){
		elem.transform = {};
	}
	
	if(arguments.length >= 3){
		// 写
		elem.transform[name] = value;
		var result = '';
		for(var attrName in elem.transform){
			switch (attrName){
				case 'translate':
				case 'translateX':
				case 'translateY':
				case 'translateZ':
					result += attrName + '(' + elem.transform[attrName] + 'px) ';
					break;
				case 'scale':
				case 'scaleX':
				case 'scaleY':
					result += attrName + '(' + elem.transform[attrName] + ') ';
					break;
				case 'rotate':
				case 'skew':
				case 'skewX':
				case 'skewY':
					result += attrName + '(' + elem.transform[attrName] + 'deg) ';
					break;
			}
		}
		elem.style.transform = result;
		
	}else{
		// 读
		if(typeof elem.transform[name] == 'undefined'){
			if(name.indexOf('scale') >= 0){
				value = 1;
			}else{
				value = 0;
			}
		}else{
			value = elem.transform[name];
		}
		return value;
	}
	
}
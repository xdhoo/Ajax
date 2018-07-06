var Ajax = function(options){

	var options = options || {};
	options.type = (options.type || 'GET').toUpperCase();
	options.dataType = options.dataType || 'json';
	var params = formateParams(options.data || null, options.contentType);

	var xhr;
	//create
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//connet & send
	if(options.type === 'GET') {
		xhr.open('GET',options.url + '?' + params, true);
		xhr.send();
	} else if (options.type === 'POST') {
		xhr.open('POST',options.url,true);
		xhr.setRequestHeader("Content-Type",options.contentType || 'application/x-www-form-urlencoded')
		xhr.send(params);
	}

	//StateChange
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status >= 200 && xhr.status < 300){
				options.success && options.success(xhr.responseText);
			} else {
				options.error && options.error(xhr.status);
			}
		}
	}

	//params format
	function formateParams(data, type){
		if(type == 'application/json'){
			return JSON.stringify(data);
		}
		if(data != null){
			var arr = [];			
			for(item in data){
				arr.push(encodeURIComponent(item)+'='+encodeURIComponent(data[item]))
			}
			return arr.join('&');
		}
	}
}

Ajax({
	url:'https://www.easy-mock.com/mock/5b0f678cb0c1263f2ec22406/submit',
	type:'post',
	contentType:'application/json',
	data:{
		name:'ada',
		age:45
	},
	success:function(res){
		console.log(res)
	}
})
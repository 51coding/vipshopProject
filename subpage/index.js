	window.onload = function(){
		(function(){
			var oAjaxUl = document.querySelector('#ajaxUl');
			var iH = window.screen.height;
			document.title = iH;
			var num = 0;
			var onOff = true;
			var arrData = '';
			getData(num);
			
			window.onscroll = function(){
				
				if( getScrollTop()+iH > document.body.scrollHeight-460 ){
					//console.log( (getScrollTop()+iH),(document.body.scrollHeight-460) );
					if( num >= arrData.length-4 ){
						return;
					}

					if( onOff ){
						num = 4;
						onOff = false;
					};

					getData(num);
					num+=4;
				}
				//getData();
			}
			
			function getScrollTop(){
				return document.documentElement.scrollTop || document.body.scrollTop;
			}
			function getData(num){
				ajax('get','data.php','',function(data){
					//console.log(typeof data);
					data = JSON.parse( data );
					//console.log(data);
					arrData = data;
					for( var i=num;i<num+4;i++ ){
						(function(obj){
							var oBigImg = new Image();
							var oSmallImg = new Image();
							
							oBigImg.src = obj.bigSrc;
							oSmallImg.src = obj.smallSrc;

							oBigImg.onload = function(){
								this.b = true;
								if( this.b && oSmallImg.b ){
									addData(obj);
								}
							};
							oSmallImg.onload = function(){
								this.b = true;
								if( this.b && oBigImg.b ){
									addData(obj);
								}
							};
						})(data[i])
					}
				});
			}
			
			
			function addData(obj){
				var bigSrc = obj.bigSrc;
				var smallSrc = obj.smallSrc;
				var price = obj.price;
				var des = obj.des;
				var title = obj.title;

				var oLi = document.createElement('li');
				oLi.style.opacity = '0';
				var oA = document.createElement('a');
				oA.href = 'http://www.tanzhouedu.com';
				oA.innerHTML = '<div class="brand-pic"><img src="'+bigSrc+'" width="100%" height="100%" alt=""></div><div class="brand-logo"><img src="'+smallSrc+'" width="100%" height="100%"  alt=""></div><div class="brand-msg"><p class="price fl" ><span>'+price+'</span>折起</p><p class="title fr">'+title+'</p></div><div class="des">'+des+'</div><div class="to-pay"><span>立即购买</span></div>';
				oLi.appendChild(oA);
				oAjaxUl.appendChild(oLi);
				move( oLi,{opacity:100},5000 );
			}
		})();
		
		(function(){
			var oReturn = document.querySelector('.return');
			oReturn.onclick = goBack;

			/** 
			 * 返回前一页（或关闭本页面） 
			 * <li>如果没有前一页历史，则直接关闭当前页面</li> 
			 */  
			function goBack(){  
				if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){ // IE  
					if(history.length > 0){  
						window.history.go( -1 );  
					}else{  
						window.opener=null;window.close();  
					}  
				}else{ //非IE浏览器  
					if (navigator.userAgent.indexOf('Firefox') >= 0 ||  
						navigator.userAgent.indexOf('Opera') >= 0 ||  
						navigator.userAgent.indexOf('Safari') >= 0 ||  
						navigator.userAgent.indexOf('Chrome') >= 0 ||  
						navigator.userAgent.indexOf('WebKit') >= 0){  
			  
						if(window.history.length > 1){  
							window.history.go( -1 );  
						}else{  
							window.opener=null;window.close();  
						}  
					}else{ //未知的浏览器  
						window.history.go( -1 );  
					}  
				}  
			} 
		})();
	}
	
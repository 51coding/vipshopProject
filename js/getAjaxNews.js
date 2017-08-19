/**
 * Created by aflyi on 2017/5/11.
 */

window.onload = function () {
    

    // 选项卡效果
    var oNav = document.querySelector('.WX_content .WX_navbar').querySelectorAll('div');
    var oPage = document.querySelector('.WX_content').querySelectorAll('.page');
    var length = oPage.length;
    var oPageWrap = document.querySelector('.WX_content .page_wrap');
    var start = {
        x:0,
        y:0
    };
    var end = {
        x: 0,
        y: 0
    };
    var index = 0;

    oPageWrap.addEventListener('touchstart',touch,false);
    oPageWrap.addEventListener('touchmove',touch,false);
    oPageWrap.addEventListener('touchend',touch,false);

    for( var i=0;i<length;i++ ){
        (function (i) {
            oNav[i].onclick =function () {
                AddClass(i);
            }
        })(i)
    }

    function touch(event) {
        //console.log( event.type )
        switch ( event.type ){
            case 'touchstart':
                start.x = event.changedTouches[0].pageX;
                start.y = event.changedTouches[0].pageY;
                break;
            case 'touchmove':
                end.x = event.changedTouches[0].pageX;
                end.y = event.changedTouches[0].pageY;
                break;
            case 'touchend':
                if( (start.x - end.x) > ( Math.abs(end.y - start.y)*2 ) ){
                    index ++;
                    index = index > length-1 ? length-1 : index;
                    AddClass(index);
                }
                if( (end.x - start.x) > (Math.abs(end.y - start.y)*2) ){
                    index--;
                    index = index < 0 ? 0 : index;
                    AddClass(index);
                }
                break;
        }
    }
    
    function AddClass(k) {
        for( var i=0;i<oNav.length;i++ ){
            //oNav[i].className = 'navbar-item';
            oNav[i].setAttribute('class','navbar-item');
            oPage[i].setAttribute('class','page');
        }
        oNav[k].setAttribute('class','navbar-item navbar-item_on');
        oPage[k].setAttribute('class','page page_on');
    }

};





















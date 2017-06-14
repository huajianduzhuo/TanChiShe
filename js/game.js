/**
 * Created by yujin on 2017/6/13.
 */
/*
    TODO 蛇移动总方法
 */
var t;
var lastSnack = new SNACK();
var delay = 700;

function move() {
    $.each(snackArr, function (index, elem) {
        if(index == 0){
            lastSnack.direction = elem.direction;
            lastSnack.leftCoor = elem.leftCoor;
            lastSnack.topCoor = elem.topCoor;
        }
        elem.move();
        if(snackArr[index+1]){
            elem.direction = snackArr[index+1].direction;
        }else {
            if(checkSnackDie(elem)){
                alert('game over!!!');
                status = 'die';
                clearTimeout(t);
                return false;
            }else {
                if(checkIsEat(elem)){
                    snackAdd();
                    showFood();
                }
            }
            if(delay >= 300){
                delay = delay - 100 * parseInt(snackArr.length / 10);
            }
            t = setTimeout(move,delay);
        }
    });
}

$(document).keydown(function (event) {
    if(status == 'die'){
        return false;
    }
    switch (event.keyCode){
        case 37://left
            if(snackArr[snackArr.length-1].direction == 'right' || snackArr[snackArr.length-2].direction == 'right'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'left';
            break;
        case 38://top
            if(snackArr[snackArr.length-1].direction == 'bottom' || snackArr[snackArr.length-2].direction == 'bottom'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'top';
            break;
        case 39://right
            if(snackArr[snackArr.length-1].direction == 'left' || snackArr[snackArr.length-2].direction == 'left'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'right';
            break;
        case 40://bottom
            if(snackArr[snackArr.length-1].direction == 'top' || snackArr[snackArr.length-2].direction == 'top'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'bottom';
            break;
    }
    if([37,38,39,40].indexOf(event.keyCode) >= 0 && status == 'init'){
        status = 'start';
        move();
    }
});

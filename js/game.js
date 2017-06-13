/**
 * Created by yujin on 2017/6/13.
 */
/*
    TODO 蛇移动总方法
 */
var t;
function move() {
    var lastSnack = new SNACK();
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
                clearTimeout(t);
                return false;
            }else {
                if(checkIsEat(elem)){
                    var newSnack = $('<div name="snack" class="snack"></div>');
                    var newSNACK = new SNACK(newSnack,lastSnack.leftCoor,lastSnack.topCoor,lastSnack.direction);
                    snackArr.unshift(newSNACK);
                    newSnack.css({
                        left: lastSnack.leftCoor,
                        top: lastSnack.topCoor
                    });
                    $('#main').append(newSnack);
                    showFood();
                }
                t = setTimeout(move, 500);
            }
        }
    });
}

$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37://left
            if(snackArr[snackArr.length-1].direction == 'right'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'left';
            break;
        case 38://top
            if(snackArr[snackArr.length-1].direction == 'bottom'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'top';
            break;
        case 39://right
            if(snackArr[snackArr.length-1].direction == 'left'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'right';
            break;
        case 40://bottom
            if(snackArr[snackArr.length-1].direction == 'top'){
                return false;
            }
            snackArr[snackArr.length-1].direction = 'bottom';
            break;
    }
});

/**
 * Created by yujin on 2017/6/13.
 */
/*
    TODO 蛇 数组
    TODO    蛇尾在前，蛇头在后
 */
var snackArr = [];
var food;
/*
    TODO 初始化游戏
 */
$(function () {
    food = showFood();
    showSnack();
    while (checkCoorRepeat(food, snackArr) || (!checkSnackLive())){
        snackArr = new Array(0);
        showSnack();
    }
    $('#start').click(function () {
        move();
    });
});

function showFood() {
    var food = $('#food');
    var foodCoor = getCoordinate();
    food.css({
        left: foodCoor.left,
        top: foodCoor.top
    });
    return food;
}

function showSnack() {
    var snack_head = $('#snack_head');
    var snack_head_coor = getCoordinate();
    snack_head.css({
        left: snack_head_coor.left,
        top: snack_head_coor.top
    });
    var direct = getDirect();
    var snack_body = $('#snack_body');
    switch (direct){
        case 'left':
            snack_body.css({
                left: snack_head_coor.left + 10,
                top: snack_head_coor.top
            });
            break;
        case 'right':
            snack_body.css({
                left: snack_head_coor.left - 10,
                top: snack_head_coor.top
            });
            break;
        case 'top':
            snack_body.css({
                left: snack_head_coor.left,
                top: snack_head_coor.top + 10
            });
            break;
        case 'bottom':
            snack_body.css({
                left: snack_head_coor.left,
                top: snack_head_coor.top - 10
            });
            break;
    }
    var snackHead = new SNACK(snack_head, snack_head_coor.left, snack_head_coor.top, direct);
    var snackBody = new SNACK(snack_body, parseInt(snack_body.css('left')), parseInt(snack_body.css('top')), direct);
    snackArr.push(snackBody);
    snackArr.push(snackHead);
}
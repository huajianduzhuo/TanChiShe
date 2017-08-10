/**
 * Created by yujin on 2017/6/13.
 */
/*
    TODO 蛇 数组
    TODO    蛇尾在前，蛇头在后
 */
var snackArr = [];
var food;
var status = 'init';
/*
    TODO 初始化游戏
 */
$(function() {
    initGame();
});


function initGame() {
    $('#main').html('<div id="food" class="food"></div><div id="snack_head" name="snack" class="snack snack_head"></div><div id="snack_body" name="snack" class="snack"></div>');
    food = showFood();
    snackArr = [];
    showSnack();
    while (checkCoorRepeat(food, snackArr) || (!checkSnackLive())) {
        snackArr = new Array(0);
        showSnack();
    }
}

function showFood() {
    var food = $('#food');
    var foodCoor = getCoordinate();
    transformCSS(food[0], 'translateX', foodCoor.left);
    transformCSS(food[0], 'translateY', foodCoor.top);
    return food;
}

function showSnack() {
    var snack_head = $('#snack_head');
    var snack_head_coor = getCoordinate();
    transformCSS(snack_head[0], 'translateX', snack_head_coor.left);
    transformCSS(snack_head[0], 'translateY', snack_head_coor.top);
    var direct = getDirect();
    var snack_body = $('#snack_body');
    switch (direct) {
        case 'left':
            transformCSS(snack_body[0], 'translateX', (snack_head_coor.left + 10));
            transformCSS(snack_body[0], 'translateY', snack_head_coor.top);
            break;
        case 'right':
            transformCSS(snack_body[0], 'translateX', (snack_head_coor.left - 10));
            transformCSS(snack_body[0], 'translateY', snack_head_coor.top);
            break;
        case 'top':
            transformCSS(snack_body[0], 'translateX', snack_head_coor.left);
            transformCSS(snack_body[0], 'translateY', (snack_head_coor.top + 10));
            break;
        case 'bottom':
            transformCSS(snack_body[0], 'translateX', snack_head_coor.left);
            transformCSS(snack_body[0], 'translateY', (snack_head_coor.top - 10));
            break;
    }
    setTimeout(function() {
        var snackHead = new SNACK(snack_head, snack_head_coor.left, snack_head_coor.top, direct);
        var snackBody = new SNACK(snack_body, transformCSS(snack_body[0], 'translateX'), transformCSS(snack_body[0], 'translateY'), direct);
        snackArr.push(snackBody);
        snackArr.push(snackHead);
    }, 0);

}
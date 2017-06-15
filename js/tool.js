/**
 * Created by yujin on 2017/6/13.
 */


/*
 TODO snack 对象
 */
function SNACK(snack, left, top, direct) {
    this.snack = snack;
    this.leftCoor = left;
    this.topCoor = top;
    this.direction = direct;
    this.move = function () {
        switch (this.direction){
            case 'left':
                this.snack.css('left',this.leftCoor-10 + 'px');
                this.leftCoor -= 10;
                break;
            case 'right':
                this.snack.css('left',this.leftCoor+10 + 'px');
                this.leftCoor += 10;
                break;
            case 'top':
                this.snack.css('top',this.topCoor-10 + 'px');
                this.topCoor -= 10;
                break;
            case 'bottom':
                this.snack.css('top',this.topCoor+10 + 'px');
                this.topCoor += 10;
                break;
        }
    }
}

/*
    TODO 初始化时得到蛇的方向
 */
function getDirect() {
    var directions = ['left','right','top','bottom'];
    var num = parseInt(Math.random() * 4);
    return directions[num];
}

/*
    TODO 得到随机坐标
 */
function getCoordinate() {
    var main = $('#main')[0];
    var row = main.clientWidth / 10;
    var col = main.clientHeight / 10;
    var left = parseInt(Math.random() * row) * 10;
    var top = parseInt(Math.random() * col) * 10;
    return {
        left: left,
        top: top
    }
}

/*
    TODO 验证初始化的蛇和食物位置是否重复
 */
function checkCoorRepeat(food, snackarr) {
    var flag = false;
    $.each(snackarr,function (index, elem) {
        if(elem.leftCoor == parseInt(food.css('left')) && elem.topCoor == parseInt(food.css('top'))){
            flag = true;
        }
    })
    return flag;
}

/*
    TODO 验证初始化时蛇位置是否正确
 */
function checkSnackLive() {
    var flag = true;
    $.each(snackArr,function (index, elem) {
        if(elem.leftCoor<0 || elem.topCoor<0){
            flag = false;
        }
        if(index+1 == snackArr.length){
            if((elem.direction == 'left' && elem.leftCoor == 0) ||
                (elem.direction == 'right' && elem.leftCoor == $('#main')[0].clientWidth-10) ||
                (elem.direction == 'top' && elem.topCoor == 0) ||
                (elem.direction == 'bottom' && elem.topCoor == $('#main')[0].clientHeight-10)){
                flag = false;
            }
        }
    })
    return flag;
}

/*
    TODO 游戏结束判断
 */
function checkSnackDie(snackHead) {
    if(snackHead.leftCoor < 0 ||
        snackHead.leftCoor > $('#main')[0].clientWidth-10 ||
        snackHead.topCoor < 0 ||
        snackHead.topCoor > $('#main')[0].clientHeight-10){
        return true;
    }
    for(var i=0; i<snackArr.length-2; i++){
        if(snackArr[i].leftCoor == snackHead.leftCoor && snackArr[i].topCoor == snackHead.topCoor){
            return true;
        }
    }
    return false;
}

/*
    TODO 检查是否吃到
 */
function checkIsEat(snackHead) {
    if(snackHead.leftCoor == parseInt(food.css('left')) && snackHead.topCoor == parseInt(food.css('top'))){
        return true;
    }
    return false;
}

/*
    TODO 新增蛇身
 */
function snackAdd() {
    var newSnack = $('<div name="snack" class="snack"></div>');
    var newSNACK = new SNACK(newSnack,lastSnack.leftCoor,lastSnack.topCoor,lastSnack.direction);
    snackArr.unshift(newSNACK);
    newSnack.css({
        left: lastSnack.leftCoor,
        top: lastSnack.topCoor
    });
    $('#main').append(newSnack);
}

/*
    TODO 更新分数
 */
function scoreUpdate() {
    if(score < 100){
        score += 10;
    }else if(score < 250){
        score += 15;
    }else if(score < 450){
        score += 20;
    }else if(score < 750){
        score += 30;
    }else if(score < 1150){
        score += 40;
    }else if(score < 1650){
        score += 50;
    }else if(score < 2650){
        score += 100;
    }else {
        score += 200;
    }
    $('#score').html(score);
}

/*
    TODO 重新计算分数
 */
function initScore() {
    score = 0;
    $('#score').html(score);
}

/*
    TODO 初始化延迟时间
 */
function initDelay() {
    delay = 500;
}

/*
    TODO 修改延迟时间
 */
function updateDelay() {
    if(score < 50){
        delay = 500;
    }else if(score < 100){
        delay = 450;
    }else if(score < 175){
        delay = 400;
    }else if(score < 250){
        delay = 350;
    }else if(score < 450){
        delay = 300;
    }else if(score < 750){
        delay = 250;
    }else if(score < 950){
        delay = 200;
    }else if(score < 1150){
        delay = 200;
    }else if(score < 1650){
        delay = 150;
    }else {
        delay = 100;
    }
}

/*
    TODO 游戏暂停
 */
function pauseGame() {
    status = 'pause';
    clearTimeout(t);
    $("#main").append("<div id='pause' class='pause'><p>游戏暂停</p><a href='javascript:continueGame();' id='continuegamebutton'>Continue</a></div>");
    var pause = $("#pause");
    pause.css("width", "300px");
    pause.css("height", "300px");
    pause.css("background-color", "rgba(0, 0, 0, 0.5)");
}

/*
    TODO 游戏继续
 */
function continueGame() {
    $('#pause').remove();
    status = 'start';
    move();
}
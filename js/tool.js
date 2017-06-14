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
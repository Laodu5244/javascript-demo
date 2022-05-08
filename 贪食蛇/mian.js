// 获取元素
let ul = $id('ul'),
  btn = $id('btn'),
  timer = null,
  food = null,
  index = 0,
  snake = $id('snake'),
  result = $id('result'),
  perData = { speed: 300, code: 39 },
  snakeDiv = $tagName(snake, "div"),
  lis = $tagName(ul, 'li'),
  datas = { size: 40, x: 18, y: 10 };

// 初始化游戏
function init() {
  create_map()
}
// 创建地图
function create_map() {
  ul.style.width = (datas.size + 1) * datas.x + "px";

  for (let i = 0; i < datas.x * datas.y; i++) {
    let list = document.createElement('li');
    list.style.width = list.style.height = datas.size + 'px';
    list.index = i;
    ul.appendChild(list);
  }
  start()
}
// 开始游戏
function start() {
  btn.onclick = function () {
    create_snake();
    move_snake();
    bind_snake();
    create_food();
    btn.style.display = "none";
  }
}
// 创建食物
function create_food() {
  let hrr = [];
  // 排他
  for (let i = 0; i < lis.length; i++) {
    if (isFilter(lis[i])) {
      hrr.push(lis[i]);
    }
  }
  function isFilter(li) {
    for (let i = 0; i < snakeDiv.length; i++) {
      if (li.index == snakeDiv[i].index) {
        return false;
      }
    }
    return true;
  }

  // 生成食物
  let random = Math.floor(Math.random() * (hrr.length - 1));
  food = document.createElement('div');
  food.id = "food";
  food.innerText = "肉";
  food.style.width = food.style.height = datas.size + 'px';
  food.style.left = hrr[random].offsetLeft + 'px';
  food.style.top = hrr[random].offsetTop + 'px';
  ul.appendChild(food);
}
// 创建蛇
function create_snake() {
  let newsnake = document.createElement('div')
  newsnake.style.width = newsnake.style.height = datas.size + 'px';
  newsnake.innerText = "蛇";
  newsnake.index = 0;
  snake.appendChild(newsnake);
}
// 移动蛇
function move_snake() {
  timer = setInterval(function () {
    if (isOut() || isSelf()) {
      alert('游戏结束');
      clearInterval(timer);
    }
    // 判断吃食物代码
    if (col(snakeDiv[0], food)) {
      food.removeAttribute('id');
      food.innerText = "";
      food.style.backgroundColor = "green";
      snake.appendChild(food);
      create_food();
      num();
    }
    // 创建蛇身
    for (let i = snakeDiv.length - 1; i > 0; i--) {
      snakeDiv[i].style.left = snakeDiv[i - 1].offsetLeft + 'px';
      snakeDiv[i].style.top = snakeDiv[i - 1].offsetTop + 'px';
      snakeDiv[i].index = snakeDiv[i - 1].index;
    }
    switch (perData.code) {
      // 左
      case 37:
        snakeDiv[0].style.left = snakeDiv[0].offsetLeft - (datas.size + 1) + 'px';
        snakeDiv[0].index += 1;
        break;
      // 上
      case 38:
        snakeDiv[0].style.top = snakeDiv[0].offsetTop - (datas.size + 1) + 'px';
        snakeDiv[0].index -= datas.x;
        break;
      // 右
      case 39:
        snakeDiv[0].style.left = snakeDiv[0].offsetLeft + (datas.size + 1) + 'px';
        snakeDiv[0].index += 1;
        break;
      // 下
      case 40:
        snakeDiv[0].style.top = snakeDiv[0].offsetTop + (datas.size + 1) + 'px';
        snakeDiv[0].index += datas.x;
        break;
    }
  }, perData.speed)
}
// 上下左右键控制蛇
function bind_snake() {
  document.onkeydown = function (e) {
    var e = window.event || e;
    switch (e.keyCode) {
      case 37:
        perData.code = 37;
        break;
      case 38:
        perData.code = 38;
        break;
      case 39:
        perData.code = 39;
        break;
      case 40:
        perData.code = 40;
        break;
    }
  }
}
// 吃肉
function col(el1, el2) {
  // el1: 蛇
  // el2: 肉
  let r1 = el1.offsetLeft + el1.offsetWidth,
    l1 = el1.offsetLeft,
    b1 = el1.offsetTop + el1.offsetHeight,
    t1 = el1.offsetTop;
  let r2 = el2.offsetLeft + el2.offsetWidth,
    l2 = el2.offsetLeft,
    b2 = el2.offsetTop + el2.offsetHeight,
    t2 = el2.offsetTop;

  // 检测碰撞
  if (r1 <= l2 || l1 >= r2 || b1 <= t2 || t1 >= b2) {
    return false;
  } else {
    return true;
  }
}
// 检测有没有出墙
function isOut() {
  for (let i = 0; i < lis.length; i++) {
    if (col(lis[i], snakeDiv[0])) {
      return false;
    }
  }
  return true;
}
//  检测有没有撞到自己
function isSelf() {
  for (let i = 1; i < snakeDiv.length; i++) {
    if (col(snakeDiv[0], snakeDiv[i])) {
      return true;
    }
  }
  return false;
}
// 改变积分
function num() {
  index += 10;
  result.innerHTML = index;
}
// 封装获取元素
function $id(id) {
  return document.getElementById(id);
}
function $tagName(parend, child) {
  return parend.getElementsByTagName(child);
}
init();
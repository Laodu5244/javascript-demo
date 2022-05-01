let active = false;
let scroller_middle = document.querySelector(".scroller-middle");
let scroller_top = document.querySelector(".scroller-top");

// 绑定中间层的鼠标按下事件
scroller_middle.addEventListener("mousedown", function () {
  active = 'middle';
  scroller_middle.classList.add("scrolling");
})

// 为body绑定鼠标松开事件
document.body.addEventListener('mouseup', function () {
  active = false;
  scroller_middle.classList.remove("scrolling");
})
// 为body绑定鼠标移出事件
document.body.addEventListener('mouseleave', function () {
  active = false;
  scroller_middle.classList.remove("scrolling");
})

// 绑定最顶层的鼠标按下事件
scroller_top.addEventListener("mousedown", function () {
  active = "top";
  scroller_top.classList.add("scrolling");
})

// 为body绑定鼠标松开事件
document.body.addEventListener('mouseup', function () {
  active = false;
  scroller_top.classList.remove("scrolling");
})
// 为body绑定鼠标移出事件
document.body.addEventListener('mouseleave', function () {
  active = false;
  scroller_top.classList.remove("scrolling");
})

// 为body绑定鼠标移动事件
document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= document.querySelector(".container").getBoundingClientRect().left;
  scrollIt(x);
});

//  滑动到指定位置
function scrollIt(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector(".container").offsetWidth)));
  // 滑动的是中间层
  if (active === "middle") {
    document.querySelector(".middle").style.width = transform + "px";
    scroller_middle.style.left = transform - 25 + "px";
    if (scroller_top.getBoundingClientRect().left > scroller_middle.getBoundingClientRect().left - 5) {
      document.querySelector(".top").style.width = transform - 5 + "px";
      scroller_top.style.left = transform - 30 + "px";
    }
  }
  // 滑动的是最顶层
  if (active === "top") {
    document.querySelector(".top").style.width = transform + "px";
    scroller_top.style.left = transform - 25 + "px";
    if (scroller_top.getBoundingClientRect().left > scroller_middle.getBoundingClientRect().left - 5) {
      document.querySelector(".middle").style.width = transform + 5 + "px";
      scroller_middle.style.left = transform - 20 + "px";
    }
  }
}
// 初始化
active = "middle";
scrollIt(450);
active = "top";
scrollIt(0);
active = false;

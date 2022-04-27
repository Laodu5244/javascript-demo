// 获取音乐和唱片
let i2 = document.querySelector(".i2")
let music = document.querySelector("audio")


// 控制播放暂停函数
i2.style.animationPlayState = "paused"
i2.onclick = function () {
    if (music.paused) {
        music.play()
        this.style.animationPlayState = "running"
    } else {
        music.pause()
        this.style.animationPlayState = "paused"
    }
}
// 音乐停止唱片动画暂停函数
music.addEventListener("ended", function (event) {
    i2.style.animationPlayState = "paused"
}, false);

// 获取三张背景图片
let page1 = document.querySelector("#page1")
let page2 = document.querySelector("#page2")
let page3 = document.querySelector("#page3")

page1.addEventListener("touchstart", function () {
    page1.style.display = "none"
    page2.style.display = "block"
    page3.style.display = "block"
    page3.style.top = "100%"

    setTimeout(function () {
        page2.setAttribute("class", "page fadeout")
        page3.setAttribute("class", "page fadein")
    }, 3500)
}, false)
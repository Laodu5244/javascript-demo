var isFlipped = false,
    isTransEnd = true;
function throttle(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}
function g(selector) {
    var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}
function random(range) {
    var max = Math.max(range[0], range[1]),
        min = Math.min(range[0], range[1]),
        diff = max - min,
        number = Math.floor(Math.random() * diff + min);
    return number;
}
var data = data;
function addPhotos() {
    var template = '<div class="photo rotate-front" onclick="turn(this)" id="photo{{index}}">\
                        <div class="photo-inner">\
                            <div class="side side-front">\
                                <p class="image"><img src="img/{{img}}" /></p>\
                                <p class="caption">{{caption}}</p>\
                            </div>\
                            <div class="side side-back">\
                                <p class="desc">{{desc}}</p>\
                            </div>\
                        </div>\
                    </div>';
    var html = [],
        photo = [],
        nav = [];
    for (var s = 0; s < data.length; s++) {
        var _photo = template.replace('{{index}}', s)
            .replace('{{img}}', data[s].img)
            .replace('{{caption}}', data[s].caption)
            .replace('{{desc}}', data[s].desc);
        photo.push(_photo);
        nav.push('<span id="nav' + s + '" onclick = "turn( g(\'#photo' + s + '\') )" class="i"></span>');
    }
    html.push('<div class="playground">' + photo.join('') + '</div>')
    html.push('<div class="nav">' + nav.join('') + '</div>');
    g('#wrap').innerHTML = html.join('');
    setTimeout(function () {
        resort(random([0, data.length]));
    }, 1000)
}
addPhotos();
// 1.翻面控制
function turn(elem) {
    var n = elem.id.replace(/[^0-9]/ig, '');
    if (!classie.has(elem, 'photo-center')) {
        resort(n);
        return;
    }
    if (classie.has(elem, 'rotate-front')) {
        classie.remove(elem, 'rotate-front');
        classie.add(elem, 'rotate-back');
        classie.add(g('#nav' + n), 'curr-back');
        isFlipped = true;
    } else {
        classie.remove(elem, 'rotate-back');
        classie.add(elem, 'rotate-front');
        classie.remove(g('#nav' + n), 'curr-back');
        isFlipped = false;
    }
}
function rangeSet() {
    var range = {
        left: {
            x: [],
            y: []
        },
        right: {
            x: [],
            y: []
        },
        top: {
            x: [],
            y: []
        },
        bottom: {
            x: [],
            y: []
        }
    },
        wrap = {
            w: g('.playground')[0].clientWidth,
            h: g('.playground')[0].clientHeight
        },
        photo = {
            w: g('.photo')[0].clientWidth,
            h: g('.photo')[0].clientHeight
        };
    var factor = 0.5,
        dis = photo.w * factor,
        dis2 = photo.h * factor;
    //海报位置范围
    range.left.x = [-photo.w - dis, -wrap.w / 2 - dis];
    range.left.y = [-wrap.h / 2, wrap.h / 2];
    range.right.x = [photo.w + dis, wrap.w / 2 + dis];
    range.right.y = [-wrap.h / 2, wrap.h / 2];
    range.top.x = [-photo.w - dis, photo.w + dis];
    range.top.y = [-photo.h - dis2, -wrap.h / 2 - dis2];
    range.bottom.x = [-photo.w - dis, photo.w + dis];
    range.bottom.y = [photo.h + dis2, wrap.h / 2 + dis2];
    return range;
}
function resort(n) {
    var photoArr = g('.photo'),
        photos = [],
        navArr = g('.i');
    var transEndFn = function () {
        isFlipped = false;
        if (g('.photo-center')[0]) {
            g('.photo-center')[0].removeEventListener('transitionend', transEndFn);
        }
        for (var s = 0; s < photoArr.length; s++) {
            classie.remove(photoArr[s], 'photo-center');
            photoArr[s].style['transform'] = 'translate(0,0) rotate(0deg) scale(1)';
            photos.push(photoArr[s]);
        }
        var photoCenter = g('#photo' + n);
        classie.add(photoCenter, 'photo-center');
        photos.splice(n, 1)[0];
        // 分离上下部分图片
        var photosTop = photos.splice(random([0, photos.length]), Math.ceil(photos.length / 8)),
            photosBottom = photos.splice(random([0, photos.length]), Math.ceil(photos.length / 8));
        // 把海报分为左右两部分
        var photosLeft = photos.splice(0, Math.ceil(photos.length / 2)),
            photosRight = photos;
        var ranges = rangeSet();
        // 左右
        for (s in photosLeft) {
            var photo = photosLeft[s];
            photo.style['transform'] = 'translate(' + random(rangeSet().left.x) + 'px,' +
                random(rangeSet().left.y) + 'px) rotate(' + random([-30, 30]) + 'deg)';
        }
        for (s in photosRight) {
            var photo = photosRight[s];
            photo.style['transform'] = 'translate(' + random(rangeSet().right.x) + 'px,' +
                random(rangeSet().right.y) + 'px) rotate(' + random([-30, 30]) + 'deg)';
        }
        // 上下
        for (s in photosTop) {
            var photo = photosTop[s];
            photo.style['transform'] = 'translate(' + random(rangeSet().top.x) + 'px,' +
                random(rangeSet().top.y) + 'px) rotate(' + random([-30, 30]) + 'deg)';
        }
        for (s in photosBottom) {
            var photo = photosBottom[s];
            photo.style['transform'] = 'translate(' + random(rangeSet().bottom.x) + 'px,' +
                random(rangeSet().bottom.y) + 'px) rotate(' + random([-30, 30]) + 'deg)';
        }
        // 重置控制按钮
        for (var s = 0; s < navArr.length; s++) {
            navArr[s].className = navArr[s].className.replace(/\s*current\s*/, '');
            navArr[s].className = navArr[s].className.replace(/\s*curr-back\s*/, '');
        }
        classie.add(g('#nav' + n), 'current');
        isTransEnd = true;
    }
    if (isFlipped) {
        classie.remove(g('.photo-center')[0], 'rotate-back');
        classie.add(g('.photo-center')[0], 'rotate-front');
        classie.remove(g('.current')[0], 'curr-back');
        if (!isTransEnd) {
            return;
        }
        g('.photo-center')[0].addEventListener('transitionend', transEndFn);
        isTransEnd = false;
    } else {
        transEndFn();
    }
}
window.onresize = throttle(function () {
    resort(random([0, data.length]))
}, 500);
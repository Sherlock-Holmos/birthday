// =================================================== 入门示例 - 正常自动旋转

// 照片墙圆弧半径
let radius = 560;
// 每排容器
let boxImgs1 = document.getElementById('box-imgs1');
let boxImgs2 = document.getElementById('box-imgs2');
let boxImgs3 = document.getElementById('box-imgs3');
let boxImgs4 = document.getElementById('box-imgs4');
// 每排容器中的所有图片
let imgs1 = Array.from(boxImgs1.getElementsByTagName('img'))
let imgs2 = Array.from(boxImgs2.getElementsByTagName('img'))
let imgs3 = Array.from(boxImgs3.getElementsByTagName('img'))
let imgs4 = Array.from(boxImgs4.getElementsByTagName('img'))
// 设置圆弧倾斜角度
function setStyle(dom, i, len, delayTime) {
    dom.style.transform = `rotateY(${i * (360 / len)}deg) translateZ(${radius}px)`;
    // 缩放调整额外在追加一些动画
    // dom.style.transition = 'transform 1s';
    // dom.style.transitionDelay = `${delayTime || (len - i) / 4}s`
}
// 刷新一遍位置
function reloadStyle() {
    for (let i = 0; i < imgs1.length; i++) {
        setStyle(imgs1[i], i, imgs1.length, 0)
    }
    for (let i = 0; i < imgs2.length; i++) {
        setStyle(imgs2[i], i, imgs2.length, 0)
    }
    for (let i = 0; i < imgs3.length; i++) {
        setStyle(imgs3[i], i, imgs3.length, 0)
    }
    for (let i = 0; i < imgs4.length; i++) {
        setStyle(imgs4[i], i, imgs4.length, 0)
    }
}
// 初始化一遍
reloadStyle()


// =================================================== 升级示例 - 鼠标缩放（注释即失效）

// 鼠标滚轮 || 触摸板上下滚动，不要使用捏合手势，浏览器内容默认会被放大
document.onmousewheel = function (e) {
    // 获取捏合数值
    e || e.window.event
    const num = e.wheelDelta / 20 || -e.detail
    // 在原基础上调整角度数值
    radius += num
    // 重新布局
    reloadStyle()
}

// =================================================== 升级示例 - 鼠标拖拽（注释即失效）

// 拖拽容器
let dragBox = document.getElementById('box')
// 初始化坐标参数
let startX,
    startY,
    endX,
    endY,
    tX = 0,
    tY = 10,
    desX = 0,
    desY = 0
// 鼠标按下
document.onpointerdown = function (e) {
    // 清楚惯性定时器
    clearInterval(dragBox.timer)
    // 鼠标点击位置
    e = e || ewindow.event
    startX = e.clientX
    startY = e.clientY
    // 停止自动旋转
    playAutoRotate(false)
    // 鼠标移动
    this.onpointermove = function (e) {
        // 记录结束时位置
        e = e || window.event
        endX = e.clientX
        endY = e.clientY
        // 计算移动距离并修改角度
        desX = endX - startX
        desY = endY - startY
        tX += desX * 0.1
        tY += desY * 0.1
        // 设置角度
        changeDragBoxRotate()
        // 记录
        startX = endX
        startY = endY
    }
    // 鼠标抬起
    this.onpointerup = function (e) {
        // 添加惯性旋转
        dragBox.timer = setInterval(function () {
            // 计算惯性
            desX *= 0.95
            desY *= 0.95
            tX += desX * 0.1
            tY += desY * 0.1
            // 设置惯性角度
            changeDragBoxRotate()
            // 惯性数值不能大于指定数值，免的滚太多
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                // 清空定时器
                clearInterval(dragBox.timer)
                // 开启自动旋转
                playAutoRotate(true)
            }
        })
        // 清空
        this.onpointermove = this.onpointerup = null
    }
    return false
}
// 修改拖拽角度
function changeDragBoxRotate() {
    // X轴旋转 0 - 180 度
    if (tY > 180) {
        tY = 180
    }
    if (tY < 0) {
        tY = 0
    }
    // Y 轴旋转角度不限制
    dragBox.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`
}
// 控制旋转状态
function playAutoRotate(isPlay) {
    // 状态
    const status = isPlay ? 'running' : 'paused'
    // 任意控制一层6
    boxImgs2.style.animationPlayState = status
    boxImgs4.style.animationPlayState = status
}
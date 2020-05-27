//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    videoSrc: '',
    updataView: true,  //点击收藏
    videoImg: '',  //视频封面
    autoplay: true, //自动
    activeColor: "coral",//当前选择的圆点颜色
    touchX: 0, //手指按下时x的坐标
    touchY: 0, //手指按下时y的坐标
    interval: null,  //计时器
    time: 0, //按下到松开的时间
    current: 0,  //swiper的当前轮播图下标
    currentSwiper: 0,
    // 视频图片数据
    info: [{
      id: '1',
      img: 'https://mutuan.com/uploads/image/20191219/9513b84d9b2f7a893fcbe7b89a2d147d.jpg',
      type: 'video',
      video: 'http://www.mutuan.org/mobile/3.mp4'
    }, {
      id: "2",
      img: 'https://mutuan.com/uploads/image/20191218/fc6db346e044f45605f34aa5aae75ffe.jpg',
      type: 'img',
      video: ''
    },
    {
      id: '3',
      img: 'https://mutuan.com/uploads/image/20200311/f2af385ceac87872c8d268137535cc45.jpg',
      type: 'img',
      video: ''
    }
    ],
  },
  // 监听页面滑动
  onPageScroll: function (e) {
    //console.log("滚动" + e.scrollTop)
    var that = this;

    // 当滚动条位置 > 250 按钮显示
    // 当滚动条位置 < 250 按钮隐藏
    if (e.scrollTop > 250) {
      that.setData({
        up_show: true,
        // 向下滑动时候视频停止播放
        autoplay: true,
        videoSrc: '',
        videoImg: '',
        videoHide: false,
      })
    }
    if (e.scrollTop < 250) {
      that.setData({
        up_show: false
      })
    }
  },
  //点击播放按钮触发事件 事件处理函数
  play: function (val) {
    this.setData({
      videoSrc: val.currentTarget.dataset.item.video, autoplay: false, videoImg: val.currentTarget.dataset.item.img,
      videoHide: true,
    })
  },
  //防止手指滑动轮播图和控制视频进度事件冲突
  //手指开始触屏
  start: function (e) {
    //获取触摸的原始点
    this.setData({
      touchX: e.touches.length > 0 ? e.touches[0].pageX : 0,
      touchY: e.touches.length > 0 ? e.touches[0].pageY : 0
    })
    let timeNew = this.data.time
    //开始记录时间
    this.data.interval = setInterval(() => timeNew++, 100)
    this.setData({ time: timeNew })
  },
  //手指结束触屏
  end: function (e) {
    let touchX = e.changedTouches.length > 0 ? e.changedTouches[0].pageX : 0
    let touchY = e.changedTouches.length > 0 ? e.changedTouches[0].pageY : 0
    let tmX = touchX - this.data.touchX
    let tmY = touchY - this.data.touchY
    if (this.data.time < 10) {
      let absX = Math.abs(tmX)
      let absY = Math.abs(tmY)
      if (absX > 2 * absY) {
        //滑动swiper，视频停止播放
        this.setData({
          autoplay: true,
          videoSrc: '',
          videoImg: '',
          videoHide: false,
        })
        if (tmX < 0) {
          //左滑
          console.log('左滑')
          this.setData({
            current: this.data.current == (this.data.info.length - 1) ? 0 : this.data.current + 1
          })
        } else {
          //右滑
          console.log('右滑')
          this.setData({
            current: this.data.current > 0 ? this.data.current - 1 : this.data.info.length - 1
          })
        }
      }
    }
    clearInterval(this.data.interval)
    this.setData({ time: 0 })
  },
  handleStop: function () {
    this.setData({ videoSrc: '', autoplay: true, videoImg: '', videoHide: false, })
  },
  // 点击视频按钮回到视频页
  clickBlackVideo: function (e) {
    let id = e.currentTarget.id
    console.log(id)
    this.setData({
      currentSwiper: id
    })
  },
  // 点击图片按钮回到图片页
  clickBlackImg: function (e) {
    let id = e.currentTarget.id
    console.log(id)
    this.setData({
      currentSwiper: id
    })
  },
  changeCurrent: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
    //防止不停的调用setData可能会出现一些未知的bug
    if (e.detail.source == 'autoplay') {
      this.setData({
        current: e.detail.current,
      })
    }
  },
 
  onLoad: function () {
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //防止swiper出现抽搐
    this.setData({
      autoplay: false,
      videoSrc: '',
    })
  },

})

// pages/math/arithmetic/arithmetic.js
var audio;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
    number1: 0,
    number2: 0,
    total: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var first = Math.floor(Math.random() * 10);
    var second = Math.floor(Math.random() * 10);
    var third = Math.floor(Math.random() * (10 - first));
    var fourth = Math.floor(Math.random() * (10 - second));
    var number1 = parseInt(first + "" + second);
    var number2 = parseInt(third + "" + fourth);
    this.data.total = number1 + number2;
    this.setData({
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      oneCurval: 0,
      score: '',
      answer: '',
      oneImage: '/images/number_' + this.data.number + '.png',
      tenCurval: 0,
      tenImage: '/images/number_' + this.data.number + '.png'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    audio = wx.createInnerAudioContext();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 减一
   */
  minusOne: function (e) {
    var number = e.currentTarget.dataset.value;
    var id = e.currentTarget.id;
    number = (--number);
    if (number < 0) {
      number = 9;
    }
    if (id == "one") {
      this.data.sixth = number;
      this.setData({
        oneCurval: number,
        oneImage: '/images/number_' + number + '.png'
      })

    } else {
      this.data.fifth = number;
      this.setData({
        tenCurval: number,
        tenImage: '/images/number_' + number + '.png'
      }
      )
    }
    console.log(e);
  },
  /**
   * 加一
   */
  addOne: function (e) {
    var number = e.currentTarget.dataset.value;
    var id = e.currentTarget.id;
    number = (++number);
    if (number > 9) {
      number = 0;
    }
    if (id == "one") {
      this.data.sixth = number;
      this.setData({
        oneCurval: number,
        oneImage: '/images/number_' + number + '.png'
      })

    } else {
      this.data.fifth = number;
      this.setData({
        tenCurval: number,
        tenImage: '/images/number_' + number + '.png'
      }
      )
    }

    console.log(e);
  },
  question: function () {
    this.onLoad();

  },
  init: function () {
    this.setData({
      total: 0
    });
  },
  answer: function () {

    this.setData({

      answer: "正确答案是：" + this.data.total
    });
  },
  count: function () {

  },
  commit: function () {
    var msg = "";
    var score = '/images/right.png';
    console.log(this.data.total);
    console.log(parseInt(this.data.fifth + "" + this.data.sixth));
    if (this.data.total == parseInt(this.data.fifth + "" + this.data.sixth)) {
      msg = "真棒，答对了";

      audio.src = "/voice/right.mp3";
      if (audio.paused) {
        audio.play();
      }

    } else {
      msg = "真遗憾，答错了";
      score = '/images/wrong.png';
      audio.src = "/voice/sorry.mp3";
    }
    this.setData({
      msg: msg,
      score: score,
      answer: ""
    });
    audio.play();
  }

})
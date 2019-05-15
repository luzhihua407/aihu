var sliderWidth = wx.getSystemInfoSync().windowWidth/2; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["声母表", "发音"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        letters: {},
        current_letter_idx:0,
    },
    onReady: function (e) {
      // 使用 wx.createAudioContext 获取 audio 上下文 context

    },
    audioPlay: function (e) {
      var res = wx.getSystemInfoSync()
      if (res.platform == 'ios') {
        this.audio = wx.getBackgroundAudioManager()
      } else {
        this.audio = wx.createInnerAudioContext();
      }
      var mp3 = e.currentTarget.dataset.voice;
      console.log(mp3)
      
      this.audio.src = "http://i.xiao84.com/en-letter/26letter1/z.mp3";
      this.audio.play();
      this.audio.onPlay(() => {
        console.log('开始播放')
      })
      this.audio.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },
    onLoad: function () {
      console.log(1111);
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
              that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    tabChange: function (e) {
      console.log(222);
      var idx = e.currentTarget.dataset.idx;
      this.data.current_letter_idx= idx
      this.onLoad
      var _this = this;
      _this.setData({ letter: this.data.letters.alphabet[this.data.current_letter_idx].letter, voice: this.data.letters.alphabet[this.data.current_letter_idx].voice, preIdx: idx - 1, nextIdx: idx+1 })
        this.setData({
          sliderOffset: sliderWidth,
            activeIndex: 1
        });
    },
    readFile: function () {
      var fileData = require('../../utils/yunmu.js')
      console.log(fileData.data)
      var letters = fileData.data;
      var _this = this;
      _this.setData({ letter: letters.alphabet[0].letter, voice: letters.alphabet[0].voice, nextIdx: 1 })

    },
    preLetter: function (event) {

      var preIdx = event.currentTarget.dataset.preidx;
      console.log(preIdx + ">>>>>>>>" + this.data.letters.alphabet.length)
      var _this = this;
      if (preIdx < 0) {
        preIdx = this.data.letters.alphabet.length - 1;
      }
      _this.setData({ letter: this.data.letters.alphabet[preIdx].letter, voice: this.data.letters.alphabet[preIdx].voice, preIdx: preIdx - 1, nextIdx: preIdx + 1 })
    },
    nextLetter: function (event) {

      var nextIdx = event.currentTarget.dataset.nextidx;
      console.log(nextIdx + ">>>>>>>>" + this.data.letters.alphabet.length)
      var _this = this;
      if (nextIdx == this.data.letters.alphabet.length) {
        nextIdx = 0;
      }
      _this.setData({ letter: this.data.letters.alphabet[nextIdx].letter, voice: this.data.letters.alphabet[nextIdx].voice, preIdx: nextIdx - 1, nextIdx: nextIdx + 1 })
    },
    onLoad: function () {
      var fileData = require('../../utils/yunmu.js')
      this.data.letters = fileData.data;
      this.data.alphabet = fileData.data.alphabet;
      var _this = this;
      var letterLen = fileData.data.alphabet.length;
      _this.setData({ alphabet: this.data.letters.alphabet})
      _this.setData({ letter: this.data.letters.alphabet[this.data.current_letter_idx].letter, voice: this.data.letters.alphabet[this.data.current_letter_idx].voice, preIdx: letterLen - 1, nextIdx: 1 })
    }
})
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    voicepath: {
      type: String,
      value: "/voice/zh/"
    }
  },
  data: {
    sliderWidth: wx.getSystemInfoSync().windowWidth / 2,
    tabs: ["全部", "发音"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    letters: {},
    current_letter_idx: 0,
    fileData: ''
  },
  methods: {
    onReady: function (e) {
      // 使用 wx.createAudioContext 获取 audio 上下文 context

    },
    setDataSource: function (ds) {
      this.data.fileData = require(ds);
    },
    audioPlay: function (e) {
      var res = wx.getSystemInfoSync()
      if (res.platform == 'ios') {
        this.audio = wx.getBackgroundAudioManager()
      } else {
        this.audio = wx.createInnerAudioContext();
      }
      var voicepath = e.currentTarget.dataset.voicepath;
      console.log(voicepath);
      this.audio.src = voicepath;
      this.audio.play();
      this.audio.onPlay(() => {
        console.log('开始播放')
      })
      this.audio.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },

    tabClick: function (e) {
      //this.data.sliderOffset = e.currentTarget.offsetLeft;
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    tabChange: function (e) {
      var idx = e.currentTarget.dataset.idx;
      this.data.current_letter_idx = idx
      var _this = this;
      _this.setData({ letter: this.data.letters.alphabet[this.data.current_letter_idx].letter, capital: this.data.letters.alphabet[this.data.current_letter_idx].capital, voice: this.data.letters.alphabet[this.data.current_letter_idx].voice, preIdx: idx - 1, nextIdx: idx + 1 })
      this.setData({
        sliderOffset: this.data.sliderWidth,
        activeIndex: 1
      });
    },
    preLetter: function (event) {

      var preIdx = event.currentTarget.dataset.preidx;
      var _this = this;
      if (preIdx < 0) {
        preIdx = this.data.letters.alphabet.length - 1;
      }
      _this.setData({ letter: this.data.letters.alphabet[preIdx].letter, capital: this.data.letters.alphabet[preIdx].capital, voice: this.data.letters.alphabet[preIdx].voice, preIdx: preIdx - 1, nextIdx: preIdx + 1 })
    },
    nextLetter: function (event) {

      var nextIdx = event.currentTarget.dataset.nextidx;
      var _this = this;
      if (nextIdx == this.data.letters.alphabet.length) {
        nextIdx = 0;
      }
      _this.setData({ letter: this.data.letters.alphabet[nextIdx].letter, capital: this.data.letters.alphabet[nextIdx].capital, voice: this.data.letters.alphabet[nextIdx].voice, preIdx: nextIdx - 1, nextIdx: nextIdx + 1 })
    },
    onLoad: function () {
     
      this.data.letters = this.data.fileData.data;
      this.data.alphabet=this.convertArray(this.data.fileData.data.alphabet);
      var _this = this;
      var letterLen = this.data.fileData.data.alphabet.length;
      _this.setData({ alphabet: this.data.alphabet })
      _this.setData({ letter: this.data.letters.alphabet[this.data.current_letter_idx].letter, capital: this.data.letters.alphabet[this.data.current_letter_idx].capital, voice: this.data.letters.alphabet[this.data.current_letter_idx].voice, preIdx: letterLen - 1, nextIdx: 1 })
    },
    convertArray: function (arr) {

      var len = 5;
      var rowLen = arr.length % len == 0 ? parseInt(arr.length / len) : parseInt(arr.length / len) + 1;
      var row = new Array();
      var column = new Array();
      var idx = 0;
      var idxRow = 0;
      for (var i = 0; i < arr.length; i++) {
        column[idx] = arr[i];
        idx++;
        if ((i+1) % len == 0 || i == arr.length - 1) {
          row[idxRow++] = column;
          idx = 0;
          column = new Array();
        }

      }
      return row;
    },
    /*** 滑动切换tab***/
    bindChange: function (e) {
      var that = this;
      that.setData({ 
        sliderOffset: e.detail.current == 0 ? 0 : this.data.sliderWidth,
        activeIndex: e.detail.current
       });
    },

  }
})

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    voicepath: {
      type: String,
      value: "/voice/zh/"
    }
  },
  data: {
    letters: {},
    current_letter: "",
    fileData: '',
    radioItems: [],
    audio:null
  },
  methods: {
    onReady: function (e) {
     
    },
    setDataSource: function (ds) {
      this.data.fileData = require(ds);
    },
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].letter == e.detail.value;
      }
      this.setData({
        radioItems: radioItems
      });

    },
    onLoad: function () {
      var that = this;
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      var res = wx.getSystemInfoSync();
      if (res.platform == 'ios') {
        this.data.audio = wx.getBackgroundAudioManager();
      } else {
        this.data.audio = wx.createInnerAudioContext();
      }
      this.data.letters = this.data.fileData.data;
      this.randomLetter();
    },
    play: function (e) {
      var currentletter=  e.currentTarget.dataset.currentletter;
      console.log(currentletter);
      this.data.audio.src = "/voice/exam/question.mp3";
      if (this.data.audio.paused) {

        this.data.audio.play();
      }
      this.data.audio.onEnded((e) =>{
        this.data.audio.src = "/voice/zh/" + currentletter+".mp3";
        this.data.audio.play();
        this.data.audio.offEnded();
      });
    },
    confirm: function (e) {

      var currentLetter = e.detail.value.currentLetter;
      var answer = e.detail.value.answer;
      if (answer == '') {
        wx.showToast({
          title: '请选择答案!',
        })
        return false;
      }
      if (currentLetter == answer) {
        this.data.audio.src = "/voice/right.mp3";
        this.data.audio.play();
        this.data.audio.offEnded();
 
      } else {
        this.data.audio.src = "/voice/sorry.mp3";
        this.data.audio.play();
        this.data.audio.offEnded();
        wx.showToast({
          title: '正确答案是' +currentLetter,
        })
      }
    
      
    },
    next: function () {
      this.randomLetter();
    },
    randomLetter: function () {
      var arr = new Array();
      var len = this.data.letters.alphabet.length;
      for (var i = 0; i < 4; i++) {
        var idx = Math.floor(Math.random() * len);
        var letter = this.data.letters.alphabet[idx];
        while (true) {
          if (arr.indexOf(letter) != -1) {
            idx = Math.floor(Math.random() * len);
            letter = this.data.letters.alphabet[idx];
          }
          break;
        }
        letter.checked = false;
        arr[i] = letter;
      }
      console.log(arr);
      var currentIdx = Math.floor(Math.random() * 4);
      var currentLetter = arr[currentIdx].letter;
      this.setData({
        radioItems: arr,
        currentLetter: currentLetter
      });
    }




  }



})

Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    var letterDetail = this.selectComponent("#letter-exam");
    letterDetail.setDataSource('../../utils/shengmu.js');
    letterDetail.onLoad();
  },

})
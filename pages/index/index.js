Page({
  data: {
    
  },
  onLoad:function(){
  },
  openPage:function(event){

    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  }
});
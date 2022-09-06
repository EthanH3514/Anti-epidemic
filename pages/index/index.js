// index.js
// 获取应用实例
var app = getApp()

Page({
  data: {
  },
  chooseLevel:function(event){
    wx.navigateTo({
      url: '/pages/virus/virus',
    })
    var level=event.currentTarget.dataset.level
    console.log(level)
    app.globalData.level=level;
  },
  costom:function(){
    app.globalData.level='custom';
    wx.navigateTo({
      url: '/pages/custom_/custom',
    })
  },
  help:function(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  back:function(){
    wx.redirectTo({
      url: '/pages/Choose_hero/Choose_hero',
    })
  }
})

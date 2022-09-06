// pages/Choose_hero/Choose_hero.js
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },
    Choose_dabai:function(){
        wx.switchTab({
          url: '/pages/index/index',
        })
    },
    Choose_virus:function(){
        wx.navigateTo({
          url: '/pages/index_virus/index_virus',
        })
    },
    onLoad:function(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    }
})
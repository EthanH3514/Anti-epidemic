// pages/showing/showing.js
var tempFilePaths,tempFilePath;
Page({
    data:{
        imgPath:''
    },
    openFile:function(){
        var that=this;
        wx.chooseImage({
          success(res){
              tempFilePaths=res.tempFilePaths
              console.log('打开文件路径'+tempFilePaths)
              that.setData({
                  imgPath:tempFilePaths[0]
              })
          }
        })
    }
})
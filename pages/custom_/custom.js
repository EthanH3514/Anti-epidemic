// pages/custom_/custom.js
var app=getApp();
Page({
    data:{
        mine_number:10,
        column:9,
        row:9,
    },
    dataChange:function(e){
        let nice=e.currentTarget.dataset.nice;
        let value=e.detail.value;
        console.log(nice,value)
        this.setData({
            [nice]:value
        })
    },
    confirm:function(){
        app.globalData.custom_row=this.data.row;
        app.globalData.custom_column=this.data.column;
        app.globalData.custom_mine_number=this.data.mine_number;
        wx.navigateTo({
          url: '/pages/virus/virus',
        })
    }
})
// pages/drawing/drawing.js
Page({
    data:{
        param:5,
        r:0,
        g:0,
        b:0,
        a:1,
        color:'',
        isClear:false
    },
    colorChange:function(e){
        let color=e.currentTarget.dataset.color;
        let value=e.detail.value;
        console.log(color,value)
        this.setData({
            [color]:value,
            'color':'rgba('+this.data.r+','+this.data.g+','+this.data.b+','+this.data.a+')'
        })
    },
    paramChange:function(e){
        let param=e.currentTarget.dataset.param;
        let value=e.detail.value;
        console.log(param,value)
        this.setData({
            [param]:value
        })
    },
    touchStart:function(e){
        this.x1=e.changedTouches[0].x;
        this.y1=e.changedTouches[0].y;
        if(this.data.isClear){
            this.ctx.setStrokeStyle('#e6e6e6');
            this.ctx.setLineCap('round');
            this.ctx.setLineJoin('round');
            this.ctx.setLineWidth(this.data.param);
            this.ctx.beginPath()
        }else{
            this.ctx.setStrokeStyle(this.data.color);
            this.ctx.setLineWidth(this.data.param);
            this.ctx.setLineCap('round');
            this.ctx.beginPath();
        }
    },
    touchMove:function(e){
        var x2=e.changedTouches[0].x;
        var y2=e.changedTouches[0].y;
        if(this.data.isClear){
            this.ctx.save();
            this.ctx.moveTo(this.x1,this.y1);
            this.ctx.lineTo(x2,y2);
            this.ctx.stroke();
            this.x1=x2;
            this.y1=y2;
        }else{
            this.ctx.moveTo(this.x1,this.y1);
            this.ctx.lineTo(x2,y2);
            this.ctx.stroke();
            this.x1=x2;
            this.y1=y2;
        }
        this.ctx.draw(true);
    },
    touchEnd:function(){},
    clear:function(){
        if(this.data.isClear==false){
            this.setData({
                isClear:true
            })
        }
        else{
            this.setData({
                isClear:false
            })
        }
    },
    clearAll:function(){
        this.ctx.draw()
    },
    onLoad:function(){
        this.setData({
            'color':'rgba('+this.data.r+','+this.data.g+','+this.data.b+','+this.data.a+')'
        })
        this.ctx=wx.createCanvasContext('myCanvas', this);
    },
    saveImg:function(){
        let that=this;
        wx.showLoading({
          title: '正在保存',
          mask:true,
        })
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success:(res)=>{
              console.log(res);
              wx.hideLoading();
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success:function(res){
                    console.log(res);
                    wx.showToast({
                      title: '保存成功',
                    })
                    that.setData({
                        modalName:null
                    })
                },
                fail:function(res){
                    console.log(res);
                    if(res.errMsg=='saveImageToPhotosAlbum:fail auth deny'){
                        wx.showModal({
                          title:"请打开相册授权",
                          success(res){
                              if(res.confirm){
                                  wx.openSetting({
                                    success:function(data){},
                                    fail:function(data){
                                        console.log("openSetting fail",data);
                                    }
                                  });
                              } else if(res.cancel){
                                  console.log('用户点击取消')
                              }
                          }
                        })
                    }
                }
              })
          }
        })
    },
    fail:function(res){
        console.log(res);
    }
})
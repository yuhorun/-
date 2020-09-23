// index.ts
// 获取应用实例

import  Dialog  from '../../miniprogram_modules/@vant/dialog/dialog'

Page({
  data:{
    slideImg:['../../static/slide1.jpg','../../static/slide2.jpg'],
    imgIndex:0,
    people:[] as any,
    position:[] as any,
    url:'',
    random:[] as any
  },
  onLoad(){
    wx.cloud.init()
    // setInterval(this.rightImag,5000)
  },
  rightImag(){
    let imgIndex = this.data.imgIndex
    let imgLength = this.data.slideImg.length
    if (imgIndex+1>=imgLength){
      this.setData({
        imgIndex:0
      })
    }else{
      this.setData({
        imgIndex:imgIndex+1
      })
    }
  },
  leftImag(){
    let imgIndex = this.data.imgIndex
    let imgLength = this.data.slideImg.length
    if (imgIndex-1<0){
      this.setData({
        imgIndex:imgLength-1
      })
    }else{
      this.setData({
        imgIndex:imgIndex-1
      })
    }
  },
  tablify(tableName:string){
    wx.chooseMessageFile({
      count:1,
      success:(res:any)=>{
        console.log(res);
        let path = res.tempFiles[0].path
        const cloudPath = 'req_' + tableName  + new Date().getTime() + '.' +  path.split('.').pop()
        wx.showLoading({
          title:'加载中...'
        })
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath:path,
          success: (res:any)=>{
            wx.cloud.callFunction({
              name: 'parser', 
              data:{action:'objectfy',fileId: res.fileID},
              success: (res:any) => {
                console.log('callFunction test result: ', res)
                if (res.result.ok){
                  wx.hideLoading()
                  if (tableName=='people'){
                    this.setData({
                      people: res.result.data
                    })
                  }
                  if (tableName=='position'){
                    this.setData({
                      position: res.result.data
                    })
                  }
                }
              },
              fail:(err:any)=>{
                wx.hideLoading()
                console.log(err);
              }
            })
          },
          fail:(err:any)=>{
            wx.hideLoading()
            console.log('上传文件失败',err);
            wx.showToast({
              title:'上传文件失败',
              icon:'none',
              duration:1000
            })
          }
        })
      }
    })
  },
  clickleftimport(){
   this.tablify('people')
  },
  clickrightimport(){
    this.tablify('position')
  },

  randomassign(){
    wx.showLoading({
      title:'加载中...'
    })
    if (!this.data.people || !this.data.position){
      wx.hideLoading()
      wx.showToast({
        title:'还未选择文件',
        icon:'none',
        duration:1000
      })
      return
    }
    let positions = []
    for (let i=0; i<this.data.position.length; i++){
        for (let j=0; j<Number(this.data.position[i].number); j++){
          positions.push(this.data.position[i].position)
        }
    }
    console.log('postions',positions);
    
    if (positions.length !== this.data.people.length){
      wx.hideLoading()
      wx.showToast({
        title:'员工数量与岗位数量不匹配',
        icon:'none',
        duration:1000
      })
      return
    }

    let randomPeople = this.data.people
    for (let i=0; i<randomPeople.length; i++){
      const randomIndex = Math.floor(Math.random()*(randomPeople.length-1))
      const temp = randomPeople[i]
      randomPeople[i] = randomPeople[randomIndex]
      randomPeople[randomIndex] = temp
    }

    for (let i=0; i<randomPeople.length; i++){
      randomPeople[i].position = positions[i]
    }

    wx.cloud.callFunction({
      name: 'parser', 
      data:{action:'tablify',obj: randomPeople,fileName:"res.xlsx"},
      success: (res:any) => {
        console.log('callFunction test result: ', res)
        if (res.result.ok){
          wx.hideLoading()
          this.setData({
            url:res.result.data.fileList[0].tempFileURL,
            random:randomPeople
          },()=>{
            wx.pageScrollTo({
              duration:1000,
              selector:'.saveurl'
            })
          })
        }
      },
      fail:(res:any)=>{
        wx.hideLoading()
        console.log(res);
        
      }
    })
  },
  copyclick(){
    if (Dialog.alert){
      Dialog.alert({
        title: '保存结果',
        message:"点击确认复制下载链接，到浏览器打开",
      }).then(()=>{
        wx.setClipboardData({
          data: this.data.url,
          success: ()=>{
            wx.getClipboardData({
              success: function(res) {
                console.log(res.data) // data
              }
            })
          },
          fail:(e:any)=>{
            console.log(e);
            
          }
        })
      })
    }
    if(Dialog.close){
      Dialog.close()
    }
  }
})

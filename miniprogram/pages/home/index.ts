// index.ts
// 获取应用实例

import  Dialog  from '../../miniprogram_modules/@vant/dialog/dialog'

Page({
  data: {
    show:true,
    peopleFileID:'',
    peopleFileName:'',
    carFileID:'',
    carFileName:'',
    resUrl:''
  },

  onReady: function () {
    wx.cloud.init()

  },
  // 事件处理函数
  onLoad() {

  },

  peoplePlus(){
    wx.chooseMessageFile({
      count:1,
      success:(res:any)=>{
        let path = res.tempFiles[0].path
        let fileName = res.tempFiles[0].name
        const cloudPath = 'req_people_' + new Date().getTime() + '.' +  path.split('.').pop()
        wx.showLoading({
          title:'加载中...'
        })
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath:path,
          success: (res:any)=>{
            wx.hideLoading()
            console.log('上传文件成功', res.fileID);
            this.setData({
              peopleFileID: res.fileID,
              peopleFileName: fileName
            })
          },
          fail:(err:any)=>{
            console.log('上传文件失败', err);
          }
        })
      }
    })
  },
  carPlus(){
    wx.chooseMessageFile({
      count:1,
      success:(res:any)=>{
        console.log(res);
        let path = res.tempFiles[0].path
        let fileName = res.tempFiles[0].name
        const cloudPath = 'req_car_' + new Date().getTime() + '.' +  path.split('.').pop()
        wx.showLoading({
          title:'加载中...'
        })
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath:path,
          success: (res:any)=>{
            wx.hideLoading()
            console.log('上传文件成功', res.fileID);
            this.setData({
              carFileID: res.fileID,
              carFileName: fileName
            })
          },
          fail:(err:any)=>{
            console.log('上传文件失败', err);
          }
        })
      }
    })
  },
  getRes(){
    if (!this.data.carFileName || !this.data.peopleFileName){
      wx.showToast({
        title:'还未选择文件',
        icon:'none',
        duration:1000
      })
      return
    }
    wx.showLoading({
      title:'稍等...'
    })
    wx.cloud.callFunction({
      name: 'parser', 
      data:this.data,
      success: (res:any) => {
        console.log('callFunction test result: ', res)
        if (res.result.fileList[0].tempFileURL){
          wx.hideLoading()
          Dialog.alert({
            title: '分配成功',
            message:"点击确认复制下载链接，到浏览器打开",
          }).then(()=>{
            wx.setClipboardData({
              data: res.result.fileList[0].tempFileURL,
              success: (res:any)=>{
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
          Dialog.close()
        }else{
          wx.showToast({
            title:'失败，请确认表格内容，重新提交文件',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  }
})

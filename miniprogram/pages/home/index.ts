// index.ts
// 获取应用实例

const app = getApp<IAppOption>()
Page({
  data: {
    peopleFileID:'',
    peopleFileName:'',
    carFileID:'',
    carFileName:''
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
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath:path,
          success: (res:any)=>{
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
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath:path,
          success: (res:any)=>{
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
    wx.cloud.callFunction({
      name: 'parser', 
      data:this.data,
      complete: (res:any) => {
        console.log('callFunction test result: ', res)
      }
    })
  }
})

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})
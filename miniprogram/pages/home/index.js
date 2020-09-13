"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = require("../../miniprogram_modules/@vant/dialog/dialog");
Page({
    data: {
        show: true,
        peopleFileID: '',
        peopleFileName: '',
        carFileID: '',
        carFileName: '',
        resUrl: ''
    },
    onReady: function () {
        wx.cloud.init();
    },
    onLoad: function () {
    },
    peoplePlus: function () {
        var _this = this;
        wx.chooseMessageFile({
            count: 1,
            success: function (res) {
                var path = res.tempFiles[0].path;
                var fileName = res.tempFiles[0].name;
                var cloudPath = 'req_people_' + new Date().getTime() + '.' + path.split('.').pop();
                wx.showLoading({
                    title: '加载中...'
                });
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: path,
                    success: function (res) {
                        wx.hideLoading();
                        console.log('上传文件成功', res.fileID);
                        _this.setData({
                            peopleFileID: res.fileID,
                            peopleFileName: fileName
                        });
                    },
                    fail: function (err) {
                        console.log('上传文件失败', err);
                    }
                });
            }
        });
    },
    carPlus: function () {
        var _this = this;
        wx.chooseMessageFile({
            count: 1,
            success: function (res) {
                console.log(res);
                var path = res.tempFiles[0].path;
                var fileName = res.tempFiles[0].name;
                var cloudPath = 'req_car_' + new Date().getTime() + '.' + path.split('.').pop();
                wx.showLoading({
                    title: '加载中...'
                });
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: path,
                    success: function (res) {
                        wx.hideLoading();
                        console.log('上传文件成功', res.fileID);
                        _this.setData({
                            carFileID: res.fileID,
                            carFileName: fileName
                        });
                    },
                    fail: function (err) {
                        console.log('上传文件失败', err);
                    }
                });
            }
        });
    },
    getRes: function () {
        if (!this.data.carFileName || !this.data.peopleFileName) {
            wx.showToast({
                title: '还未选择文件',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        wx.showLoading({
            title: '稍等...'
        });
        wx.cloud.callFunction({
            name: 'parser',
            data: this.data,
            success: function (res) {
                console.log('callFunction test result: ', res);
                if (res.result.fileList[0].tempFileURL) {
                    wx.hideLoading();
                    dialog_1.default.alert({
                        title: '分配成功',
                        message: "点击确认复制下载链接，到浏览器打开",
                    }).then(function () {
                        wx.setClipboardData({
                            data: res.result.fileList[0].tempFileURL,
                            success: function (res) {
                                wx.getClipboardData({
                                    success: function (res) {
                                        console.log(res.data);
                                    }
                                });
                            },
                            fail: function (e) {
                                console.log(e);
                            }
                        });
                    });
                    dialog_1.default.close();
                }
                else {
                    wx.showToast({
                        title: '失败，请确认表格内容，重新提交文件',
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHdFQUFvRTtBQUVwRSxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUMsSUFBSTtRQUNULFlBQVksRUFBQyxFQUFFO1FBQ2YsY0FBYyxFQUFDLEVBQUU7UUFDakIsU0FBUyxFQUFDLEVBQUU7UUFDWixXQUFXLEVBQUMsRUFBRTtRQUNkLE1BQU0sRUFBQyxFQUFFO0tBQ1Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0lBRWpCLENBQUM7SUFFRCxNQUFNO0lBRU4sQ0FBQztJQUVELFVBQVUsRUFBVjtRQUFBLGlCQTJCQztRQTFCQyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsS0FBSyxFQUFDLENBQUM7WUFDUCxPQUFPLEVBQUMsVUFBQyxHQUFPO2dCQUNkLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDcEMsSUFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ3JGLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ2IsS0FBSyxFQUFDLFFBQVE7aUJBQ2YsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO29CQUNsQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFDLElBQUk7b0JBQ2IsT0FBTyxFQUFFLFVBQUMsR0FBTzt3QkFDZixFQUFFLENBQUMsV0FB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O3dCQUNYLEtBQUssRUFBRSxNQUFNO3dCQUNiLE9BQU8sRUFBQyxtQkFBbUI7cUJBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ04sRUFBRSxDQUFDLGdCQUFnQixDQUFDOzRCQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVzs0QkFDeEMsT0FBTyxFQUFFLFVBQUMsR0FBTztnQ0FDZixFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0NBQ2xCLE9BQU8sRUFBRSxVQUFTLEdBQUc7d0NBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO29DQUN2QixDQUFDO2lDQUNGLENBQUMsQ0FBQTs0QkFDSixDQUFDOzRCQUNELElBQUksRUFBQyxVQUFDLENBQUs7Z0NBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFakIsQ0FBQzt5QkFDRixDQUFDLENBQUE7b0JBQ0osQ0FBQyxDQUFDLENBQUE7b0JBQ0YsZ0JBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtpQkFDZjtxQkFBSTtvQkFDSCxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBQyxtQkFBbUI7d0JBQ3pCLElBQUksRUFBQyxNQUFNO3dCQUNYLFFBQVEsRUFBQyxJQUFJO3FCQUNkLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcblxyXG5pbXBvcnQgIERpYWxvZyAgZnJvbSAnLi4vLi4vbWluaXByb2dyYW1fbW9kdWxlcy9AdmFudC9kaWFsb2cvZGlhbG9nJ1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgc2hvdzp0cnVlLFxyXG4gICAgcGVvcGxlRmlsZUlEOicnLFxyXG4gICAgcGVvcGxlRmlsZU5hbWU6JycsXHJcbiAgICBjYXJGaWxlSUQ6JycsXHJcbiAgICBjYXJGaWxlTmFtZTonJyxcclxuICAgIHJlc1VybDonJ1xyXG4gIH0sXHJcblxyXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHd4LmNsb3VkLmluaXQoKVxyXG5cclxuICB9LFxyXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxyXG4gIG9uTG9hZCgpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgcGVvcGxlUGx1cygpe1xyXG4gICAgd3guY2hvb3NlTWVzc2FnZUZpbGUoe1xyXG4gICAgICBjb3VudDoxLFxyXG4gICAgICBzdWNjZXNzOihyZXM6YW55KT0+e1xyXG4gICAgICAgIGxldCBwYXRoID0gcmVzLnRlbXBGaWxlc1swXS5wYXRoXHJcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gcmVzLnRlbXBGaWxlc1swXS5uYW1lXHJcbiAgICAgICAgY29uc3QgY2xvdWRQYXRoID0gJ3JlcV9wZW9wbGVfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy4nICsgIHBhdGguc3BsaXQoJy4nKS5wb3AoKVxyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOifliqDovb3kuK0uLi4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5jbG91ZC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgIGNsb3VkUGF0aDogY2xvdWRQYXRoLFxyXG4gICAgICAgICAgZmlsZVBhdGg6cGF0aCxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKDmlofku7bmiJDlip8nLCByZXMuZmlsZUlEKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICBwZW9wbGVGaWxlSUQ6IHJlcy5maWxlSUQsXHJcbiAgICAgICAgICAgICAgcGVvcGxlRmlsZU5hbWU6IGZpbGVOYW1lXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDooZXJyOmFueSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaWh+S7tuWksei0pScsIGVycik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGNhclBsdXMoKXtcclxuICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcclxuICAgICAgY291bnQ6MSxcclxuICAgICAgc3VjY2VzczoocmVzOmFueSk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGxldCBwYXRoID0gcmVzLnRlbXBGaWxlc1swXS5wYXRoXHJcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gcmVzLnRlbXBGaWxlc1swXS5uYW1lXHJcbiAgICAgICAgY29uc3QgY2xvdWRQYXRoID0gJ3JlcV9jYXJfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy4nICsgIHBhdGguc3BsaXQoJy4nKS5wb3AoKVxyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOifliqDovb3kuK0uLi4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5jbG91ZC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgIGNsb3VkUGF0aDogY2xvdWRQYXRoLFxyXG4gICAgICAgICAgZmlsZVBhdGg6cGF0aCxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKDmlofku7bmiJDlip8nLCByZXMuZmlsZUlEKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICBjYXJGaWxlSUQ6IHJlcy5maWxlSUQsXHJcbiAgICAgICAgICAgICAgY2FyRmlsZU5hbWU6IGZpbGVOYW1lXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDooZXJyOmFueSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaWh+S7tuWksei0pScsIGVycik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldFJlcygpe1xyXG4gICAgaWYgKCF0aGlzLmRhdGEuY2FyRmlsZU5hbWUgfHwgIXRoaXMuZGF0YS5wZW9wbGVGaWxlTmFtZSl7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6J+i/mOacqumAieaLqeaWh+S7ticsXHJcbiAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6J+eojeetiS4uLidcclxuICAgIH0pXHJcbiAgICB3eC5jbG91ZC5jYWxsRnVuY3Rpb24oe1xyXG4gICAgICBuYW1lOiAncGFyc2VyJywgXHJcbiAgICAgIGRhdGE6dGhpcy5kYXRhLFxyXG4gICAgICBzdWNjZXNzOiAocmVzOmFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsRnVuY3Rpb24gdGVzdCByZXN1bHQ6ICcsIHJlcylcclxuICAgICAgICBpZiAocmVzLnJlc3VsdC5maWxlTGlzdFswXS50ZW1wRmlsZVVSTCl7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICBEaWFsb2cuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WIhumFjeaIkOWKnycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6XCLngrnlh7vnoa7orqTlpI3liLbkuIvovb3pk77mjqXvvIzliLDmtY/op4jlmajmiZPlvIBcIixcclxuICAgICAgICAgIH0pLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICAgICAgICAgICAgZGF0YTogcmVzLnJlc3VsdC5maWxlTGlzdFswXS50ZW1wRmlsZVVSTCxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzOmFueSk9PntcclxuICAgICAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSkgLy8gZGF0YVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZmFpbDooZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBEaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6J+Wksei0pe+8jOivt+ehruiupOihqOagvOWGheWuue+8jOmHjeaWsOaPkOS6pOaWh+S7ticsXHJcbiAgICAgICAgICAgIGljb246J25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjoyMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==
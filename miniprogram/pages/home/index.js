"use strict";
var app = getApp();
Page({
    data: {
        peopleFileID: '',
        peopleFileName: '',
        carFileID: '',
        carFileName: ''
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
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: path,
                    success: function (res) {
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
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: path,
                    success: function (res) {
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
        wx.cloud.callFunction({
            name: 'parser',
            data: this.data,
            complete: function (res) {
                console.log('callFunction test result: ', res);
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFDaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFDLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtRQUNqQixTQUFTLEVBQUMsRUFBRTtRQUNaLFdBQVcsRUFBQyxFQUFFO0tBQ2Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0lBRWpCLENBQUM7SUFFRCxNQUFNO0lBRU4sQ0FBQztJQUVELFVBQVUsRUFBVjtRQUFBLGlCQXVCQztRQXRCQyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsS0FBSyxFQUFDLENBQUM7WUFDUCxPQUFPLEVBQUMsVUFBQyxHQUFPO2dCQUNkLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDcEMsSUFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ3JGLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO29CQUNsQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFDLElBQUk7b0JBQ2IsT0FBTyxFQUFFLFVBQUMsR0FBTzt3QkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xDLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNOzRCQUN4QixjQUFjLEVBQUUsUUFBUTt5QkFDekIsQ0FBQyxDQUFBO29CQUNKLENBQUM7b0JBQ0QsSUFBSSxFQUFDLFVBQUMsR0FBTzt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztpQkFDRixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE9BQU8sRUFBUDtRQUFBLGlCQXdCQztRQXZCQyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsS0FBSyxFQUFDLENBQUM7WUFDUCxPQUFPLEVBQUMsVUFBQyxHQUFPO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDcEMsSUFBTSxTQUFTLEdBQUcsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ2xGLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO29CQUNsQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFDLElBQUk7b0JBQ2IsT0FBTyxFQUFFLFVBQUMsR0FBTzt3QkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xDLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNOzRCQUNyQixXQUFXLEVBQUUsUUFBUTt5QkFDdEIsQ0FBQyxDQUFBO29CQUNKLENBQUM7b0JBQ0QsSUFBSSxFQUFDLFVBQUMsR0FBTzt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDN0IsQ0FBQztpQkFDRixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE1BQU0sRUFBTjtRQUNFLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3BCLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJO1lBQ2QsUUFBUSxFQUFFLFVBQUMsR0FBTztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNoRCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcblxuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgcGVvcGxlRmlsZUlEOicnLFxuICAgIHBlb3BsZUZpbGVOYW1lOicnLFxuICAgIGNhckZpbGVJRDonJyxcbiAgICBjYXJGaWxlTmFtZTonJ1xuICB9LFxuXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICB3eC5jbG91ZC5pbml0KClcblxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgb25Mb2FkKCkge1xuXG4gIH0sXG5cbiAgcGVvcGxlUGx1cygpe1xuICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcbiAgICAgIGNvdW50OjEsXG4gICAgICBzdWNjZXNzOihyZXM6YW55KT0+e1xuICAgICAgICBsZXQgcGF0aCA9IHJlcy50ZW1wRmlsZXNbMF0ucGF0aFxuICAgICAgICBsZXQgZmlsZU5hbWUgPSByZXMudGVtcEZpbGVzWzBdLm5hbWVcbiAgICAgICAgY29uc3QgY2xvdWRQYXRoID0gJ3JlcV9wZW9wbGVfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy4nICsgIHBhdGguc3BsaXQoJy4nKS5wb3AoKVxuICAgICAgICB3eC5jbG91ZC51cGxvYWRGaWxlKHtcbiAgICAgICAgICBjbG91ZFBhdGg6IGNsb3VkUGF0aCxcbiAgICAgICAgICBmaWxlUGF0aDpwYXRoLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXM6YW55KT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaWh+S7tuaIkOWKnycsIHJlcy5maWxlSUQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgcGVvcGxlRmlsZUlEOiByZXMuZmlsZUlELFxuICAgICAgICAgICAgICBwZW9wbGVGaWxlTmFtZTogZmlsZU5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOihlcnI6YW55KT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaWh+S7tuWksei0pScsIGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGNhclBsdXMoKXtcbiAgICB3eC5jaG9vc2VNZXNzYWdlRmlsZSh7XG4gICAgICBjb3VudDoxLFxuICAgICAgc3VjY2VzczoocmVzOmFueSk9PntcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgbGV0IHBhdGggPSByZXMudGVtcEZpbGVzWzBdLnBhdGhcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gcmVzLnRlbXBGaWxlc1swXS5uYW1lXG4gICAgICAgIGNvbnN0IGNsb3VkUGF0aCA9ICdyZXFfY2FyXycgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICcuJyArICBwYXRoLnNwbGl0KCcuJykucG9wKClcbiAgICAgICAgd3guY2xvdWQudXBsb2FkRmlsZSh7XG4gICAgICAgICAgY2xvdWRQYXRoOiBjbG91ZFBhdGgsXG4gICAgICAgICAgZmlsZVBhdGg6cGF0aCxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzOmFueSk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKDmlofku7bmiJDlip8nLCByZXMuZmlsZUlEKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGNhckZpbGVJRDogcmVzLmZpbGVJRCxcbiAgICAgICAgICAgICAgY2FyRmlsZU5hbWU6IGZpbGVOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDooZXJyOmFueSk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKDmlofku7blpLHotKUnLCBlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXRSZXMoKXtcbiAgICB3eC5jbG91ZC5jYWxsRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ3BhcnNlcicsIFxuICAgICAgZGF0YTp0aGlzLmRhdGEsXG4gICAgICBjb21wbGV0ZTogKHJlczphbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbGxGdW5jdGlvbiB0ZXN0IHJlc3VsdDogJywgcmVzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=
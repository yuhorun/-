"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = require("../../miniprogram_modules/@vant/dialog/dialog");
Page({
    data: {
        slideImg: ['../../static/slide1.jpg', '../../static/slide2.jpg'],
        imgIndex: 0,
        people: [],
        position: [],
        url: '',
        random: []
    },
    onLoad: function () {
        wx.cloud.init();
    },
    rightImag: function () {
        var imgIndex = this.data.imgIndex;
        var imgLength = this.data.slideImg.length;
        if (imgIndex + 1 >= imgLength) {
            this.setData({
                imgIndex: 0
            });
        }
        else {
            this.setData({
                imgIndex: imgIndex + 1
            });
        }
    },
    leftImag: function () {
        var imgIndex = this.data.imgIndex;
        var imgLength = this.data.slideImg.length;
        if (imgIndex - 1 < 0) {
            this.setData({
                imgIndex: imgLength - 1
            });
        }
        else {
            this.setData({
                imgIndex: imgIndex - 1
            });
        }
    },
    tablify: function (tableName) {
        var _this = this;
        wx.chooseMessageFile({
            count: 1,
            success: function (res) {
                console.log(res);
                var path = res.tempFiles[0].path;
                var cloudPath = 'req_' + tableName + new Date().getTime() + '.' + path.split('.').pop();
                wx.showLoading({
                    title: '加载中...'
                });
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: path,
                    success: function (res) {
                        wx.cloud.callFunction({
                            name: 'parser',
                            data: { action: 'objectfy', fileId: res.fileID },
                            success: function (res) {
                                console.log('callFunction test result: ', res);
                                if (res.result.ok) {
                                    wx.hideLoading();
                                    if (tableName == 'people') {
                                        _this.setData({
                                            people: res.result.data
                                        });
                                    }
                                    if (tableName == 'position') {
                                        _this.setData({
                                            position: res.result.data
                                        });
                                    }
                                }
                            },
                            fail: function (err) {
                                wx.hideLoading();
                                console.log(err);
                            }
                        });
                    },
                    fail: function (err) {
                        wx.hideLoading();
                        console.log('上传文件失败', err);
                        wx.showToast({
                            title: '上传文件失败',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                });
            }
        });
    },
    clickleftimport: function () {
        this.tablify('people');
    },
    clickrightimport: function () {
        this.tablify('position');
    },
    randomassign: function () {
        var _this = this;
        wx.showLoading({
            title: '加载中...'
        });
        if (!this.data.people || !this.data.position) {
            wx.hideLoading();
            wx.showToast({
                title: '还未选择文件',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        var positions = [];
        for (var i = 0; i < this.data.position.length; i++) {
            for (var j = 0; j < Number(this.data.position[i].number); j++) {
                positions.push(this.data.position[i].position);
            }
        }
        console.log('postions', positions);
        if (positions.length !== this.data.people.length) {
            wx.hideLoading();
            wx.showToast({
                title: '员工数量与岗位数量不匹配',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        var randomPeople = this.data.people;
        for (var i = 0; i < randomPeople.length; i++) {
            var randomIndex = Math.floor(Math.random() * (randomPeople.length - 1));
            var temp = randomPeople[i];
            randomPeople[i] = randomPeople[randomIndex];
            randomPeople[randomIndex] = temp;
        }
        for (var i = 0; i < randomPeople.length; i++) {
            randomPeople[i].position = positions[i];
        }
        wx.cloud.callFunction({
            name: 'parser',
            data: { action: 'tablify', obj: randomPeople, fileName: "res.xlsx" },
            success: function (res) {
                console.log('callFunction test result: ', res);
                if (res.result.ok) {
                    wx.hideLoading();
                    _this.setData({
                        url: res.result.data.fileList[0].tempFileURL,
                        random: randomPeople
                    }, function () {
                        wx.pageScrollTo({
                            duration: 1000,
                            selector: '.saveurl'
                        });
                    });
                }
            },
            fail: function (res) {
                wx.hideLoading();
                console.log(res);
            }
        });
    },
    copyclick: function () {
        var _this = this;
        if (dialog_1.default.alert) {
            dialog_1.default.alert({
                title: '保存结果',
                message: "点击确认复制下载链接，到浏览器打开",
            }).then(function () {
                wx.setClipboardData({
                    data: _this.data.url,
                    success: function () {
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
        }
        if (dialog_1.default.close) {
            dialog_1.default.close();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHdFQUFvRTtBQUVwRSxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUM7UUFDSCxRQUFRLEVBQUMsQ0FBQyx5QkFBeUIsRUFBQyx5QkFBeUIsQ0FBQztRQUM5RCxRQUFRLEVBQUMsQ0FBQztRQUNWLE1BQU0sRUFBQyxFQUFTO1FBQ2hCLFFBQVEsRUFBQyxFQUFTO1FBQ2xCLEdBQUcsRUFBQyxFQUFFO1FBQ04sTUFBTSxFQUFDLEVBQVM7S0FDakI7SUFDRCxNQUFNO1FBQ0osRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUVqQixDQUFDO0lBQ0QsU0FBUztRQUNQLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQTtRQUN6QyxJQUFJLFFBQVEsR0FBQyxDQUFDLElBQUUsU0FBUyxFQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFDLENBQUM7YUFDWCxDQUFDLENBQUE7U0FDSDthQUFJO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUMsUUFBUSxHQUFDLENBQUM7YUFDcEIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQTtRQUN6QyxJQUFJLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUMsU0FBUyxHQUFDLENBQUM7YUFDckIsQ0FB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Q29udGVudCI6WyIvLyBpbmRleC50c1xyXG4vLyDojrflj5blupTnlKjlrp7kvotcclxuXHJcbmltcG9ydCAgRGlhbG9nICBmcm9tICcuLi8uLi9taW5pcHJvZ3JhbV9tb2R1bGVzL0B2YW50L2RpYWxvZy9kaWFsb2cnXHJcblxyXG5QYWdlKHtcclxuICBkYXRhOntcclxuICAgIHNsaWRlSW1nOlsnLi4vLi4vc3RhdGljL3NsaWRlMS5qcGcnLCcuLi8uLi9zdGF0aWMvc2xpZGUyLmpwZyddLFxyXG4gICAgaW1nSW5kZXg6MCxcclxuICAgIHBlb3BsZTpbXSBhcyBhbnksXHJcbiAgICBwb3NpdGlvbjpbXSBhcyBhbnksXHJcbiAgICB1cmw6JycsXHJcbiAgICByYW5kb206W10gYXMgYW55XHJcbiAgfSxcclxuICBvbkxvYWQoKXtcclxuICAgIHd4LmNsb3VkLmluaXQoKVxyXG4gICAgLy8gc2V0SW50ZXJ2YWwodGhpcy5yaWdodEltYWcsNTAwMClcclxuICB9LFxyXG4gIHJpZ2h0SW1hZygpe1xyXG4gICAgbGV0IGltZ0luZGV4ID0gdGhpcy5kYXRhLmltZ0luZGV4XHJcbiAgICBsZXQgaW1nTGVuZ3RoID0gdGhpcy5kYXRhLnNsaWRlSW1nLmxlbmd0aFxyXG4gICAgaWYgKGltZ0luZGV4KzE+PWltZ0xlbmd0aCl7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW1nSW5kZXg6MFxyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgaW1nSW5kZXg6aW1nSW5kZXgrMVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGVmdEltYWcoKXtcclxuICAgIGxldCBpbWdJbmRleCA9IHRoaXMuZGF0YS5pbWdJbmRleFxyXG4gICAgbGV0IGltZ0xlbmd0aCA9IHRoaXMuZGF0YS5zbGlkZUltZy5sZW5ndGhcclxuICAgIGlmIChpbWdJbmRleC0xPDApe1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGltZ0luZGV4OmltZ0xlbmd0aC0xXHJcbiAgICAgIH0pXHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpbWdJbmRleDppbWdJbmRleC0xXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICB0YWJsaWZ5KHRhYmxlTmFtZTpzdHJpbmcpe1xyXG4gICAgd3guY2hvb3NlTWVzc2FnZUZpbGUoe1xyXG4gICAgICBjb3VudDoxLFxyXG4gICAgICBzdWNjZXNzOihyZXM6YW55KT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgbGV0IHBhdGggPSByZXMudGVtcEZpbGVzWzBdLnBhdGhcclxuICAgICAgICBjb25zdCBjbG91ZFBhdGggPSAncmVxXycgKyB0YWJsZU5hbWUgICsgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLicgKyAgcGF0aC5zcGxpdCgnLicpLnBvcCgpXHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6J+WKoOi9veS4rS4uLidcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4LmNsb3VkLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgY2xvdWRQYXRoOiBjbG91ZFBhdGgsXHJcbiAgICAgICAgICBmaWxlUGF0aDpwYXRoLFxyXG4gICAgICAgICAgc3VjY2VzczogKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIHd4LmNsb3VkLmNhbGxGdW5jdGlvbih7XHJcbiAgICAgICAgICAgICAgbmFtZTogJ3BhcnNlcicsIFxyXG4gICAgICAgICAgICAgIGRhdGE6e2FjdGlvbjonb2JqZWN0ZnknLGZpbGVJZDogcmVzLmZpbGVJRH0sXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlczphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsRnVuY3Rpb24gdGVzdCByZXN1bHQ6ICcsIHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMucmVzdWx0Lm9rKXtcclxuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICBpZiAodGFibGVOYW1lPT0ncGVvcGxlJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgIHBlb3BsZTogcmVzLnJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBpZiAodGFibGVOYW1lPT0ncG9zaXRpb24nKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHJlcy5yZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGZhaWw6KGVycjphbnkpPT57XHJcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOihlcnI6YW55KT0+e1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKDmlofku7blpLHotKUnLGVycik7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6J+S4iuS8oOaWh+S7tuWksei0pScsXHJcbiAgICAgICAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBjbGlja2xlZnRpbXBvcnQoKXtcclxuICAgdGhpcy50YWJsaWZ5KCdwZW9wbGUnKVxyXG4gIH0sXHJcbiAgY2xpY2tyaWdodGltcG9ydCgpe1xyXG4gICAgdGhpcy50YWJsaWZ5KCdwb3NpdGlvbicpXHJcbiAgfSxcclxuXHJcbiAgcmFuZG9tYXNzaWduKCl7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOifliqDovb3kuK0uLi4nXHJcbiAgICB9KVxyXG4gICAgaWYgKCF0aGlzLmRhdGEucGVvcGxlIHx8ICF0aGlzLmRhdGEucG9zaXRpb24pe1xyXG4gICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6J+i/mOacqumAieaLqeaWh+S7ticsXHJcbiAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGxldCBwb3NpdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZGF0YS5wb3NpdGlvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPE51bWJlcih0aGlzLmRhdGEucG9zaXRpb25baV0ubnVtYmVyKTsgaisrKXtcclxuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuZGF0YS5wb3NpdGlvbltpXS5wb3NpdGlvbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygncG9zdGlvbnMnLHBvc2l0aW9ucyk7XHJcbiAgICBcclxuICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoICE9PSB0aGlzLmRhdGEucGVvcGxlLmxlbmd0aCl7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTon5ZGY5bel5pWw6YeP5LiO5bKX5L2N5pWw6YeP5LiN5Yy56YWNJyxcclxuICAgICAgICBpY29uOidub25lJyxcclxuICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGxldCByYW5kb21QZW9wbGUgPSB0aGlzLmRhdGEucGVvcGxlXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8cmFuZG9tUGVvcGxlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHJhbmRvbVBlb3BsZS5sZW5ndGgtMSkpXHJcbiAgICAgIGNvbnN0IHRlbXAgPSByYW5kb21QZW9wbGVbaV1cclxuICAgICAgcmFuZG9tUGVvcGxlW2ldID0gcmFuZG9tUGVvcGxlW3JhbmRvbUluZGV4XVxyXG4gICAgICByYW5kb21QZW9wbGVbcmFuZG9tSW5kZXhdID0gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGk9MDsgaTxyYW5kb21QZW9wbGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICByYW5kb21QZW9wbGVbaV0ucG9zaXRpb24gPSBwb3NpdGlvbnNbaV1cclxuICAgIH1cclxuXHJcbiAgICB3eC5jbG91ZC5jYWxsRnVuY3Rpb24oe1xyXG4gICAgICBuYW1lOiAncGFyc2VyJywgXHJcbiAgICAgIGRhdGE6e2FjdGlvbjondGFibGlmeScsb2JqOiByYW5kb21QZW9wbGUsZmlsZU5hbWU6XCJyZXMueGxzeFwifSxcclxuICAgICAgc3VjY2VzczogKHJlczphbnkpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FsbEZ1bmN0aW9uIHRlc3QgcmVzdWx0OiAnLCByZXMpXHJcbiAgICAgICAgaWYgKHJlcy5yZXN1bHQub2spe1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXJsOnJlcy5yZXN1bHQuZGF0YS5maWxlTGlzdFswXS50ZW1wRmlsZVVSTCxcclxuICAgICAgICAgICAgcmFuZG9tOnJhbmRvbVBlb3BsZVxyXG4gICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOjEwMDAsXHJcbiAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zYXZldXJsJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6KHJlczphbnkpPT57XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBjb3B5Y2xpY2soKXtcclxuICAgIGlmIChEaWFsb2cuYWxlcnQpe1xyXG4gICAgICBEaWFsb2cuYWxlcnQoe1xyXG4gICAgICAgIHRpdGxlOiAn5L+d5a2Y57uT5p6cJyxcclxuICAgICAgICBtZXNzYWdlOlwi54K55Ye756Gu6K6k5aSN5Yi25LiL6L296ZO+5o6l77yM5Yiw5rWP6KeI5Zmo5omT5byAXCIsXHJcbiAgICAgIH0pLnRoZW4oKCk9PntcclxuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcclxuICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS51cmwsXHJcbiAgICAgICAgICBzdWNjZXNzOiAoKT0+e1xyXG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKSAvLyBkYXRhXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6KGU6YW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmKERpYWxvZy5jbG9zZSl7XHJcbiAgICAgIERpYWxvZy5jbG9zZSgpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXX0=
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cloud = require('wx-server-sdk');
var XLSX = require('xlsx');
var path = require('path');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
exports.main = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(event);
                _a = event.action;
                switch (_a) {
                    case 'objectfy': return [3, 1];
                    case 'tablify': return [3, 3];
                }
                return [3, 5];
            case 1: return [4, objectfy(event)];
            case 2: return [2, _b.sent()];
            case 3: return [4, tablify(event)];
            case 4: return [2, _b.sent()];
            case 5: return [2, { ok: false, msg: '没有此云函数' }];
        }
    });
}); };
function objectfy(event) {
    return __awaiter(this, void 0, void 0, function () {
        var fileId, File, FileBuffer, WB, WJ;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileId = event.fileId;
                    return [4, cloud.downloadFile({
                            fileID: fileId,
                        })];
                case 1:
                    File = _a.sent();
                    FileBuffer = File.fileContent;
                    WB = XLSX.read(FileBuffer);
                    WJ = XLSX.utils.sheet_to_json(WB.Sheets[WB.SheetNames[0]]);
                    return [2, {
                            ok: true,
                            data: WJ
                        }];
            }
        });
    });
}
function tablify(event) {
    return __awaiter(this, void 0, void 0, function () {
        var obj, fileName, res_wb, res_buffer, res_upload, fileList, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    obj = event.obj, fileName = event.fileName;
                    res_wb = {
                        Sheets: {
                            sheet1: XLSX.utils.json_to_sheet(obj)
                        },
                        SheetNames: ['sheet1']
                    };
                    res_buffer = XLSX.write(res_wb, {
                        type: 'buffer'
                    });
                    return [4, cloud.uploadFile({
                            cloudPath: 'res_position_' + new Date().getTime() + fileName,
                            fileContent: res_buffer,
                        })];
                case 1:
                    res_upload = _a.sent();
                    console.log(res_upload);
                    fileList = [res_upload.fileID];
                    return [4, cloud.getTempFileURL({
                            fileList: fileList,
                        })];
                case 2:
                    result = _a.sent();
                    return [2, {
                            ok: true,
                            data: result
                        }];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFNUIsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNULEdBQUcsRUFBRSxLQUFLLENBQUMsbUJBQW1CO0NBQy9CLENBQUMsQ0FBQTtBQWdCRixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQU8sS0FBUzs7Ozs7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ1gsS0FBQSxLQUFLLENBQUMsTUFBTSxDQUFBOzt5QkFDYixVQUFVLENBQUMsQ0FBWCxjQUFVO3lCQUNWLFNBQVMsQ0FBQyxDQUFWLGNBQVM7OztvQkFEVSxXQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQTtvQkFBNUIsV0FBTyxTQUFxQixFQUFDO29CQUN2QixXQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQTtvQkFBM0IsV0FBTyxTQUFvQixFQUFDO29CQUNuQyxXQUFPLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUE7OztLQUcxQyxDQUFBO0FBRUQsU0FBZSxRQUFRLENBQUMsS0FBUzs7Ozs7O29CQUN6QixNQUFNLEdBQUssS0FBSyxPQUFWLENBQVU7b0JBQ1QsV0FBTSxLQUFLLENBQUMsWUFBWSxDQUFDOzRCQUNwQyxNQUFNLEVBQUUsTUFBTTt5QkFDZixDQUFDLEVBQUE7O29CQUZJLElBQUksR0FBRyxTQUVYO29CQUVJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO29CQUM3QixFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDMUIsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBRWhFLFdBQU87NEJBQ0wsRUFBRSxFQUFDLElBQUk7NEJBQ1AsSUFBSSxFQUFDLEVBQUU7eUJBQ1IsRUFBQTs7OztDQUNGO0FBRUQsU0FBZSxPQUFPLENBQUMsS0FBUzs7Ozs7O29CQUN4QixHQUFHLEdBQWUsS0FBSyxJQUFwQixFQUFFLFFBQVEsR0FBSyxLQUFLLFNBQVYsQ0FBVTtvQkFFdkIsTUFBTSxHQUFHO3dCQUNiLE1BQU0sRUFBQzs0QkFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO3lCQUN4Qzt3QkFDRCxVQUFVLEVBQUMsQ0FBQyxRQUFRLENBQUM7cUJBQ3RCLENBQUE7b0JBQ0ssVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO3dCQUMvQixJQUFJLEVBQUMsUUFBUTtxQkFDaEIsQ0FBQyxDQUFBO29CQUVlLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQzs0QkFDeEMsU0FBUyxFQUFFLGVBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVE7NEJBQzVELFdBQVcsRUFBRSxVQUFVO3lCQUN4QixDQUFDLEVBQUE7O29CQUhJLFVBQVUsR0FBRyxTQUdqQjtvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNsQixRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3JCLFdBQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQzs0QkFDeEMsUUFBUSxFQUFFLFFBQVE7eUJBQ25CLENBQUMsRUFBQTs7b0JBRkksTUFBTSxHQUFHLFNBRWI7b0JBQ0YsV0FBTzs0QkFDTCxFQUFFLEVBQUMsSUFBSTs0QkFDUCxJQUFJLEVBQUMsTUFBTTt5QkFDWixFQUFBOzs7O0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkupHlh73mlbDlhaXlj6Pmlofku7ZcclxuY29uc3QgY2xvdWQgPSByZXF1aXJlKCd3eC1zZXJ2ZXItc2RrJylcclxuY29uc3QgWExTWCA9IHJlcXVpcmUoJ3hsc3gnKVxyXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXHJcblxyXG5jbG91ZC5pbml0KHtcclxuICBlbnY6IGNsb3VkLkRZTkFNSUNfQ1VSUkVOVF9FTlZcclxufSlcclxuXHJcbi8vIGRhdGE6IHtcclxuLy8gICBwZW9wbGVGaWxlSUQ6JycsXHJcbi8vICAgcGVvcGxlRmlsZU5hbWU6JycsXHJcbi8vICAgY2FyRmlsZUlEOicnLFxyXG4vLyAgIGNhckZpbGVOYW1lOicnXHJcbi8vIH0sXHJcblxyXG4vKipcclxuICog6KGo57uT5p6E77yaXHJcbiAqIGlkIG5hbWVcclxuICogcG9zaXRpb24gbnVtYmVyXHJcbiAqL1xyXG5cclxuLy8g5LqR5Ye95pWw5YWl5Y+j5Ye95pWwXHJcbmV4cG9ydHMubWFpbiA9IGFzeW5jIChldmVudDphbnkpID0+IHtcclxuICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgc3dpdGNoIChldmVudC5hY3Rpb24pe1xyXG4gICAgY2FzZSAnb2JqZWN0ZnknOiByZXR1cm4gYXdhaXQgb2JqZWN0ZnkoZXZlbnQpO1xyXG4gICAgY2FzZSAndGFibGlmeSc6IHJldHVybiBhd2FpdCB0YWJsaWZ5KGV2ZW50KTtcclxuICAgIGRlZmF1bHQ6IHJldHVybiB7b2s6ZmFsc2UsbXNnOifmsqHmnInmraTkupHlh73mlbAnfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG9iamVjdGZ5KGV2ZW50OmFueSl7XHJcbiAgbGV0IHsgZmlsZUlkIH0gPSBldmVudFxyXG4gIGNvbnN0IEZpbGUgPSBhd2FpdCBjbG91ZC5kb3dubG9hZEZpbGUoe1xyXG4gICAgZmlsZUlEOiBmaWxlSWQsXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgRmlsZUJ1ZmZlciA9IEZpbGUuZmlsZUNvbnRlbnRcclxuICBjb25zdCBXQiA9IFhMU1gucmVhZChGaWxlQnVmZmVyKVxyXG4gIGNvbnN0IFdKID0gWExTWC51dGlscy5zaGVldF90b19qc29uKFdCLlNoZWV0c1tXQi5TaGVldE5hbWVzWzBdXSlcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9rOnRydWUsXHJcbiAgICBkYXRhOldKXHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB0YWJsaWZ5KGV2ZW50OmFueSl7XHJcbiAgbGV0IHsgb2JqLCBmaWxlTmFtZSB9ID0gZXZlbnRcclxuXHJcbiAgY29uc3QgcmVzX3diID0ge1xyXG4gICAgU2hlZXRzOntcclxuICAgICAgICBzaGVldDE6IFhMU1gudXRpbHMuanNvbl90b19zaGVldChvYmopXHJcbiAgICB9LFxyXG4gICAgU2hlZXROYW1lczpbJ3NoZWV0MSddXHJcbiAgfVxyXG4gIGNvbnN0IHJlc19idWZmZXIgPSBYTFNYLndyaXRlKHJlc193Yix7XHJcbiAgICAgICAgdHlwZTonYnVmZmVyJ1xyXG4gICAgfSlcclxuXHJcbiAgY29uc3QgcmVzX3VwbG9hZCA9IGF3YWl0IGNsb3VkLnVwbG9hZEZpbGUoe1xyXG4gICAgY2xvdWRQYXRoOiAncmVzX3Bvc2l0aW9uXycgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIGZpbGVOYW1lLFxyXG4gICAgZmlsZUNvbnRlbnQ6IHJlc19idWZmZXIsXHJcbiAgfSlcclxuICBjb25zb2xlLmxvZyhyZXNfdXBsb2FkKTtcclxuICBjb25zdCBmaWxlTGlzdCA9IFtyZXNfdXBsb2FkLmZpbGVJRF1cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbG91ZC5nZXRUZW1wRmlsZVVSTCh7XHJcbiAgICBmaWxlTGlzdDogZmlsZUxpc3QsXHJcbiAgfSlcclxuICByZXR1cm4ge1xyXG4gICAgb2s6dHJ1ZSxcclxuICAgIGRhdGE6cmVzdWx0XHJcbiAgfVxyXG59Il19
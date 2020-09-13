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
    var peopleFileID, peopleFileName, carFileID, peopleFile, carFile, peopleFileBuffer, carFileBuffer, peopleWB, carWB, peopleWJ, carWJ, i, randomIndex, temp, positions, i, j, i, res_wb, res_buffer, res_upload, fileList, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(event);
                peopleFileID = event.peopleFileID, peopleFileName = event.peopleFileName, carFileID = event.carFileID;
                return [4, cloud.downloadFile({
                        fileID: peopleFileID,
                    })];
            case 1:
                peopleFile = _a.sent();
                return [4, cloud.downloadFile({
                        fileID: carFileID,
                    })];
            case 2:
                carFile = _a.sent();
                peopleFileBuffer = peopleFile.fileContent;
                carFileBuffer = carFile.fileContent;
                peopleWB = XLSX.read(peopleFileBuffer);
                carWB = XLSX.read(carFileBuffer);
                peopleWJ = XLSX.utils.sheet_to_json(peopleWB.Sheets[peopleWB.SheetNames[0]]);
                carWJ = XLSX.utils.sheet_to_json(carWB.Sheets[carWB.SheetNames[0]]);
                if (peopleWJ.length) {
                    for (i = 0; i < peopleWJ.length; i++) {
                        randomIndex = Math.floor(Math.random() * (peopleWJ.length - 1));
                        temp = peopleWJ[i];
                        peopleWJ[i] = peopleWJ[randomIndex];
                        peopleWJ[randomIndex] = temp;
                    }
                }
                console.log('carWJ', carWJ);
                positions = [];
                for (i = 0; i < carWJ.length; i++) {
                    for (j = 0; j < Number(carWJ[i].number); j++) {
                        positions.push(carWJ[i].position);
                    }
                }
                console.log('postions', positions);
                console.log('peopleWJ', peopleWJ);
                if (positions.length !== peopleWJ.length) {
                    return [2, {
                            errMsg: '员工数量与岗位数量不匹配'
                        }];
                }
                for (i = 0; i < peopleWJ.length; i++) {
                    peopleWJ[i].position = positions[i];
                }
                console.log('peopleWJ', peopleWJ);
                res_wb = {
                    Sheets: {
                        sheet1: XLSX.utils.json_to_sheet(peopleWJ)
                    },
                    SheetNames: ['sheet1']
                };
                res_buffer = XLSX.write(res_wb, {
                    type: 'buffer'
                });
                return [4, cloud.uploadFile({
                        cloudPath: 'res_position_' + peopleFileName,
                        res_buffer: res_buffer,
                        fileContent: res_buffer,
                    })];
            case 3:
                res_upload = _a.sent();
                console.log(res_upload);
                fileList = [res_upload.fileID];
                return [4, cloud.getTempFileURL({
                        fileList: fileList,
                    })];
            case 4:
                result = _a.sent();
                return [2, result];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFNUIsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNULEdBQUcsRUFBRSxLQUFLLENBQUMsbUJBQW1CO0NBQy9CLENBQUMsQ0FBQTtBQWdCRixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQU8sS0FBUzs7Ozs7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWIsWUFBWSxHQUErQixLQUFLLGFBQXBDLEVBQUUsY0FBYyxHQUFlLEtBQUssZUFBcEIsRUFBRSxTQUFTLEdBQUksS0FBSyxVQUFULENBQVM7Z0JBQ25DLFdBQU0sS0FBSyxDQUFDLFlBQVksQ0FBQzt3QkFDMUMsTUFBTSxFQUFFLFlBQVk7cUJBQ3JCLENBQUMsRUFBQTs7Z0JBRkksVUFBVSxHQUFHLFNBRWpCO2dCQUNjLFdBQU0sS0FBSyxDQUFDLFlBQVksQ0FBQzt3QkFDdkMsTUFBTSxFQUFFLFNBQVM7cUJBQ2xCLENBQUMsRUFBQTs7Z0JBRkksT0FBTyxHQUFHLFNBRWQ7Z0JBQ0ksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQTtnQkFDekMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUE7Z0JBQ25DLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7Z0JBQ3RDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUNoQyxRQUFRLEdBQUcsSUFBSSxDQUFD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Qzt3QkFDeEMsUUFBUSxFQUFFLFFBQVE7cUJBQ25CLENBQUMsRUFBQTs7Z0JBRkksTUFBTSxHQUFHLFNBRWI7Z0JBQ0YsV0FBTyxNQUFNLEVBQUE7OztLQUNkLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkupHlh73mlbDlhaXlj6Pmlofku7ZcclxuY29uc3QgY2xvdWQgPSByZXF1aXJlKCd3eC1zZXJ2ZXItc2RrJylcclxuY29uc3QgWExTWCA9IHJlcXVpcmUoJ3hsc3gnKVxyXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXHJcblxyXG5jbG91ZC5pbml0KHtcclxuICBlbnY6IGNsb3VkLkRZTkFNSUNfQ1VSUkVOVF9FTlZcclxufSlcclxuXHJcbi8vIGRhdGE6IHtcclxuLy8gICBwZW9wbGVGaWxlSUQ6JycsXHJcbi8vICAgcGVvcGxlRmlsZU5hbWU6JycsXHJcbi8vICAgY2FyRmlsZUlEOicnLFxyXG4vLyAgIGNhckZpbGVOYW1lOicnXHJcbi8vIH0sXHJcblxyXG4vKipcclxuICog6KGo57uT5p6E77yaXHJcbiAqIGlkIG5hbWVcclxuICogcG9zaXRpb24gbnVtYmVyXHJcbiAqL1xyXG5cclxuLy8g5LqR5Ye95pWw5YWl5Y+j5Ye95pWwXHJcbmV4cG9ydHMubWFpbiA9IGFzeW5jIChldmVudDphbnkpID0+IHtcclxuICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgXHJcbiAgbGV0IHsgcGVvcGxlRmlsZUlELCBwZW9wbGVGaWxlTmFtZSwgY2FyRmlsZUlEfSA9IGV2ZW50XHJcbiAgY29uc3QgcGVvcGxlRmlsZSA9IGF3YWl0IGNsb3VkLmRvd25sb2FkRmlsZSh7XHJcbiAgICBmaWxlSUQ6IHBlb3BsZUZpbGVJRCxcclxuICB9KVxyXG4gIGNvbnN0IGNhckZpbGUgPSBhd2FpdCBjbG91ZC5kb3dubG9hZEZpbGUoe1xyXG4gICAgZmlsZUlEOiBjYXJGaWxlSUQsXHJcbiAgfSlcclxuICBjb25zdCBwZW9wbGVGaWxlQnVmZmVyID0gcGVvcGxlRmlsZS5maWxlQ29udGVudFxyXG4gIGNvbnN0IGNhckZpbGVCdWZmZXIgPSBjYXJGaWxlLmZpbGVDb250ZW50XHJcbiAgY29uc3QgcGVvcGxlV0IgPSBYTFNYLnJlYWQocGVvcGxlRmlsZUJ1ZmZlcilcclxuICBjb25zdCBjYXJXQiA9IFhMU1gucmVhZChjYXJGaWxlQnVmZmVyKVxyXG4gIGNvbnN0IHBlb3BsZVdKID0gWExTWC51dGlscy5zaGVldF90b19qc29uKHBlb3BsZVdCLlNoZWV0c1twZW9wbGVXQi5TaGVldE5hbWVzWzBdXSlcclxuICBjb25zdCBjYXJXSiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fanNvbihjYXJXQi5TaGVldHNbY2FyV0IuU2hlZXROYW1lc1swXV0pXHJcbiAgaWYgKHBlb3BsZVdKLmxlbmd0aCl7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8cGVvcGxlV0oubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihwZW9wbGVXSi5sZW5ndGgtMSkpXHJcbiAgICAgICAgY29uc3QgdGVtcCA9IHBlb3BsZVdKW2ldXHJcbiAgICAgICAgcGVvcGxlV0pbaV0gPSBwZW9wbGVXSltyYW5kb21JbmRleF1cclxuICAgICAgICBwZW9wbGVXSltyYW5kb21JbmRleF0gPSB0ZW1wXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKCdjYXJXSicsY2FyV0opO1xyXG4gIFxyXG4gIGxldCBwb3NpdGlvbnMgPSBbXVxyXG4gIGZvciAobGV0IGk9MDsgaTxjYXJXSi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGZvciAobGV0IGo9MDsgajxOdW1iZXIoY2FyV0pbaV0ubnVtYmVyKTsgaisrKXtcclxuICAgICAgICBwb3NpdGlvbnMucHVzaChjYXJXSltpXS5wb3NpdGlvbilcclxuICAgICAgfVxyXG4gIH1cclxuICBjb25zb2xlLmxvZygncG9zdGlvbnMnLHBvc2l0aW9ucyk7XHJcbiAgY29uc29sZS5sb2coJ3Blb3BsZVdKJyxwZW9wbGVXSik7XHJcbiAgXHJcbiAgaWYgKHBvc2l0aW9ucy5sZW5ndGggIT09IHBlb3BsZVdKLmxlbmd0aCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlcnJNc2c6J+WRmOW3peaVsOmHj+S4juWyl+S9jeaVsOmHj+S4jeWMuemFjSdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAobGV0IGk9MDsgaTxwZW9wbGVXSi5sZW5ndGg7IGkrKyl7XHJcbiAgICBwZW9wbGVXSltpXS5wb3NpdGlvbiA9IHBvc2l0aW9uc1tpXVxyXG4gIH1cclxuICBjb25zb2xlLmxvZygncGVvcGxlV0onLHBlb3BsZVdKKTtcclxuICBjb25zdCByZXNfd2IgPSB7XHJcbiAgICBTaGVldHM6e1xyXG4gICAgICAgIHNoZWV0MTogWExTWC51dGlscy5qc29uX3RvX3NoZWV0KHBlb3BsZVdKKVxyXG4gICAgfSxcclxuICAgIFNoZWV0TmFtZXM6WydzaGVldDEnXVxyXG59XHJcbiAgY29uc3QgcmVzX2J1ZmZlciA9IFhMU1gud3JpdGUocmVzX3diLHtcclxuICAgICAgICB0eXBlOididWZmZXInXHJcbiAgICB9KVxyXG5cclxuICBjb25zdCByZXNfdXBsb2FkID0gYXdhaXQgY2xvdWQudXBsb2FkRmlsZSh7XHJcbiAgICBjbG91ZFBhdGg6ICdyZXNfcG9zaXRpb25fJyArIHBlb3BsZUZpbGVOYW1lLCByZXNfYnVmZmVyLFxyXG4gICAgZmlsZUNvbnRlbnQ6IHJlc19idWZmZXIsXHJcbiAgfSlcclxuICBjb25zb2xlLmxvZyhyZXNfdXBsb2FkKTtcclxuICBjb25zdCBmaWxlTGlzdCA9IFtyZXNfdXBsb2FkLmZpbGVJRF1cclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbG91ZC5nZXRUZW1wRmlsZVVSTCh7XHJcbiAgICBmaWxlTGlzdDogZmlsZUxpc3QsXHJcbiAgfSlcclxuICByZXR1cm4gcmVzdWx0XHJcbn0iXX0=
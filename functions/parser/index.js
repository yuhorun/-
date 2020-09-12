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
    var peopleFileID, peopleFileName, carFileID, carFileName, peopleFile, carFile, peopleFileBuffer, carFileBuffer, peopleWB, carWB, peopleWJ, carWJ, i, randomIndex, temp, postions, i, j, res_wb, res_buffer, res_upload, fileList, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(event);
                peopleFileID = event.peopleFileID, peopleFileName = event.peopleFileName, carFileID = event.carFileID, carFileName = event.carFileName;
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
                postions = [];
                for (i = 0; i < carWJ.length; i++) {
                    for (j = 0; j < Number(carWJ.number); j++) {
                        postions.push(carWJ.positon);
                    }
                }
                if (postions.length !== peopleWJ.length) {
                    return [2, {
                            errMsg: ''
                        }];
                }
                res_wb = {
                    Sheets: {
                        sheet1: XLSX.utils.json_to_sheet(wj)
                    },
                    SheetNames: ['sheet1']
                };
                res_buffer = XLSX.write(res_wb, {
                    type: 'buffer'
                });
                return [4, cloud.uploadFile({
                        cloudPath: 'res_' + fileName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFNUIsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNULEdBQUcsRUFBRSxLQUFLLENBQUMsbUJBQW1CO0NBQy9CLENBQUMsQ0FBQTtBQWdCRixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQU8sS0FBUzs7Ozs7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWIsWUFBWSxHQUE0QyxLQUFLLGFBQWpELEVBQUUsY0FBYyxHQUE0QixLQUFLLGVBQWpDLEVBQUUsU0FBUyxHQUFpQixLQUFLLFVBQXRCLEVBQUUsV0FBVyxHQUFJLEtBQUssWUFBVCxDQUFTO2dCQUNoRCxXQUFNLEtBQUssQ0FBQyxZQUFZLENBQUM7d0JBQzFDLE1BQU0sRUFBRSxZQUFZO3FCQUNyQixDQUFDLEVBQUE7O2dCQUZJLFVBQVUsR0FBRyxTQUVqQjtnQkFDYyxXQUFNLEtBQUssQ0FBQyxZQUFZLENBQUM7d0JBQ3ZDLE1BQU0sRUFBRSxTQUFTO3FCQUNsQixDQUFDLEVBQUE7O2dCQUZJLE9BQU8sR0FBRyxTQUVkO2dCQUNJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUE7Z0JBQ3pDLGFBQWEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFBO2dCQUNuQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2dCQUN0QyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzVFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6RSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUM7b0JBQ2xCLEtBQVMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDM0IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUMzRCxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUN4QixRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3dCQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFBO3FCQUMvQjtpQkFDRjtnQkFDRyxRQUFRLEdBQUcsRUFBRSxDQUFBO2dCQUNqQixLQUFTLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQzlCLEtBQVMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7cUJBQzdCO2lCQUNKO2dCQUNELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFDO29CQUN0QyxXQUFPOzRCQUNMLE1BQU0sRUFBQyxFQUFFO3lCQUNWLEVBQUE7aUJBQ0Y7Z0JBQ0ssTUFBTSxHQUFHO29CQUNiLE1BQU0sRUFBQzt3QkFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO3FCQUN2QztvQkFDRCxVQUFVLEVBQUMsQ0FBQyxRQUFRLENBQUM7aUJBQ3hCLENBQUE7Z0JBQ08sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO29CQUMvQixJQUFJLEVBQUMsUUFBUTtpQkFDaEIsQ0FBQyxDQUFBO2dCQUVlLFdBQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQzt3QkFDeEMsU0FBUyxFQUFFLE1BQU0sR0FBRyxRQUFRO3dCQUFFLFVBQVUsWUFBQTt3QkFDeEMsV0FBVyxFQUFFLFVBQVU7cUJBQ3hCLENBQUMsRUFBQTs7Z0JBSEksVUFBVSxHQUFHLFNBR2pCO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xCLFFBQVEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDckIsV0FBTSxLQUFLLENBQUMsY0FBYyxDQUFDO3dCQUN4QyxRQUFRLEVBQUUsUUFBUTtxQkFDbkIsQ0FBQyxFQUFBOztnQkFGSSxNQUFNLEdBQUcsU0FFYjtnQkFDRixXQUFPLE1BQU0sRUFBQTs7O0tBQ2QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOS6keWHveaVsOWFpeWPo+aWh+S7tlxuY29uc3QgY2xvdWQgPSByZXF1aXJlKCd3eC1zZXJ2ZXItc2RrJylcbmNvbnN0IFhMU1ggPSByZXF1aXJlKCd4bHN4JylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuY2xvdWQuaW5pdCh7XG4gIGVudjogY2xvdWQuRFlOQU1JQ19DVVJSRU5UX0VOVlxufSlcblxuLy8gZGF0YToge1xuLy8gICBwZW9wbGVGaWxlSUQ6JycsXG4vLyAgIHBlb3BsZUZpbGVOYW1lOicnLFxuLy8gICBjYXJGaWxlSUQ6JycsXG4vLyAgIGNhckZpbGVOYW1lOicnXG4vLyB9LFxuXG4vKipcbiAqIOihqOe7k+aehO+8mlxuICogaWQgbmFtZVxuICogcG9zaXRpb24gbnVtYmVyXG4gKi9cblxuLy8g5LqR5Ye95pWw5YWl5Y+j5Ye95pWwXG5leHBvcnRzLm1haW4gPSBhc3luYyAoZXZlbnQ6YW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgXG4gIGxldCB7IHBlb3BsZUZpbGVJRCwgcGVvcGxlRmlsZU5hbWUsIGNhckZpbGVJRCwgY2FyRmlsZU5hbWV9ID0gZXZlbnRcbiAgY29uc3QgcGVvcGxlRmlsZSA9IGF3YWl0IGNsb3VkLmRvd25sb2FkRmlsZSh7XG4gICAgZmlsZUlEOiBwZW9wbGVGaWxlSUQsXG4gIH0pXG4gIGNvbnN0IGNhckZpbGUgPSBhd2FpdCBjbG91ZC5kb3dubG9hZEZpbGUoe1xuICAgIGZpbGVJRDogY2FyRmlsZUlELFxuICB9KVxuICBjb25zdCBwZW9wbGVGaWxlQnVmZmVyID0gcGVvcGxlRmlsZS5maWxlQ29udGVudFxuICBjb25zdCBjYXJGaWxlQnVmZmVyID0gY2FyRmlsZS5maWxlQ29udGVudFxuICBjb25zdCBwZW9wbGVXQiA9IFhMU1gucmVhZChwZW9wbGVGaWxlQnVmZmVyKVxuICBjb25zdCBjYXJXQiA9IFhMU1gucmVhZChjYXJGaWxlQnVmZmVyKVxuICBjb25zdCBwZW9wbGVXSiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fanNvbihwZW9wbGVXQi5TaGVldHNbcGVvcGxlV0IuU2hlZXROYW1lc1swXV0pXG4gIGNvbnN0IGNhcldKID0gWExTWC51dGlscy5zaGVldF90b19qc29uKGNhcldCLlNoZWV0c1tjYXJXQi5TaGVldE5hbWVzWzBdXSlcbiAgaWYgKHBlb3BsZVdKLmxlbmd0aCl7XG4gICAgZm9yIChsZXQgaT0wOyBpPHBlb3BsZVdKLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHBlb3BsZVdKLmxlbmd0aC0xKSlcbiAgICAgICAgY29uc3QgdGVtcCA9IHBlb3BsZVdKW2ldXG4gICAgICAgIHBlb3BsZVdKW2ldID0gcGVvcGxlV0pbcmFuZG9tSW5kZXhdXG4gICAgICAgIHBlb3BsZVdKW3JhbmRvbUluZGV4XSA9IHRlbXBcbiAgICB9XG4gIH1cbiAgbGV0IHBvc3Rpb25zID0gW11cbiAgZm9yIChsZXQgaT0wOyBpPGNhcldKLmxlbmd0aDsgaSsrKXtcbiAgICAgIGZvciAobGV0IGo9MDsgajxOdW1iZXIoY2FyV0oubnVtYmVyKTsgaisrKXtcbiAgICAgICAgcG9zdGlvbnMucHVzaChjYXJXSi5wb3NpdG9uKVxuICAgICAgfVxuICB9XG4gIGlmIChwb3N0aW9ucy5sZW5ndGggIT09IHBlb3BsZVdKLmxlbmd0aCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVyck1zZzonJ1xuICAgIH1cbiAgfVxuICBjb25zdCByZXNfd2IgPSB7XG4gICAgU2hlZXRzOntcbiAgICAgICAgc2hlZXQxOiBYTFNYLnV0aWxzLmpzb25fdG9fc2hlZXQod2opXG4gICAgfSxcbiAgICBTaGVldE5hbWVzOlsnc2hlZXQxJ11cbn1cbiAgY29uc3QgcmVzX2J1ZmZlciA9IFhMU1gud3JpdGUocmVzX3diLHtcbiAgICAgICAgdHlwZTonYnVmZmVyJ1xuICAgIH0pXG5cbiAgY29uc3QgcmVzX3VwbG9hZCA9IGF3YWl0IGNsb3VkLnVwbG9hZEZpbGUoe1xuICAgIGNsb3VkUGF0aDogJ3Jlc18nICsgZmlsZU5hbWUsIHJlc19idWZmZXIsXG4gICAgZmlsZUNvbnRlbnQ6IHJlc19idWZmZXIsXG4gIH0pXG4gIGNvbnNvbGUubG9nKHJlc191cGxvYWQpO1xuICBjb25zdCBmaWxlTGlzdCA9IFtyZXNfdXBsb2FkLmZpbGVJRF1cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xvdWQuZ2V0VGVtcEZpbGVVUkwoe1xuICAgIGZpbGVMaXN0OiBmaWxlTGlzdCxcbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufSJdfQ==
// 云函数入口文件
const cloud = require('wx-server-sdk')
const XLSX = require('xlsx')
const path = require('path')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// data: {
//   peopleFileID:'',
//   peopleFileName:'',
//   carFileID:'',
//   carFileName:''
// },

/**
 * 表结构：
 * id name
 * position number
 */

// 云函数入口函数
exports.main = async (event:any) => {
  console.log(event);
  switch (event.action){
    case 'objectfy': return await objectfy(event);
    case 'tablify': return await tablify(event);
    default: return {ok:false,msg:'没有此云函数'}
  }

}

async function objectfy(event:any){
  let { fileId } = event
  const File = await cloud.downloadFile({
    fileID: fileId,
  })

  const FileBuffer = File.fileContent
  const WB = XLSX.read(FileBuffer)
  const WJ = XLSX.utils.sheet_to_json(WB.Sheets[WB.SheetNames[0]])

  return {
    ok:true,
    data:WJ
  }
}

async function tablify(event:any){
  let { obj, fileName } = event

  const res_wb = {
    Sheets:{
        sheet1: XLSX.utils.json_to_sheet(obj)
    },
    SheetNames:['sheet1']
  }
  const res_buffer = XLSX.write(res_wb,{
        type:'buffer'
    })

  const res_upload = await cloud.uploadFile({
    cloudPath: 'res_position_' + new Date().getTime() + fileName,
    fileContent: res_buffer,
  })
  console.log(res_upload);
  const fileList = [res_upload.fileID]
  const result = await cloud.getTempFileURL({
    fileList: fileList,
  })
  return {
    ok:true,
    data:result
  }
}
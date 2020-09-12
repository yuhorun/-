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
  
  let { peopleFileID, peopleFileName, carFileID} = event
  const peopleFile = await cloud.downloadFile({
    fileID: peopleFileID,
  })
  const carFile = await cloud.downloadFile({
    fileID: carFileID,
  })
  const peopleFileBuffer = peopleFile.fileContent
  const carFileBuffer = carFile.fileContent
  const peopleWB = XLSX.read(peopleFileBuffer)
  const carWB = XLSX.read(carFileBuffer)
  const peopleWJ = XLSX.utils.sheet_to_json(peopleWB.Sheets[peopleWB.SheetNames[0]])
  const carWJ = XLSX.utils.sheet_to_json(carWB.Sheets[carWB.SheetNames[0]])
  if (peopleWJ.length){
    for (let i=0; i<peopleWJ.length; i++){
        const randomIndex = Math.floor(Math.random()*(peopleWJ.length-1))
        const temp = peopleWJ[i]
        peopleWJ[i] = peopleWJ[randomIndex]
        peopleWJ[randomIndex] = temp
    }
  }
  let postions = []
  for (let i=0; i<carWJ.length; i++){
      for (let j=0; j<Number(carWJ.number); j++){
        postions.push(carWJ.positon)
      }
  }
  if (postions.length !== peopleWJ.length){
    return {
      errMsg:'员工数量与岗位数量不匹配'
    }
  }
  for (let i=0; i<peopleWJ.length; i++){
    peopleWJ.position = postions[i]
  }

  const res_wb = {
    Sheets:{
        sheet1: XLSX.utils.json_to_sheet(peopleWJ)
    },
    SheetNames:['sheet1']
}
  const res_buffer = XLSX.write(res_wb,{
        type:'buffer'
    })

  const res_upload = await cloud.uploadFile({
    cloudPath: 'res_' + peopleFileName, res_buffer,
    fileContent: res_buffer,
  })
  console.log(res_upload);
  const fileList = [res_upload.fileID]
  const result = await cloud.getTempFileURL({
    fileList: fileList,
  })
  return result
}
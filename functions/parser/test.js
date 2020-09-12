const XLSX = require('xlsx')

const wb = XLSX.readFile("./population_collector_user.xlsx")

const wj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

console.log(wj);

if (wj.length){
    for (let i=0; i<wj.length; i++){
        const randomIndex = Math.floor(Math.random()*(wj.length-1))
        const temp = wj[i]
        wj[i] = wj[randomIndex]
        wj[randomIndex] = temp
    }
}

const res_wb = {
    Sheets:{
        sheet1: XLSX.utils.json_to_sheet(wj)
    },
    SheetNames:['sheet1']
}

XLSX.writeFile(res_wb,'hah.xlsx')

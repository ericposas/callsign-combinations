const fs = require('fs')
const readStream = fs.createReadStream('./callsigns.csv')
const program = require('commander')
let data

program
  .option(`-o, --outfile <filename>`, `output file`)
  .parse(process.argv)

if (program.outfile){
  console.log(program.outfile)
  readStream.on('data', (chunk) => {
      data = chunk.toString()
      readStream.destroy()
    })
    .on('err', err => {
      console.log(err)
    })
    .on('close', () => {
      const arr = data.split('\r\n')
      const newArr = []
      // make some combinations with the original list
      arr.forEach((item, i) => { if (i < 250) newArr.push([`${item} ${arr[i+1]}`]) })
      arr.forEach((item, i) => { if (i < 240) newArr.push([`${item} ${arr[i+10]}`]) })
      arr.forEach((item, i) => { if (i < 220) newArr.push([`${item} ${arr[i+20]}`]) })
      arr.forEach((item, i) => { if (i < 200) newArr.push([`${item} ${arr[i+40]}`]) })
      arr.forEach((item, i) => { if (i < 180) newArr.push([`${item} ${arr[i+60]}`]) })
      arr.forEach((item, i) => { if (i < 160) newArr.push([`${item} ${arr[i+80]}`]) })
      arr.forEach((item, i) => { if (i < 140) newArr.push([`${item} ${arr[i+100]}`]) })
      arr.forEach((item, i) => { if (i < 120) newArr.push([`${item} ${arr[i+120]}`]) })
      arr.forEach((item, i) => { if (i < 90) newArr.push([`${item} ${arr[i+150]}`]) })
      // join them as line separated values
      let list = newArr.join('\r\n')
      // write them to .csv
      const writeStream = fs.createWriteStream(`./callsigns-${program.outfile}.csv`)
      writeStream.write(list)
    })
}else{
  console.log(`please provide outfile name`)
}

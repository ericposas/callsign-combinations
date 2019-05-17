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
      for (let i = 0; i < arr.length-1; i++){
        arr.forEach((item) => { newArr.push([`${item} ${arr[i]}`]) })
      }
      // join them as line separated values
      let list = newArr.join('\r\n')
      // write them to .csv
      const writeStream = fs.createWriteStream(`./callsigns-${program.outfile}.csv`)
      writeStream.write(list)
    })
}else{
  console.log(`please provide outfile name`)
}

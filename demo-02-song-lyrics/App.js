const express = require('express');
const fs = require('fs').promises

const app = express()

const BASE_DIR = process.cwd()
console.log(BASE_DIR);

app.get('/', async (req, res) => {
  const files = await fs.readdir(BASE_DIR + '/song_lyrics')
  console.log(files)

  const fileContent = await fs.readFile(BASE_DIR + '/song_lyrics/' + files[0])
  const lyrics = fileContent.toString();
  console.log(lyrics)

  res.type('text')
  res.send(lyrics)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
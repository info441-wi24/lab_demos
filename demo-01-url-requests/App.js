const express = require('express')

const app = express()

const PORT = 3000

app.get('/', (req, res) => { // only works with 'localhost:3000' or 'localhost:3000/'
  res.type('text')
  res.send('Hello World')
})

// create an endpoint that generates a hyperlink to another website
app.get('*', (req, res) => {
  const url = req.url.substring(1)
  console.log(url)

  res.type('html')
  res.send(`
    <html>
      <body>
        <h1>This is your requested url: ${url}</h1>
        <a href=${url}>Go to the link</a>
      </body>
    </html>
  `)
})

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`)
})
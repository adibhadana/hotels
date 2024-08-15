const express =require('express');
const app = express();
const db = require('./db');
//Models exports

const MenuItem = require('./models/MenuItem')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function (req , res){
  res.send('Welcome to my hotel... How I can help you')
})

const personRouter =require('./routes/personRouter');
app.use('/person', personRouter);

app.listen(3000 ,()=>{
  console.log("listening on port 3000");
})

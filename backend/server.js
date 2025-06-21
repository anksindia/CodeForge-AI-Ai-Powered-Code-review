require('dotenv').config();
const app = require('./src/app.js');

app.get("/",(req,res)=>{res.send("Hello")})

app.listen(3000,()=>{
    console.log("Server listening on port no. 3000")
})
const app = require('./app.js');

app.get('/',(req,res)=>{
    res.send("FinFlow....");
})

app.listen(3000,()=>{
    console.log("Running.....");
});
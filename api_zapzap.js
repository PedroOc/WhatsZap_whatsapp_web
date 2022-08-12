const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log("Server Rrrrrodando");
})

app.get('/startClient', (req, res)=>{
    res.send("Pagina 'Index'");
})

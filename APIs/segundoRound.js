const express = require('express');
const app = express();
const client = require('../EventosAWJS');

app.use(express.json())

app.listen(3000, ()=>{
    console.log("Server Rrrrrodando");
    client.initialize();
    console.log("Cliente inicializado.");
})

app.post('/startClient', (req, res)=>{
    client.initialize();
    res.send("Cliente inicializado.");
})

app.post('/finalizarClient', (req, res)=>{
    client.destroy()
    res.send("Cliente finalizado.");
})

app.post('/sendMSG', (req, res)=>{
    let celServer = req.body.celServer;
    let mensagemAlvo = req.body.msg;
    client.sendMessage(celServer, mensagemAlvo);
    res.send("Mensagem enviada");
})

app.post('/carregarUltimaMSG', async (req, res)=>{
    let mensagens;
    try {
        let chatP = await client.getChatById(req.body.celServer);
        let searchOptions = {limit: 1}
        mensagens = await chatP.fetchMessages(searchOptions);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }    
    res.send(mensagens);
})

app.post('/limparMensagens', async (req, res)=>{
    let mensagens;
    try {
        let chatP = await client.getChatById(req.body.celServer);
        mensagens = await chatP.clearMessages();
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }    
    res.send("Mensagens apagadas");
})

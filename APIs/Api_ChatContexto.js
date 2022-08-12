const express = require('express');
const app = express();
const qrcode = require('qrcode-terminal');
// const WAWebJS = require('whatsapp-web.js');
// const { Client, DefaultOptions } = require('whatsapp-web.js');
const client = require('../EventosAWJS');

let chatContexto;

function validarBotNoContexto(res, req, next){
    if(chatContexto == null){
        throw Error("Nenhum chat no contexto");
    }
    next();
}

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

app.post('/sendMSG', validarBotNoContexto, (req, res)=>{    
    let mensagemAlvo = req.body.msg;
    try {
        chatContexto.sendMessage(mensagemAlvo);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
    res.send("Mensagem enviada");
})

app.post('/carregarUltimaMSG', validarBotNoContexto, async (req, res)=>{
    let mensagens;
    try {
        let searchOptions = {limit: 1}
        mensagens = await chatContexto.fetchMessages(searchOptions);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }    
    res.send(mensagens);
})

app.post('/limparMensagens', validarBotNoContexto, async (req, res)=>{
    let mensagens;
    try {
        mensagens = await chatContexto.clearMessages();
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }    
    res.send("Mensagens apagadas");
})

app.post('/contextualizarChat', async (req, res)=>{
    try {
        chatContexto = await client.getChatById(req.body.celServer);
        res.send('Contexto atual: '+req.body.celServer)
    } catch (error) {
        res.status(500)
        res.send("Falha ao contextualizar o Chat msg: "+error)
    }
})

app.get('/numeroMensagensNaoLidas', validarBotNoContexto, async (req, res)=>{
    try {     
        chatAtualizado = await client.getChatById(chatContexto.id._serialized);
        let naoLido = chatAtualizado.unreadCount;
        console.log('Número de texto não lido: ' + naoLido)        
        res.send(naoLido.toString());
    } catch (error) {
        res.status(500)
        res.send(error)
    }
})
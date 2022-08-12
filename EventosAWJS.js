const qrcode = require('qrcode-terminal');
const WAWebJS = require('whatsapp-web.js');
const { Client, DefaultOptions } = require('whatsapp-web.js');
const clientOrigal = new Client();

clientOrigal.on('qr', qr => {    
    qrcode.generate(qr, {small: true});
});

clientOrigal.on('ready', async () => {
    console.log('Client is ready!');
});

clientOrigal.on('message', async msg  => {
	console.log('MESSAGE RECEIVED', msg.body);
    let botoes = msg.dynamicReplyButtons;
    //console.log('msg.dynamicReplyButtons: '+msg.dynamicReplyButtons);
    if(botoes != null){
        //console.table(botoes)
        botoes.every(botao =>{
            console.table(botao.buttonText.displayText);
            return true;
        })
    }

    if(msg.type == 'list'){
        console.log('list.description: '+msg._data.list.description)
        console.log('list.buttonText: '+msg._data.list.buttonText)
        console.table(msg._data.list.sections);
    }
});

clientOrigal.on('auth_failure', async msg =>{
    console.log('Falha ao logar');
    console.log('msg: '+msg);
})

clientOrigal.on('disconnected', async reason =>{
    console.log('DISCONECTADO!')
})

module.exports = clientOrigal;
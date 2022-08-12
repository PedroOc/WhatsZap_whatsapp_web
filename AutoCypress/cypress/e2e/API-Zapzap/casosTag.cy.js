//Olá! Preciso de uma simulação e gostaria de ser atendido por um consultor do PB consignado da Loja de Visconde de Nacar.
//LojasFisicas_Redirect_800801
const pageApiZapZap = require('./pageApiZapZap');
const urlBase = 'http://localhost:3000';
const pageApi = new pageApiZapZap(urlBase);
const defaulTimeout = 10000

describe('Teste das Tags do BOT - LojasFisicas_Redirect_800801', () => {
    it('Faz tudo pancadaria', async () =>{       
        try {
            await cy.request({
                method: 'POST',
                url: urlBase+'/contextualizarChat', 
                body:{"celServer":"554133519680@c.us"},            
            })
            await pageApi.enviarMensagem('Teste Zaku Auto');
            pageApi.esperarXMensagens(defaulTimeout, 1);
            await pageApi.enviarMensagem('11988884444');
            pageApi.esperarXMensagens(defaulTimeout, 4);
            await pageApi.enviarMensagem('Não, obrigado');
            pageApi.esperarXMensagens(defaulTimeout, 2);
            await pageApi.enviarMensagem('TV');
            pageApi.esperarXMensagens(defaulTimeout, 2);
            await pageApi.enviarMensagem('66032796906');
            pageApi.esperarXMensagens(defaulTimeout, 1);
            await pageApi.enviarMensagem('Investimentos');
            pageApi.esperarXMensagens(defaulTimeout, 1);
            await pageApi.enviarMensagem('#reset');
        } catch (error) {
            console.log(error);
            throw error;            
        }         
    })
  })
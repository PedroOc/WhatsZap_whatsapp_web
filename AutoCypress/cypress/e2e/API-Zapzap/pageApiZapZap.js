import { recurse } from 'cypress-recurse'

class pageApiZapZap{

    constructor(urlPadrao){
        this.urlBase = urlPadrao;
    };

    enviarMensagem(mensagem){        
        cy.request({
            method:'POST',
            url: this.urlBase+'/sendMSG',
            body:{
                "msg": mensagem
            }
        }).should((response) => {
            expect(response.status).to.eq(200)})
    }

    esperarMensagem(tempoLimite){
        cy.wait(1000)
        // if(tempoLimite == Number)
        //     tempoLimite = new Date(tempoLimite);
        // let dataInicial = Date.now();
        // let tempoDecorrido;
        // tempoDecorrido = dataInicial - Date.now();
        // let numeroMensagensNaoLidas = 0;

        cy.log('tempo limite '+tempoLimite)

        var keepCalling = true;
        cy.log('valor do keepCalling '+keepCalling)

        let funcTempoLimite = setTimeout(function () {
            keepCalling = false
            console.log('Timeout ativou')
        }, tempoLimite);

        const metodoRecursivo = () =>{
            cy.request({
                url: this.urlBase+'/numeroMensagensNaoLidas',            
            }).then(response => {
                if(response.body == 0 && keepCalling){
                    cy.wait(2000)
                    metodoRecursivo();
                }
                else{
                    cy.log(response.body)
                    cy.log('valor do keepCalling saida do loop '+keepCalling)
                    clearTimeout(funcTempoLimite);
                    return
                }
            })
        }        
        metodoRecursivo();
        // while (numeroMensagensNaoLidas == 0 && tempoDecorrido < tempoLimite){
        //     cy.request({
        //         url: this.urlBase+'/numeroMensagensNaoLidas',            
        //     }).as('carregaNaoLida')
        //     numeroMensagensNaoLidas = cy.get('@carregaNaoLida').invoke('body')
        //     cy.get('@carregaNaoLida').then(console.log)
        //     cy.log(numeroMensagensNaoLidas, numeroMensagensNaoLidas);
        //     cy.log(`Número de mensagens não lidas: ${numeroMensagensNaoLidas}`, numeroMensagensNaoLidas)
        //     tempoDecorrido = dataInicial - Date.now();
        // }        
    }

    //Número de voltas controlador externo de quantas vezes o metodo recursivo já roudou
    esperarXMensagens(tempoLimite, numeroMensagens){        
        const metodoRecursivo = (numeroMensagens, numeroVoltas) =>{
            console.log('volta '+numeroVoltas)

            cy.wait(2000)  
            cy.request({
                url: this.urlBase+'/numeroMensagensNaoLidas',            
            }).then(response => {
                if(numeroVoltas == 0){
                    tempoLimite = Date.now() + tempoLimite;
                    cy.log('tempo limite '+tempoLimite)
                }
                console.log('response.body '+response.body)
                console.log('numeroMensagens '+numeroMensagens)
                if(response.body != numeroMensagens && Date.now() < tempoLimite){
                    //cy.wait(1000)                   
                    numeroVoltas = numeroVoltas + 1;
                    metodoRecursivo(numeroMensagens, numeroVoltas);
                }
                else{
                    cy.log('Num mensagen não lidas '+response.body)
                    return
                }
            })
        }        
        metodoRecursivo(numeroMensagens, 0);    
    }

}




module.exports = pageApiZapZap;
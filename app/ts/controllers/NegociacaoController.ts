import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject, throttle } from "../helpers/decorator/index";
import { NegociacaoService, HandlerFunction } from "../service/index";
import { imprime } from "../helpers/Utils";

export class NegociacaoController{

    @domInject('#data')
    private _inputData: JQuery; // HTMLInputElement é o tipo caso pegar do html puro
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor(){
        // this._inputData = $('#data'); //<HTMLInputElement> é um cast
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(1000)
    adiciona(){
        
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        imprime(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private _ehDiaUtil(data: Date): boolean{
        return data.getDay() != DiaDaSemana.Sabado || data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    async importaDados(){
        
        try{

            const isOk: HandlerFunction = (res: Response) =>{
                if(res.ok){
                    return res;
                }else{
                    throw new Error(res.statusText);
                }
            }

            const negociacoesParaImportar: Negociacao[] = await this._service.obterNegociacoes(isOk); // o compilador verifica se a funcao isOk recebe Response e devolve Response

            const negociacoesJahImportadas =  this._negociacoes.paraArray();

            //valida para nao importar duplicado
            negociacoesParaImportar
                .filter(negociacaoAImportar => 
                    !negociacoesJahImportadas.some(jaImportada => negociacaoAImportar.ehIgual(jaImportada))
                )
                .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);
        
        }catch(err){
            this._mensagemView.update(err.message);
        }
                
    }
}

enum DiaDaSemana{
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
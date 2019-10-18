import { Negociacoes, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";

export class NegociacaoController{
    private _inputData: JQuery; // HTMLInputElement é o tipo caso pegar do html puro
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this._inputData = $('#data'); //<HTMLInputElement> é um cast
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event){

        event.preventDefault();

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

        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });
        this._negociacoesView.update(this._negociacoes);
        console.log(negociacao);

        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private _ehDiaUtil(data: Date): boolean{
        return data.getDay() != DiaDaSemana.Sabado || data.getDay() != DiaDaSemana.Domingo;
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
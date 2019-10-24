import { Negociacao } from "./Negociacao";
import { logarTempoDeExecucao } from "../helpers/decorator/index";
import { MeuObjeto } from "./MeuObjeto";

export class Negociacoes implements MeuObjeto<Negociacoes>{
    
    private _negociacoes: Negociacao[] = []; //tipo é um atalho para Array<Negociacao>

    adiciona(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes); //retornando um novo array para imutabilidade
    }

    paraTexto(): void{
        console.log("Impressão");
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}
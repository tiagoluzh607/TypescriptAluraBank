import { Negociacao } from "./Negociacao";
import { logarTempoDeExecucao } from "../helpers/decorator/index";

export class Negociacoes{
    private _negociacoes: Negociacao[] = []; //tipo é um atalho para Array<Negociacao>

    adiciona(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes); //retornando um novo array para imutabilidade
    }
}
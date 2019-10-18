class Negociacoes {
    constructor() {
        this._negociacoes = []; //tipo é um atalho para Array<Negociacao>
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return [].concat(this._negociacoes); //retornando um novo array para imutabilidade
    }
}

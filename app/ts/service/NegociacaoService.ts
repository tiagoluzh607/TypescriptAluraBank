import { NegociacaoParcial, Negociacao } from "../models/index";

export class NegociacaoService{

    /* Modo do serviço devolvendo uma promisse
    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]>{

     return fetch('http://localhost:8080/dados')
        .then(res => handler(res))
        .then(res => res.json())
        .then((dados: NegociacaoParcial[]) => 
            dados
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        )
        .catch(err => {
            console.log(err);
            throw new Error('Não foi possível importar as negociações') 
        });
    }
    */

    /**
     * Modo chamando retorno async com maior legibilidade
     * @param handler Modo chamando 
     */
   async obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]>{

        try{

            let response: Response = await fetch('http://localhost:8080/dados');
            response = await handler(response);
            let dados: NegociacaoParcial[] = await response.json();

            return dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante));

        }catch(err){
            console.log(err);
            throw new Error('Não foi possível importar as negociações') 
        }
   }

}

//interface para dizer que uma handle function precisa obrigatoriamente receber uma Response
// e devolver uma Response
export interface HandlerFunction{
    (res: Response): Response
}
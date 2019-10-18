export function domInject(seletor: string){

    return function(target: any, key: string){ //target objeto inteiro, key é o nome da propriedade
        let elemento: JQuery;
        const getter = function(): JQuery{ //fazendo uma funcao de getter personalizada

            if(!elemento){
                console.log(`buscando ${seletor} para injetar em ${key}`);
                elemento = $(seletor);
            }

            return elemento; //retorna o elemento selecionado pelo jquery
        }

        Object.defineProperty(target, key, { //você passa qual é o objeto, e qual a propriedade ai você consegue programar um getter da propriedade
            get: getter  // vai retornar o retono da funcao getter que é o objeto selecionado pelo jquery
        });
    }
}
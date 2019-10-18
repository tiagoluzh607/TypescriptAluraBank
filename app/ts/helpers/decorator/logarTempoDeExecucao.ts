export function logarTempoDeExecucao(emSegundos: boolean = false){

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        
        const metodoOriginal = descriptor.value; //salvando metodo original do decorator, decorator.value é a funcao que será executada
        descriptor.value = function(...args:any[]){//sobreescrevendo a funcao que será executada //posso rebecer 0 ao infinito de parametro do tipo any
        
            let unidade = 'ms';
            let divisor = 1;

            if(emSegundos){
                unidade = 's';
                divisor = 1000
            }

            console.log('-------------------');
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args); //executa a funcao no contexto passando os argumentos dela mesma
            const t2 = performance.now();
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
            return retorno;
        }

        return descriptor;
    }
}
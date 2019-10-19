export function throttle(milisegundos: number = 500){

    let timer = 0;

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const metodoOriginal = descriptor.value; //salvando metodo original do decorator, decorator.value é a funcao que será executada
        descriptor.value = function(...args:any[]){//sobreescrevendo a funcao que será executada //posso rebecer 0 ao infinito de parametro do tipo any
            if(event) event.preventDefault(); // o event é implicito caso exista evita o comportamento padrao
            clearTimeout(timer);
            timer = setTimeout(() => {
                const retorno = metodoOriginal.apply(this, args);
                return retorno;
            },milisegundos)
            
        }

        return descriptor;
        
    }
}
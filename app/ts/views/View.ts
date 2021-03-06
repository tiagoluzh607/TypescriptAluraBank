import { logarTempoDeExecucao } from "../helpers/decorator/index";

export abstract class View<T>{
    private _elemento: JQuery;
    private _escapar: boolean;

    constructor(selector: string, escapar: boolean = false){
        this._elemento = $(selector);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao()
    update(model: T): void{

        let template = this.template(model);

        if(this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g,''); //tira tags script

        this._elemento.html(template);
    }

    abstract template(model: T): string;
}

import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

//é uma interface que une as outras interfaces
export interface MeuObjeto<T> extends Imprimivel, Igualavel<T>{

}